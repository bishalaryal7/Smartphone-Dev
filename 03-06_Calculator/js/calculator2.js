'use strict';

// ワークエリア
var wkFirst = "1" //初回FLG
var wkTotal = 0;  //合計
var wkInput = ""; //現在クリックされたボタンの値
var wkCalc = "+"; //初期値 "+"
var wkBefore = "1"; //１つ前の入力 … 0:数値  1:演算子

// ページ上の要素（Element)を参照
// 【Ａ】自分で考える
const elementcalcLog = document.getElementById("calcLog");
const elementresult = document.getElementById("result");
const elementnum0 = document.getElementById("num0");
const elementnum1 = document.getElementById("num1");
const elementnum2 = document.getElementById("num2");
const elementnum3 = document.getElementById("num3");
const elementnum4 = document.getElementById("num4");
const elementnum5 = document.getElementById("num5");
const elementnum6 = document.getElementById("num6");
const elementnum7 = document.getElementById("num7");
const elementnum8 = document.getElementById("num8");
const elementnum9 = document.getElementById("num9");
const elementadd = document.getElementById("add");
const elementsub = document.getElementById("sub");
const elementmult = document.getElementById("mult");
const elementdiv = document.getElementById("div");
const elementequal = document.getElementById("equal");
const elementcancel = document.getElementById("cancel");


// イベントを登録

elementnum1.addEventListener("click", function () { edit("1") });
elementnum2.addEventListener("click", function () { edit("2") });
elementnum3.addEventListener("click", function () { edit("3") });
elementnum4.addEventListener("click", function () { edit("4") });
elementnum5.addEventListener("click", function () { edit("5") });
elementnum6.addEventListener("click", function () { edit("6") });
elementnum7.addEventListener("click", function () { edit("7") });
elementnum8.addEventListener("click", function () { edit("8") });
elementnum9.addEventListener("click", function () { edit("9") });
elementnum0.addEventListener("click", function () { edit("0") });

elementadd.addEventListener("click", function () { update("+") });

elementsub.addEventListener("click", function () { update("-") });

elementmult.addEventListener("click", function () { update("*") });

elementdiv.addEventListener("click", function () { update("/") });


elementequal.addEventListener("click", dspResult);
elementcancel.addEventListener("click", clear);

/** 数字がクリックされたときの処理 */
function edit(wkInput) {
  // １つ前の入力が数値
  if (wkBefore === "0") {
    elementresult.innerHTML = Number(elementresult.innerHTML + wkInput); //入力値の結合（ゼロサプレスして結合）
  }
  // １つ前の入力が、演算子
  else {
    elementresult.innerHTML = wkInput;
  }
  wkFirst = "0" //初回FLG off
  wkBefore = "0"
}

/** 演算子がクリックされたときの処理 */
function update(calcType) {
  // １つ前の入力が数値
  if (wkBefore === "0") {
    elementcalcLog.innerHTML = elementcalcLog.innerHTML + Number(elementresult.innerHTML) + calcType; //計算ログ
    // 【Ｃ】自分で考える
    calculator();
  }
  // １つ前の入力が演算子（演算子 入力しなおし）
  else {
    // 初回入力
    if (wkFirst === "1") {
      elementcalcLog.innerHTML = "0" + calcType; //計算ログ
    }
    else {
      // 演算子 入力しなおし
      let wkLogLastWord = elementcalcLog.innerHTML.slice(-1); //ログ最後の１文字
      if (["+", "-", "*", "/"].includes(wkLogLastWord)) {
        elementcalcLog.innerHTML = elementcalcLog.innerHTML.slice(0, -1) + calcType; //計算ログ　末尾1文字（前回の演算子）を削除
      }
      // イコールの後の演算子
      else {
        elementcalcLog.innerHTML = elementcalcLog.innerHTML + calcType; //計算ログ
      }
    }
  }
  wkCalc = calcType;  //演算子save
  wkBefore = "1";
}

/** =がクリックされたときの処理 */
// 【Ｄ】自分で考える
function dspResult() {
  if (wkFirst === "0" && wkBefore === "0") {

    elementcalcLog.innerHTML = elementcalcLog.innerHTML + Number(elementresult.innerHTML);

    calculator();

    wkCalc = "=";
    wkBefore = "1";
  }
}


/** 計算結果をクリアします。(clear Result) */
// 【Ｅ】自分で考える
function clear() {
  elementresult.innerHTML = "0";
  elementcalcLog.innerHTML = "";
  wkFirst = "1";
  wkTotal = 0;
  wkCalc = "+";
  wkBefore = "1";
}


// 計算
// 【Ｆ】自分で考える
function calculator() {
  let currentValue = Number(elementresult.innerHTML);

  switch (wkCalc) {
    case "+":
      wkTotal = Number(wkTotal) + Number(elementresult.innerHTML);
      break;
    case "-":
      wkTotal = Number(wkTotal) - Number(elementresult.innerHTML);
      break;
    case "*":
      wkTotal = Number(wkTotal) * Number(elementresult.innerHTML);
      break;
    case "/":
      wkTotal = Number(wkTotal) / Number(elementresult.innerHTML);
      break;
  }

  elementresult.innerHTML = wkTotal;
}

document.addEventListener("keydown", keydownEvent, false); 
function keydownEvent(event) { 
  if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(event.key)) edit(event.key) 
  if (["+", "-", "*", "/"].includes(event.key)) update(event.key); 
  if (["=", "Enter"].includes(event.key)) dspResult();
   if (["c", "C", "Escape", "Backspace", "Delete"].includes(event.key)) clear();
   }