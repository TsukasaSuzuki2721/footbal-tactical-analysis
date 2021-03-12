//***モーダルウィンドウ***
const plusBtn = document.getElementById('plus');
const modal = document.getElementsByClassName('modalWrap_add');
const modalClose = document.getElementById('modalClose');
const inputText = document.getElementById('inputText');
const addSituation = document.getElementById('addSituation');

//＋ボタンを押したときにモーダルウィンドウを表示
plusBtn.addEventListener('click', () => modal[0].style.display = "block", false);

//モーダル内×ボタンを押したときに閉じる
modalClose.addEventListener('click', () => modal[0].style.display = "none", false);

//追加ボタンで起動
addSituation.addEventListener('click', function () {
  if (situationNo < 10) {
    situationNo = "0" + situationNo;
  }
  //label群生成
  const inputName = inputText.value;
  const labelElementParent = document.createElement("label");
  const labelElementChild = document.createElement("label");
  labelElementParent.htmlFor = "s" + situationNo;
  labelElementParent.classList.add("dent");
  labelElementChild.htmlFor = "s" + situationNo;
  //↓子要素のlavel内に、指定された名前をノードの形で記述。↓
  const labelName = document.createTextNode(inputName);
  //↑appendChildで追加できるのはノードに限るためcreatTextNodeで追加↑
  labelElementChild.appendChild(labelName);
  labelElementParent.appendChild(labelElementChild);
  // console.log('lavel生成後：' + situationNo);

  //input要素生成
  const inputElement = document.createElement("input");
  inputElement.type = 'radio';
  inputElement.id = "s" + situationNo;
  inputElement.name = "situation";

  //親要素と+ボタンの参照を取得
  const aspectList = document.getElementById('aspectList');
  const plusBtn = document.getElementById('plus');

  //要素を追加
  aspectList.insertBefore(inputElement, plusBtn);
  aspectList.insertBefore(labelElementParent, plusBtn);

  //ロードに備えてsessionStrageに保存する際のキーを作成
  let SituationKey = 's' + situationNo + 'aspect';

  //追加した要素に対してaddEventListenerを付与
  let getNewElementID = document.getElementById('s' + situationNo);
  getNewElementID.addEventListener('change', save, false);

  //displayを閉じる
  modal[0].style.display = "none";
  //次の要素追加に備えて＋1
  situationNo++;
  // console.log('situationNo＋1後：' + situationNo);
});

let situationNo = NofAspect + 1;


//-------------------
//display表示・非表示
const memoBtn = document.getElementById('view-memo');
const memberBtn = document.getElementById('view-member');
const tacticsBtn = document.getElementById('view-tactics');
const memoBox = document.getElementById('show-memo');
const memberBox = document.getElementById('show-member');
const tacticsBox = document.getElementById('show-tactics');

memoBtn.addEventListener('click', function () {
  memoBox.style.display = "block";
  memberBox.style.display = "none";
  tacticsBox.style.display = "none";
});
memberBtn.addEventListener('click', function () {
  memoBox.style.display = "none";
  memberBox.style.display = "block";
  tacticsBox.style.display = "none";
});
tacticsBtn.addEventListener('click', function () {
  memoBox.style.display = "none";
  memberBox.style.display = "none";
  tacticsBox.style.display = "block";
});