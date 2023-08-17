const longFeed = document.querySelector('#rong-feed');
const superLongFeed = document.querySelector('#super-rong-feed');
const cross = document.querySelector('#cross');
const earlyCross = document.querySelector('#earlycross');
const sideChange = document.querySelector('#side-change');
const overlap = document.querySelector('#overlap');
const sprint = document.querySelector('#sprint');
const move = document.querySelector('#move');

const addTacticsBtn = document.getElementById('add-tactics');
const rotate = document.getElementById('rotate');
const inversionRL = document.getElementById('leftAndRight');
const inversionUD = document.getElementById('upAndDown');
const tacticalBox = document.getElementById('tacticalBox');
const ball = document.getElementById('ball');
const feild = document.getElementsByClassName('placement');

//↓タクティクスすべてにアクセスできる
const tacticsList = document.getElementsByClassName('tactics');
addTacticsBtn.addEventListener('click', function () {
  //チェックした要素
  for (let i = 0; i < tacticsList.length; i++) {
    if (tacticsList[i].checked == true) {
      //画像をhtml内に出力
      const imgElement = document.createElement('img');
      const scaleElement = document.createElement('div');

      imgElement.src = 'images/' + tacticsList[i].id + '.svg';
      imgElement.alt = tacticsList[i].value;
      imgElement.id = nowSituation + 'arrow' + arrowNumber;
      scaleElement.id = nowSituation + 'scale' + arrowNumber;
      scaleElement.className = `tacticsArrow drag-and-drop ${nowSituation}`;
      scaleElement.appendChild(imgElement);
      feild[0].appendChild(scaleElement);
      if (imgElement.alt == 'ロングフィード' || imgElement.alt == '超ロングフィード' || imgElement.alt == 'クロス' || imgElement.alt == 'アーリークロス' || imgElement.alt == 'サイドチェンジ' || imgElement.alt == 'ロブパス' ||  　imgElement.alt == 'ロングパス') {
        scaleElement.style.filter = 'drop-shadow(1px 6px 0.8px #C0BBC0)';
      }
      // this.checked = false;

      arrowNumber += 1;

      //追加後にチェックを外す
      tacticsList[i].checked = false;

      //追加後にターゲットにする
      choosing.innerHTML = imgElement.alt;
      arrowId = imgElement.id;
      arrowId_scale = scaleElement.id;
    }
  }
  const tacticsArrow = document.getElementsByClassName('tacticsArrow');
  tacticsArrow[0].addEventListener("mousedown", mdown, false);
  for (let j = 0; j < tacticsArrow.length; j++) {
    tacticsArrow[j].addEventListener("mousedown", mdown, false);
    tacticsArrow[j].addEventListener("touchstart", mdown, false);
    tacticsArrow[j].addEventListener("mouseover", function () {
      const upper = document.getElementsByClassName('upper');
      for (let NofUpper = 0; NofUpper < upper.length; NofUpper++) {
        upper[NofUpper].style.zIndex = "1";
      }
    });
    tacticsArrow[j].addEventListener("mouseout", function () {
      const upper = document.getElementsByClassName('upper');
      for (let NofUpper = 0; NofUpper < upper.length; NofUpper++) {
        upper[NofUpper].style.zIndex = "";
      }
    });
  }
});

let arrowNumber = 1;

rotate.addEventListener('input', function () {
  const inOperationArrow = document.getElementById(arrowId);
  let rotateValue = rotate.value;
  inOperationArrow.style.transform = `rotate(${rotateValue}deg)`;
  sessionStorage.setItem(arrowId, rotateValue);
});
inversionRL.addEventListener('click', inversion, false);
inversionUD.addEventListener('click', inversion, false);

function inversion() {
  const inOperationArrow_scale = document.getElementById(arrowId_scale);
  if (this == inversionRL) {
    if (inOperationArrow_scale.style.transform == "scale(1, 1)") {
      inOperationArrow_scale.style.transform = 'scale(-1, 1)';
    } else if (inOperationArrow_scale.style.transform == "scale(-1, 1)") {
      inOperationArrow_scale.style.transform = 'scale(1, 1)';
    } else if (inOperationArrow_scale.style.transform == "scale(1, -1)") {
      inOperationArrow_scale.style.transform = 'scale(-1, -1)';
    } else if (inOperationArrow_scale.style.transform == "scale(-1, -1)") {
      inOperationArrow_scale.style.transform = 'scale(1, -1)';
    } else {
      inOperationArrow_scale.style.transform = 'scale(-1, 1)';
    }
  } else {
    if (inOperationArrow_scale.style.transform == "scale(1, 1)") {
      inOperationArrow_scale.style.transform = 'scale(1, -1)';
    } else if (inOperationArrow_scale.style.transform == "scale(-1, 1)") {
      inOperationArrow_scale.style.transform = 'scale(-1, -1)';
    } else if (inOperationArrow_scale.style.transform == "scale(1, -1)") {
      inOperationArrow_scale.style.transform = 'scale(1, 1)';
    } else if (inOperationArrow_scale.style.transform == "scale(-1, -1)") {
      inOperationArrow_scale.style.transform = 'scale(-1, 1)';
    } else {
      inOperationArrow_scale.style.transform = 'scale(1, -1)';
    }
  }
}


//削除ボタンで矢印削除
const deleteBtn = document.getElementById('delete');
deleteBtn.addEventListener('click', function () {
  const deleteTarget = document.getElementById(arrowId_scale);
  const choosing = document.getElementById('choosing');
  deleteTarget.remove();
  choosing.innerHTML = '対象をクリックして下さい';
  choosing.style.opacity = '0.8';
});