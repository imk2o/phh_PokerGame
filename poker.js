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
// [Q1] ゲームの作成するにあたり、以下の関数を作成せよ。
// 
// - [Q1-1] シャッフルされたカードの山を作る関数createShuffledCards()
// - [Q1-2] カードの山から、指定された枚数のカードを引く関数drawCards()
// - [Q1-3] カードの役を判定するevaluateCardValue()
//
// [Q2] Q1で作成した関数を用いて、ゲームを作成せよ
//
// 画面構成やユーザ・インターフェースは、ゲームがプレイできれば自由とする
// (どこから手をつけたらいいか分からない場合、クラスメイトや先生に相談すること)
//
// [Q3] Q1, Q2で作成したゲームにJOKERを1枚追加し、ゲームが成立するようにせよ
//
// ・JOKERカードをどのような型/値で表現するか検討する
// ・役にファイブカードが追加される
// ・役の判定の見直しが必要である
//
// [Q4] 役が揃った場合に挑戦できる、ダブルアップゲームを追加せよ
//

document.addEventListener('DOMContentLoaded', function() {

    // 以下はQ1で作成した関数をテストするために書いたコードなので、
    // Q2以降の課題のやる際は削除してOK
    let cards = createShuffledCards();
    console.log(cards);

    let drawn_cards = drawCards(cards, 3);
    console.log(drawn_cards);
    console.log("残りのカード枚数: ", cards.length);

    let result = evaluateCardValue([]);
    console.log(result);
    // ここまで

});

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
//   - cards: カードの配列
//   - count: 引く枚数
// 戻り値: 引いたカードの配列
//
// 注意: 引いたカードはcardsから取り除かれる
function drawCards(cards, count) {

    // FIXME:
    // 以下の方法では、カードが1枚しか引かれない
    // count枚引かれるようにするにはどうしたらいいか？
    let drawn_card = cards.shift();

    return drawn_card;
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
