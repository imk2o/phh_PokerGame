// DQ4風ポーカーゲーム
//
// http://www.nicovideo.jp/watch/sm4077421
//
// [ゲームルール]
//
// ・プレイヤーが掛金を入力(1〜10枚)
// ・カードをシャッフルし、5枚プレイヤーに配る
// ・プレイヤーは交換するカードを選択(0〜5枚)
// ・入力された枚数分、カードを交換する
// ・カードの役を判定し、役が揃っていれば相応のコインを付与、そろわなければ掛金没収
//
// ・カードは一旦JOKERを除く52枚とする
// ・プレイヤーのスタート時の保有コインは30枚とする
// ・保有コインが0枚になったらゲームオーバー
//
// [Q0] 以下のプログラムおよびHTML, CSSファイルを読み、ゲームがどのように構成されているか確認せよ
// 
// [Q1] ゲームの作成するにあたり、以下の関数を作成せよ。
// 
// - [Q1-1] シャッフルされたカードの山を作る関数createShuffledCards()
// - [Q1-2] カードの山から、指定された枚数のカードを引く関数drawCards()
// - [Q1-2.2] 手持ちのカードを交換する関数tradeCards()
// - [Q1-3] カードの役を判定するevaluateCardValue()
//
// [Q2] Q1で作成した関数を用いて、ゲームを完成させよ
//
// Q1が正しく動作しても、以下が実装されていないので完成させること
//
// ・役と倍率が表示されていない
// ・ゲーム開始後、入力されたコイン数が差し引かれていない
// ・役の判定後、倍率に応じたコインの還元が行われていない
//
// ゲームとしての機能が完成したら、画面デザインやUIを自分なりにアレンジしてみること
//
// [Q3] Q1, Q2で作成したゲームにJOKERを1枚追加し、ゲームが成立するようにせよ
//
// ・JOKERカードをどのような型/値で表現するか検討する
// ・役にファイブカードが追加される
// ・役の判定の見直しが必要である
//
// [Q4] 役が揃った場合に挑戦できる、ダブルアップゲームを追加せよ
//

let cards = [];            // カードの山
let coins = 30;            // プレイヤーの保有コイン数
let player_cards = [];     // プレイヤーに配られたカード
const MIN_BET_COINS = 1;   // 一度に掛けられるコインの最小枚数
const MAX_BET_COINS = 10;  // 一度に掛けられるコインの最大枚数

document.addEventListener('DOMContentLoaded', function() {
    // 保有コイン数を表示
    document.getElementById('coins').textContent = coins;

    // 掛けるコイン数の選択項目を作成
    let bet_selector = document.getElementById('bet');
    for (let i = MIN_BET_COINS; i <= MAX_BET_COINS; i++) {
        let option = document.createElement('option');
        option.setAttribute('value', i);
        option.textContent = i;
        bet_selector.appendChild(option);
    }

    // 「ゲームを始める」ボタンがクリックされたらカードを配る
    document.getElementById('play').addEventListener('click', function() {
        playStart();
    });

    // 「交換する」ボタンがクリックされたらカードを交換し、役を評価する
    document.getElementById('trade').addEventListener('click', function() {
        tradeAndJudge();
    });

    // 「次のゲームへ」ボタンがクリックされたら、画面を初期状態に戻す
    document.getElementById('continue').addEventListener('click', function() {
        nextGame();
    });

    // 一部の要素はゲームが進むまで非表示にしておく
    showElement(document.getElementById('poker_table'), false);
    showElement(document.getElementById('continue'), false);
});

// ゲームを開始する
// ・カードをシャッフルする
// ・カードの山から5枚、プレイヤーに配る
function playStart() {
        cards = createShuffledCards();
        console.log("カードの山(cards): ", cards);

        let drawn_cards = drawCards(cards, 5);
        console.log("引いたカード(drawn_cards): ", drawn_cards);
        console.log("残りのカード枚数: ", cards.length);
        player_cards = drawn_cards;

        showElement(document.getElementById('poker_table'), true);
        showPlayerCards();
}

