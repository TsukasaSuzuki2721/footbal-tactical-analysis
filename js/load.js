const
  liveBtn = document.querySelector('.liveBtn'),
  liveDisplay = document.querySelector('.liveColumn'),
  liveClose = document.querySelector('.live_close'),
  simurationBtn = document.querySelector('.simurationBtn'),
  simurationDisplay = document.querySelector('.simurationColumn'),
  simurationClose = document.querySelector('.simuration_close');

menu_showHide(liveBtn, simurationBtn, liveDisplay);
menu_showHide(simurationBtn, liveBtn, simurationDisplay);
menu_showHide(liveClose, liveDisplay, simurationBtn);
menu_showHide(simurationClose, simurationDisplay, liveBtn);

function menu_showHide(click_el, hide_el, show_el) {
  $(click_el).on('click', function () {
    $(hide_el).addClass("no-touch").animate({
        'opacity': '0'
      }, 500,
      function () {
        $(show_el).removeClass("no-touch").animate({
          'opacity': '1'
        }, 1000)
      });
  });
};

//ロード時にモーダルウィンドウ表示
const loadWrap = document.querySelector('.loadWrap');
addEventListener('load', () => loadWrap.style.display = "block");

//***点滅のアニメーション***
const
  homeTeam = document.getElementsByClassName('homeTeam')[0],
  awayTeam = document.getElementsByClassName('awayTeam')[0];

simurationBtn.addEventListener('click', () => focus(animation));
homeTeam.addEventListener('click', () => focus(animation));
awayTeam.addEventListener('click', () => focus(animation));

//アニメーションの関数
let
  loop = null,
  animationTarget;

function focus(callback) {
  if (loop !== null) {
    clearTimeout(loop);
  }
  if (this == awayTeam) {
    homeTeam.id = '';
    awayTeam.id = 'focus';
  } else {
    awayTeam.id = '';
    homeTeam.id = 'focus';
  }
  animation();
}
const animation = function () {
  animationTarget = document.getElementById('focus');
  $(animationTarget).animate({
    'color': '#f4f5f7'
  }, 350, () => $(animationTarget).animate({
    'color': '#333'
  }, 350));
  loop = setTimeout(animation, 1200);
};



const startBtn = document.getElementsByClassName('start')[0];
const selectColumn = document.getElementsByClassName('selectColumn')[0];
const teamList = document.getElementsByClassName('teamList');

//選択時の処理
for (i = 0; i < teamList.length; i++) {
  teamList[i].addEventListener('change', function () {
    animationTarget.value = this.value;
    if (homeTeam.id == "focus") {
      homeTeam.id = "";
      awayTeam.id = "focus";
      window.homeTeamId = this.children[this.selectedIndex].id;
      window.homeTeamName = this.value;
      window.detail
      eval("var user_" + 1 + " = 'hogehoge';");
    } else {
      clearTimeout(loop);
      $(teamList).animate({
        'margin': '12px 0 0'
      }, 'linear');
      $(selectColumn).animate({
        'bottom': '25px'
      }, 'linear');
      $(startBtn).delay(300).fadeIn(1000);
      window.awayTeamId = this.children[this.selectedIndex].id;
      window.awayTeamName = this.value;
    }
    this.value = '';
  });
}


startBtn.addEventListener('click', startGame);

async function startGame() {
  closeAnimation();

  const memberBtnHome = document.querySelector('.memberBtn_t1');
  const memberBtnAway = document.querySelector('.memberBtn_t2');
  const homeName_memo = document.querySelector('#home-name');
  const awayName_memo = document.querySelector('#away-name');

  if (this == startBtn) {
    memberBtnHome.innerHTML = homeTeamName;
    homeName_memo.innerHTML = homeTeamName;
    memberBtnAway.innerHTML = awayTeamName;
    awayName_memo.innerHTML = awayTeamName;
    //↓openDetail()用↓
    window.teamName = homeTeamName;

    await pastXI(homeTeamId, homeTeamName, "home");
    await pastXI(awayTeamId, awayTeamName, "away");
    load_detail.innerHTML = `取得したデータを出力`;
    await outputPlayers(homeTeamName, "home");
    await outputPlayers(awayTeamName, "away");
  } else {
    const
      homeTeam_name = inplayObject[this.id].homeTeam_name,
      homeTeam_id = inplayObject[this.id].homeTeam_id,
      awayTeam_name = inplayObject[this.id].awayTeam_name,
      awayTeam_id = inplayObject[this.id].awayTeam_id;

    memberBtnHome.innerHTML = homeTeam_name;
    homeName_memo.innerHTML = homeTeam_name;
    memberBtnAway.innerHTML = awayTeam_name;
    awayName_memo.innerHTML = awayTeam_name;
    //↓openDetail()用↓
    window.teamName = homeTeam_name;

    await getXI_inplay(this.id, homeTeam_id, homeTeam_name, "home");
    await getXI_inplay(this.id, awayTeam_id, awayTeam_name, "away");

    await outputPlayers(homeTeam_name, "home");
    await outputPlayers(awayTeam_name, "away");
  }
  //出力のする物がないリストは消す
  const playerList = document.getElementsByClassName('playerList');
  for (let j = 0; j < playerList.length; j++) {
    if (playerList[j].children.length == 0) {
      playerList[j].parentNode.style.display = "none";
    }
  }
}

const
  remainBox = document.querySelector('.remainBox'),
  title_modal = document.querySelector('.title_modal'),
  load_detail = document.querySelector('.load_detail'),
  load_detail2 = document.querySelector('.load_detail2'),
  mode = document.querySelectorAll('.mode'),
  modeWrap = document.querySelectorAll('.modeWrap'),
  explanationColumn = document.querySelectorAll('.explanationColumn'),
  explanationWrap = document.querySelectorAll('.explanationWrap');

