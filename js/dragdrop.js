// //ロード時にsessionStorageから情報取得
// window.addEventListener('load', restore, true);

// function restore() {
//   for (i = 1; i <= 11; i++) {
//     if (i < 10) {
//       i = '0' + i;
//     }

//     let blackTargetID = document.getElementById('b' + i);
//     let grayTargetID = document.getElementById('g' + i);

//     let placementBlackKeyX = 's01b' + i + 'x';
//     let placementBlackKeyY = 's01b' + i + 'y';
//     let placementGrayKeyX = 's01g' + i + 'x';
//     let placementGrayKeyY = 's01g' + i + 'y';

//     let placementBlackX = sessionStorage.getItem(placementBlackKeyX);
//     let placementBlackY = sessionStorage.getItem(placementBlackKeyY);
//     let placementGrayX = sessionStorage.getItem(placementGrayKeyX);
//     let placementGrayY = sessionStorage.getItem(placementGrayKeyY);

//     blackTargetID.style.left = placementBlackX;
//     blackTargetID.style.top = placementBlackY;
//     grayTargetID.style.left = placementGrayX;
//     grayTargetID.style.top = placementGrayY;
//   }

//   let ball = document.getElementById('ball');
//   let placementBallKeyX = 's01x';
//   let placementBallKeyY = 's01y';
//   let placementBallX = sessionStorage.getItem(placementBallKeyX);
//   let placementBallY = sessionStorage.getItem(placementBallKeyY);
//   ball.style.top = placementBallY;
//   ball.style.left = placementBallX;
// }

addEventListener('load', () => sessionStorage.clear())

//要素の取得
const elements = document.getElementsByClassName('drag-and-drop');
const team_black = document.getElementsByClassName('team-black');
const team_gray = document.getElementsByClassName('team-gray');
//＊querySelecterはNodeListオブジェクトであり、NodeListはaddEventListenerを持たないためquerySelecterは使えない。


//-------------------
//デフォルトプリセット
async function preset(load, target) {
  const res_preset = await fetch('formationList.json', {
    "method": "GET"
  });
  const contents_preset = await res_preset.json();
  console.log(contents_preset);

  if (load) {
    for (let i = 1; i <= team_black.length; i++) {
      let No = i;
      if (i < 10) {
        No = "0" + i;
      }
      let target_b = document.getElementById(`b${No}`);
      let target_g = document.getElementById(`g${No}`);

      let x = No + "x";
      let y = No + "y";

      target_b.style.left = contents_preset[formation_home]["buildup"][x] + "px";
      target_b.style.top = contents_preset[formation_home]["buildup"][y] + "px";

      target_g.style.left = 381 - contents_preset[formation_away]["press"][x] - 22 + "px";
      target_g.style.top = 516 - contents_preset[formation_away]["press"][y] - 22 + "px";
    }
  } else {
    if (target.classList[0] == "default") {
      let situationName_home;
      let situationName_away;

      situationName_home = target.classList[1];
      if (target.classList[1] == "buildup") {
        situationName_away = "press";
      } else if (target.classList[1] == "finish") {
        situationName_away = "block";
      } else if (target.classList[1] == "press") {
        situationName_away = "buildup";
      } else if (target.classList[1] == "block") {
        situationName_away = "finish";
      }

      for (let i = 1; i <= team_black.length; i++) {
        let No = i;
        if (i < 10) {
          No = "0" + i;
        }
        let target_b = document.getElementById(`b${No}`);
        let target_g = document.getElementById(`g${No}`);

        let x = No + "x";
        let y = No + "y";

        target_b.style.left = contents_preset[formation_home][situationName_home][x] + "px";
        target_b.style.top = contents_preset[formation_home][situationName_home][y] + "px";
        target_g.style.left = 381 - contents_preset[formation_away][situationName_away][x] - 22 + "px";
        target_g.style.top = 516 - contents_preset[formation_away][situationName_away][y] - 22 + "px";
      }
      home_away_pre = "away";
    }
  }
}


let x;
let y;
//マウスが要素内で押されたとき、又はタッチされたとき発生
//elementsは配列になっていて、for文を使うのは複数の要素に対応するため
for (let i = 0; i < elements.length; i++) {
  elements[i].addEventListener("mousedown", mdown, false);
  elements[i].addEventListener("touchstart", mdown, false);

  elements[i].addEventListener("mouseover", () => elements[i].style.zIndex = '1', false);
}