// 選択されたカードを交換し、役を評価する
function tradeAndJudge() {
    // DOMから選択されたカードのインデックス求める
    let selected_card_indexes = [];
    let selected_card_nodes = document.getElementsByClassName('selected');
    for (let i = 0, n = selected_card_nodes.length; i < n; i++) {
        let selected_card_node = selected_card_nodes.item(i);
        let selected_card = selected_card_node.textContent;
        selected_card_indexes.push(player_cards.indexOf(selected_card));
    }
    console.log("選択されたカードのインデックス(selected_card_indexes): ", selected_card_indexes);

    // カードを交換
    player_cards = tradeCards(cards, player_cards, selected_card_indexes);
    console.log("交換後のカード(player_cards): ", player_cards);

    // 交換後のカードを表示
    showPlayerCards();

    // カードの役を求める
    let value = evaluateCardValue(player_cards);
    console.log("カードの役: ", value);

    // 役を表示
    document.getElementById('result').textContent = value.hand;

    showElement(document.getElementById('continue'), true);
}

// 次のゲームに進む
// ・表示画面を元に戻す
function nextGame() {
    showElement(document.getElementById('poker_table'), false);
    showElement(document.getElementById('continue'), false);
    document.getElementById('result').textContent = "";
}

// プレイヤーの手札を表示する
function showPlayerCards() {
    let player_cards_element = document.getElementById('player_cards');

    // カード要素を生成し、追加する
    player_cards_element.innerHTML = "";
    for (let card of player_cards) {
        let card_element = document.createElement('div');
        card_element.setAttribute('class', 'player_card');
        card_element.textContent = card;
        player_cards_element.appendChild(card_element);

        // カードクリックで選択状態を切り替える('selected'クラスの付け外しを行う)
        card_element.addEventListener('click', function() {
            card_element.classList.toggle('selected');
        });
    }
}

// 要素を表示/非表示にする
//
// 引数:
//   - element: DOM要素
//   - is_show: 表示する場合はtrue, 非表示にする場合はfalseを指定
// 戻り値: なし
function showElement(element, is_show) {
    if (is_show) {
        element.classList.remove('hidden');
    } else {
        element.classList.add('hidden');
    }
}

// [Q1-1]
// シャッフルされたカードの山を作る。
//
// 戻り値: カードの配列
function createShuffledCards() {
    // この例ではカードを文字列で表現しているが、
    // 扱いにくい場合はオブジェクト型などに適宜変更してOK
    let cards = [];
    for (let suit of ["♠️", "♥️", "♦️", "♣️"]) {
        for (let i = 1; i <= 13; i++) {
            let card = suit + String(i);
            cards.push(card);
        }
    }

    // FIXME:
    // cardsはシャッフルされていない
    // cardsをシャッフルされたものにするにはどうしたらいいか？

    return cards;
}

// [Q1-2]
// カードの山(cards)から、指定された枚数(count)のカードを引く
//
// 引数:
//   - cards: カードの山(配列)
//   - count: 引く枚数
// 戻り値: 引いたカードの配列
//
// 注意: 引いたカードはcardsから取り除かれる
function drawCards(cards, count) {

    // FIXME:
    // 以下の方法では、カードが1枚しか引かれない
    // count枚引かれるようにするにはどうしたらいいか？
    // また、戻り値を引いたカードの配列になるよう修正すること
    let drawn_card = cards.shift();

    return ["♠️1", "♠️2", "♠️3", "♠️4", "♠️5"];    // FIXME: 引いたカードの配列に修正！
}

// [Q1-2.2]
// カードを交換する
//
// 引数:
//   - cards: カードの山(配列)
//   - player_cards: プレイヤーの手持ちカード(配列)
//   - trade_card_indexes: 交換するカードのインデックス(配列)
// 戻り値: 交換後のカード配列
function tradeCards(cards, player_cards, trade_card_indexes) {

    // FIXME:
    // 以下はtrade_card_indexesの内容に関係なく、プレイヤーの手持ちカード(player_cards)を返している
    // (1) player_cardsからtrade_card_indexesが指す位置のカードを除くにはどうしたらいいか？
    // (2) (1)で除いたカードに、cardから新しいカードを補充にするにはどうしたらいいか？

    return player_cards;
}

// [Q1-3]
// カード(card)の役を判定する
//
// 引数:
//   - card: カード
// 戻り値: 役名(hand)と倍率(rate)のオブジェクトを返す
function evaluateCardValue(card) {

    // FIXME: cardの役を判定し、適切な戻り値を返すこと

    return {hand: "ブタ", rate: 0};
}