function closeAnimation() {
  for (let i = 0; i < mode.length; i++) {
    $(modeWrap[i]).animate({
      "opacity": "0"
    });
    $(mode[i]).delay(300).animate({
      "height": "0",
      "marginTop": "88px"
    });
    $(modeWrap[i]).hide(1500);
    $(mode[i]).hide(1500);
  }

  for (let i = 0; i < explanationColumn.length; i++) {
    $(explanationWrap[i]).animate({
      "opacity": "0"
    }, 'linear');
    $(explanationColumn[i]).delay(300).animate({
      "height": "0",
      "marginTop": "172px"
    });
    $(explanationWrap[i]).hide(1500);
    $(explanationColumn[i]).hide(1500);
  }

  $(remainBox).delay(600).animate({
    "top": "190px"
  }, 800, function () {
    $(load_detail).fadeIn(500);
  });
}

//----
//info
const
  modalWrap_info = document.getElementsByClassName('modalWrap_info')[0],
  introduction = document.getElementsByClassName('introduction'),
  intro_title = document.getElementsByClassName('intro_title')[0],
  intro_img = document.getElementsByClassName('intro_img')[0],
  intro_txt = document.getElementsByClassName('intro_txt')[0],
  about_intro = document.getElementById('about_intro'),
  placement_intro = document.getElementById('placement_intro'),
  member_intro = document.getElementById('member_intro'),
  flow_intro = document.getElementById('flow_intro'),
  tactics_intro = document.getElementById('tactics_intro'),
  title_info = document.getElementsByClassName('title_info');
let nowIntro = about_intro;

const existing = localStorage.getItem("existingUser");
if (!existing) {
  $(modalWrap_info).fadeIn();
  localStorage.setItem("existingUser", "already");
}

for (let i = 0; i < introduction.length; i++) {
  introduction[i].addEventListener('click', function () {
    for (let i = 0; i < title_info.length; i++) {
      title_info[i].style.fontSize = "19px";
    }
    this.children[1].style.fontSize = "22px";
    nowIntro.children[0].style.transform = "rotate(360deg)";
    nowIntro.children[0].classList.replace('far', 'fas');
    if (this.id == "about_intro") {
      nowIntro = about_intro;
      intro_title.innerHTML = "本サービスについて";
      intro_img.src = "images/image01.jpg";
      intro_txt.innerHTML = "football tactical analysisはサッカーの戦術分析を手助けするサービスです。<br>戦術的局面ごとに戦術ボードを使い選手の配置を確認できます。<br>また、メンバー一覧では選手に関する詳細なデータを見ることができます。<br>このサービスを利用することで、考えながら見るサッカー観戦が可能になります。";
      localStorage.setItem("readed_about", "already");

    } else if (this.id == "placement_intro") {
      nowIntro = placement_intro;
      intro_title.innerHTML = "選手配置";
      intro_img.src = "images/image02.jpg";
      intro_txt.innerHTML = "選手は自由に動かすことができます。<br>局面ごとに選手の配置は保存され、自由にフォーメーションを組むことができます。<br>局面は、デフォルトでビルドアップ、フィニッシュ、プレス、ブロックの4つが設定されており、＋ボタンで追加することが可能です。<br>より詳細に戦術的局面を見極め、分析に役立てましょう。";
      localStorage.setItem("readed_placement", "already");

    } else if (this.id == "member_intro") {
      nowIntro = member_intro;
      intro_title.innerHTML = "メンバー";
      intro_img.src = "images/image03.jpg";
      intro_txt.innerHTML = "チームに所属している選手が表示されます。<br>名前をクリックすることで選手に関する詳細情報(*)を確認することができます。<br>選手の交代は「選手交代」ボタンから行えます。<br>(＊選手の情報は現在のシーズンの所属リーグにおける試合でのデータです。)";
      localStorage.setItem("readed_member", "already");

    } else if (this.id == "flow_intro") {
      nowIntro = flow_intro;
      intro_title.innerHTML = "メモ";
      intro_img.src = "images/image04.jpg";
      intro_txt.innerHTML = "ビルドアップ対プレス、フィニッシュ対ブロックのように、戦術的局面ごとにメモをすることができます。<br>上手に活用し、戦術の分析に役立ててください。";
      localStorage.setItem("readed_flow", "already");

    } else if (this.id == "tactics_intro") {
      nowIntro = tactics_intro;
      intro_title.innerHTML = "タクティクス";
      intro_img.src = "images/image05.jpg";
      intro_txt.innerHTML = "戦術を意味する矢印を配置することができます。<br>全10種類の矢印がありチームごとの多彩な戦術を表現することができます。<br>この機能を活用し、見てわかる戦術ボードを作りましょう。";
      localStorage.setItem("readed_tactics", "already");
    }
  });
}

const modalClose_info = document.getElementById('modalClose_info');
modalClose_info.addEventListener('click', () => $(modalWrap_info).fadeOut());

const infoBtn = document.getElementById('info');
infoBtn.addEventListener('click', function () {
  $(modalWrap_info).fadeIn();
  if (localStorage.getItem("readed_about")) {
    about_intro.children[0].classList.replace('far', 'fas');
  } else if (localStorage.getItem("readed_placement")) {
    placement_intro.children[0].classList.replace('far', 'fas');
  } else if (localStorage.getItem("readed_member")) {
    member_intro.children[0].classList.replace('far', 'fas');
  } else if (localStorage.getItem("readed_flow")) {
    flow_intro.children[0].classList.replace('far', 'fas');
  } else if (localStorage.getItem("readed_placement")) {
    readed_intro.children[0].classList.replace('far', 'fas');
  }
});