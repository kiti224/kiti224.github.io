`use strict`;
const userNameInput = document.getElementById(`user-name`);
const assessmentButton = document.getElementById(`assessment`);
const resultDivided = document.getElementById(`result-area`);

/**
 * 指定した要素の子要素をすべて削除する
 * @param{HTMLElement}element HTMLの要素
 */
function removeAllChildren(element){
    while(element.firstChild){//子の要素があるかぎり削除
        element.removeChild(element.firstChild);
    }
}
userNameInput.onkeydown = event => {
    if (event.key === `Enter`) {
        assessmentButton.onclick();
    }
};
assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if(userName.length === 0){
        //名前が空の時は処理を終了する
        return;
    }
    //診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement(`h3`);
    header.innerText = `⇨`;
    resultDivided.appendChild(header);
    
    const paragraph = document.createElement(`p`);
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);
};

const answers =[
`{userName}さん誕生日を祝ってくれてありがとうございます`,
];

/**
 *名前の文字列を渡すと診断結果を返す関数 
 *@param{string}userName ユーザーの名前
 *@return{string}診断結果
 */
function assessment(userName){
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++){
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }
    //文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replace(/\{userName\}/g,userName);
    return result;
}