// マウスが押された際の関数
function mdown(e) {
  //(e)を設定することでイベントリスナーによって関数を使ったときだけmouseEventオブジェクトが渡される。eじゃなくてもOK

  //↓戦術矢印が対象の時だけここを通る↓(tactics欄の「対象:」を表示する処理)
  if (this.classList[0] == 'tacticsArrow') {
    const choosing = document.getElementById('choosing');
    if (this.children[0].alt == undefined) {
      choosing.innerHTML = '対象をクリックして下さい';
      choosing.style.opacity = '0.8';
    } else {
      choosing.innerHTML = this.children[0].alt;
      choosing.style.opacity = '1';
      this.style.transition = '0s';
      rotate.value = 0;
      let arrowId = this.children[0].id;
      let arrowId_scale = this.id;
      window.arrowId = arrowId;
      window.arrowId_scale = arrowId_scale;
      //↑ローカル変数を擬似的にグローバル化
      if (sessionStorage.getItem(arrowId)) {
        rotate.value = sessionStorage.getItem(arrowId);
      } else {
        rotate.value = 0;
      }
    }
  }

  //操作時にtransitionが効かないようにする処理
  for (i = 0; i < 11; i++) {
    team_black[i].style.transition = '0s';
    team_gray[i].style.transition = '0s';
    ball.style.transition = '0s';
  }

  //クラス名に .drag を追加
  this.classList.add("drag");

  //タッチとマウスで変数の中身が変わる
  if (e.type === "mousedown") {
    let event = e;
  } else {
    let event = e.changedTouches[0];
  }
  //要素内の相対座標を取得
  x = event.pageX - this.offsetLeft;
  y = event.pageY - this.offsetTop;

  //mmove関数をコールバック mdownの中で呼び出すことでmdownをしている時だけマウスに要素が追従してくるということになる。
  document.body.addEventListener("mousemove", mmove, false);
  document.body.addEventListener("touchmove", mmove, false);
}

//マウスカーソルが動いたときに発生
function mmove(e) {
  //ドラッグしている要素を取得
  const drag = document.getElementsByClassName("drag")[0];

  //同様にタッチとマウスで変数の中身が変わる
  if (e.type === "mousemove") {
    let event = e;
  } else {
    let event = e.changedTouches[0];
  }

  //フリックしたときに画面を動かさないようにデフォルト動作を抑制
  e.preventDefault();

  //viewportの幅と高さを取得
  const bodyWidth = document.getElementsByClassName('analysis-borde')[0].clientWidth;
  const bodyHeight = document.getElementsByClassName('analysis-borde')[0].clientHeight;

  // let bodyWidthP = event.pageX / bodyWidth * 100;
  // let bodyHeightP = event.pageY / bodyHeight * 100;

  //フィールドの幅と高さを取得
  const client_w = document.getElementsByClassName('placement')[0].clientWidth;
  const client_h = document.getElementsByClassName('placement')[0].clientHeight;

  let coordinateX = event.pageX - x;
  let coordinateY = event.pageY - y;
  //↑フィールド左角が基準


  let coordinateXP = coordinateX / client_w * 100;
  let coordinateYP = coordinateY / client_h * 100;

  //マウスが動いた場所に要素を動かす
  drag.style.left = coordinateX + "px";
  drag.style.top = coordinateY + "px";

  const ballXP = 100 - 27 / coordinateX * 100;
  const ballYP = 100 - 27 / coordinateY * 100;

  // 親要素を超えたときに要素の追従を停止
  if (coordinateX < 0) {
    drag.style.left = "0px";
  } else if (coordinateX > 359) {
    drag.style.left = "359px";
  }
  if (coordinateY < 0) {
    drag.style.top = "0px";
  } else if (coordinateY > 494) {
    drag.style.top = "494px";
  }

  //マウスボタンが離されたとき、またはカーソルが外れたときイベント発生
  drag.addEventListener("mouseup", mup, false);
  document.body.addEventListener("mouseleave", mup, false);
  drag.addEventListener("touchend", mup, false);
  document.body.addEventListener("touchleave", mup, false);
}

//percentageで保存する際に使用
// const client_w = document.getElementsByClassName('placement')[0].clientWidth;
// const client_h = document.getElementsByClassName('placement')[0].clientHeight;

//マウスボタンが上がったらイベント発生
function mup(e) {
  // ↑現在位置取得
  const drag = document.getElementsByClassName("drag")[0];

  //ムーブイベントハンドラの消去
  //1つ起動した時点で
  document.body.removeEventListener("mousemove", mmove, false);
  drag.removeEventListener("mouseup", mup, false);
  document.body.removeEventListener("touchmove", mmove, false);
  drag.removeEventListener("touchend", mup, false);

  //クラス名 .drag も消す
  drag.classList.remove("drag");
}


//aspectList内のinputタグの数を取得
//(-1は＋ボタンを除く計算。÷2は非表示にしているinputタグを数に入れないため。)
const NofAspect = (document.getElementById('aspectList').childElementCount - 1) / 2;
let nowSituation = 's01';

//初期設定されている局面の数だけイベントリスナーを作成
for (j = 1; j <= NofAspect; j++) {
  if (j < 10) {
    j = '0' + j;
  }
  let situationNo = 's' + j;
  let situation = document.getElementById(situationNo);
  situation.addEventListener('change', save, false);
}


