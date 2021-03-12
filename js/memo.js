const showMemo = document.getElementById('show-memo');
const memo = document.getElementsByClassName('memo');
const addMemoBtn = document.getElementsByClassName('add-memo-btn');
let editing_toggle;
let targetMemo;
let addBtn;

for (let i = 0; i < addMemoBtn.length; i++){
  addMemoBtn[i].addEventListener('mouseover', () => addBtn = addMemoBtn[i]);
  addMemoBtn[i].addEventListener('mouseout', () => addBtn = "");
  addMemoBtn[i].addEventListener('clisk', editMemo);
}

for (let i = 0; i < memo.length; i++) {
  memo[i].addEventListener('mouseover', () => targetMemo = this);
  memo[i].addEventListener('mouseout', () => targetMemo = "");
  memo[i].addEventListener('click', editMemo);
}
showMemo.addEventListener('click', editMemo);


function editMemo() {
  const editing = document.getElementsByClassName('editing')[0];
  if (addBtn) {
    const liElement = document.createElement('li');
    liElement.classList.add('memo','editing');
    liElement.setAttribute("contenteditable", "true");
    if (addBtn.id == "buildup-home") {
      const buildupList_home = document.getElementById('buildup-home-list');
      buildupList_home.appendChild(liElement);
    } else if (addBtn.id == "finish-home") {
      const finishList_home = document.getElementById('finish-home-list');
      finishList_home.appendChild(liElement);
    } else if (addBtn.id == "press-home") {
      const pressList_home = document.getElementById('press-home-list');
      pressList_home.appendChild(liElement);
    } else if (addBtn.id == "block-home") {
      const blockList_home = document.getElementById('block-home-list');
      blockList_home.appendChild(liElement);
    } else if (addBtn.id == "buildup-away") {
      const buildupList_away = document.getElementById('buildup-away-list');
      buildupList_away.appendChild(liElement);
    }else if(addBtn.id == "finish-away"){
      const finishList_away = document.getElementById('finish-away-list');
      finishList_away.appendChild(liElement);
    } else if(addBtn.id == "press-away"){
      const pressList_away = document.getElementById('press-away-list');
      pressList_away.appendChild(liElement);
    } else if(addBtn.id == "block-away"){
      const blockList_away = document.getElementById('block-away-list');
      blockList_away.appendChild(liElement);
    }
    liElement.focus();
    liElement.addEventListener('mouseover', () => targetMemo = liElement);
    liElement.addEventListener('mouseout', () => targetMemo = "");
    liElement.addEventListener('click', editMemo);
  }else if (targetMemo) {
    if (editing) {
      editing.classList.remove("editing");
      editing.removeAttribute("contenteditable");
      if (editing.innerHTML == "") {
        editing.remove();
      }
    }
    targetMemo.classList.add('editing');
    targetMemo.setAttribute("contenteditable", "true");
    targetMemo.focus();
  }else{
    console.log()
    editing.classList.remove("editing");
    editing.removeAttribute("contenteditable");
    if (editing.innerHTML == "") {
      editing.remove();
    }
  }
}