//--------------------------
//配置をsessionStorageに保存
function save() {
  //人
  for (i = 1; i <= 11; i++) {
    if (i < 10) {
      i = '0' + i;
    }
    let blackID = 'b' + i;
    let blackInfo = document.getElementById(blackID);
    let keyBX = nowSituation + blackID + 'x'; //例)s01b01x
    let keyBY = nowSituation + blackID + 'y'; //例)s01b01y
    let valueX_B = blackInfo.offsetLeft + 'px';
    let valueY_B = blackInfo.offsetTop + 'px';
    // let valueX_B = blackInfo.offsetLeft / client_w * 100 + '%';
    // let valueY_B = blackInfo.offsetTop / client_h * 100 + '%';

    let grayID = 'g' + i;
    let grayInfo = document.getElementById(grayID);
    let keyGX = nowSituation + grayID + 'x';
    let keyGY = nowSituation + grayID + 'y';
    let valueX_G = grayInfo.offsetLeft + 'px';
    let valueY_G = grayInfo.offsetTop + 'px';
    // let valueX_G = grayInfo.offsetLeft / client_w * 100 + '%';
    // let valueY_G = grayInfo.offsetTop / client_h * 100 + '%';

    sessionStorage.setItem(keyBX, valueX_B);
    sessionStorage.setItem(keyBY, valueY_B);
    sessionStorage.setItem(keyGX, valueX_G);
    sessionStorage.setItem(keyGY, valueY_G);
  }

  //ボール
  const ball = document.getElementById('ball');
  let ballKeyX = nowSituation + 'x';
  let ballKeyY = nowSituation + 'y';
  let ballValueX = ball.offsetLeft + 'px';
  let ballValueY = ball.offsetTop + 'px';
  // let ballValueX = ball.offsetLeft / client_w * 100 + '%';
  // let ballValueY = ball.offsetTop / client_h * 100 + '%';

  sessionStorage.setItem(ballKeyX, ballValueX);
  sessionStorage.setItem(ballKeyY, ballValueY);

  //矢印
  let arrow = document.getElementsByClassName(nowSituation);
  for (let j = 0; j < arrow.length; j++) {
    //opacity: 0 にしてクリックできないようにする
    arrow[j].style.transition = '0.5s';
    arrow[j].style.opacity = '0';
    arrow[j].classList.add('no-touch');
  }

  //nowSituationを現在表示中のシチュエーションのidに変更
  nowSituation = this.id;

  for (k = 0; k < 11; k++) {
    team_black[k].style.transition = '1s';
    team_gray[k].style.transition = '1s';
    ball.style.transition = '1s';
  }

  let key = sessionStorage.getItem(`${nowSituation}b01x`);
  if (key) {
    //保存済みのデータを取得して配置
    for (l = 1; l <= 11; l++) {
      //選手
      if (l < 10) {
        l = '0' + l;
      }
      let placementBlackKeyX = nowSituation + 'b' + l + 'x';
      let placementBlackKeyY = nowSituation + 'b' + l + 'y';
      let placementBlackX = sessionStorage.getItem(placementBlackKeyX);
      let placementBlackY = sessionStorage.getItem(placementBlackKeyY);

      let placementGrayKeyX = nowSituation + 'g' + l + 'x';
      let placementGrayKeyY = nowSituation + 'g' + l + 'y';
      let placementGrayX = sessionStorage.getItem(placementGrayKeyX);
      let placementGrayY = sessionStorage.getItem(placementGrayKeyY);

      let blackTargetID = document.getElementById('b' + l);
      let grayTargetID = document.getElementById('g' + l);

      blackTargetID.style.top = placementBlackY;
      blackTargetID.style.left = placementBlackX;
      grayTargetID.style.top = placementGrayY;
      grayTargetID.style.left = placementGrayX;
    }
    //ボール
    let placementBallKeyX = nowSituation + 'x';
    let placementBallKeyY = nowSituation + 'y';
    let placementBallX = sessionStorage.getItem(placementBallKeyX);
    let placementBallY = sessionStorage.getItem(placementBallKeyY);
    if (placementBallX) {
      ball.style.top = placementBallY;
      ball.style.left = placementBallX;
    } else {
      ball.style.top = "252px";
      ball.style.left = "182px";
    }

    //矢印
    const arrow = document.querySelectorAll(`.${nowSituation}`);
    if (arrow.length > 0) {
      for (let m = 0; m <= arrow.length; m++) {
        console.log(arrow[m])
        arrow[m].style.opacity = '1';
        arrow[m].style.transition = '1.5s 1s';
        arrow[m].classList.remove('no-touch');
      }
    }
  } else {
    //保存されてない場合はjsonからデフォルトデータ取得
    preset(null, this);
  }
}