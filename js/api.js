//対象リーグのid (手動)
const
  Laliga_id = "3513",
  PremierLeague_id = "3456",
  SerieA_id = "3576",
  Ligue1_id = "3506",
  Bundesliga_id = "3510";

addEventListener('load', inPlayGames, false);
addEventListener('load', () => getTeams(Laliga_id), false);
addEventListener('load', () => getTeams(PremierLeague_id), false);
addEventListener('load', () => getTeams(Ligue1_id), false);
addEventListener('load', () => getTeams(SerieA_id), false);
addEventListener('load', () => getTeams(Bundesliga_id), false);


//-------------------
//進行中のゲームを表示
const inplayObject = new Object();
async function inPlayGames() {
  const res_live = await fetch("https://api-football-v1.p.rapidapi.com/v2/fixtures/live?timezone=Europe%2FLondon", {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "f003acd520msh5976065b082680ap19aabcjsn06211161e262",
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
    }
  });
  const
    contents_players = await res_live.json(),
    inplay = contents_players["api"]["fixtures"],
    lignUp = document.getElementsByClassName('lignUp')[0];

  api++; //謎

  for (let i in inplay) {
    let league_id = inplay[i].league_id;
    if (league_id == 3513 || league_id == 3456 || league_id == 3576 || league_id == 3506 || league_id == 3510 || league_id == 2791 || league_id == 3046 || league_id == 2941 || league_id == 2771 || league_id == 2777) {
      //1つもない場合の文章を非表示
      document.getElementsByClassName('no-games')[0].style.display = "none";

      //対象のリーグなら表示
      inplayObject[inplay[i].fixture_id] = new Object();
      inplayObject[inplay[i].fixture_id].fixture_id = inplay[i].fixture_id;
      inplayObject[inplay[i].fixture_id].league_id = inplay[i].league_id;
      inplayObject[inplay[i].fixture_id].league_name = inplay[i]["league"].name;
      inplayObject[inplay[i].fixture_id].homeTeam_id = inplay[i]["homeTeam"].team_id;
      inplayObject[inplay[i].fixture_id].homeTeam_name = inplay[i]["homeTeam"].team_name;
      inplayObject[inplay[i].fixture_id].awayTeam_id = inplay[i]["awayTeam"].team_id;
      inplayObject[inplay[i].fixture_id].awayTeam_name = inplay[i]["awayTeam"].team_name;
      inplayObject[inplay[i].fixture_id].score_home = inplay[i].goalsHomeTeam;
      inplayObject[inplay[i].fixture_id].score_away = inplay[i].goalsAwayTeam;

      const
        sectionElement = document.createElement('section'),
        h5Element = document.createElement('h5'),
        divElement = document.createElement('div'),
        pElement_home = document.createElement('p'),
        pElement_score = document.createElement('p'),
        pElement_away = document.createElement('p'),
        buttonElement_start = document.createElement('button'),
        buttonElement_close = document.createElement('button');

      sectionElement.classList.add(inplay[i].fixture_id);
      sectionElement.classList.add("h2h_live");
      h5Element.classList.add("inplay_title");
      pElement_home.classList.add('inplay_team');
      pElement_away.classList.add('inplay_team');
      pElement_score.classList.add('inplay_score');
      buttonElement_start.classList.add('startBtn');
      buttonElement_close.classList.add("closeStart");
      buttonElement_close.classList.add(`close_${inplay[i].fixture_id}`);
      sectionElement.id = inplay[i].fixture_id;

      h5Element.innerHTML = inplay[i]["league"].name;
      pElement_home.innerHTML = inplay[i]["homeTeam"].team_name;
      pElement_away.innerHTML = inplay[i]["awayTeam"].team_name;
      pElement_score.innerHTML = inplay[i].goalsHomeTeam + " - " + inplay[i].goalsAwayTeam;
      buttonElement_start.innerHTML = "分析開始";
      buttonElement_close.innerHTML = "－";

      sectionElement.appendChild(h5Element);
      sectionElement.appendChild(divElement);
      sectionElement.appendChild(buttonElement_start);
      sectionElement.appendChild(buttonElement_close);
      divElement.appendChild(pElement_home);
      divElement.appendChild(pElement_score);
      divElement.appendChild(pElement_away);
      lignUp.appendChild(sectionElement);

      sectionElement.addEventListener('click', startGame);
    }
  }
}


let api = 0; //謎
//--------------------------------
//リーグに属するチームを取得して表示
async function getTeams(league_id) {
  //取得したリーグIDから所属チームを取得
  const res_teams = await fetch(`https://api-football-v1.p.rapidapi.com/v2/teams/league/${league_id}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "f003acd520msh5976065b082680ap19aabcjsn06211161e262",
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
    }
  });
  const contents_teams = await res_teams.json();
  const teamInfo = contents_teams["api"]["teams"];
  const teams_name = new Array(); //謎
  const teams_id = new Array(); //謎
  api++; //謎

  let targetList;
  //出力先を決定
  if (league_id == Laliga_id) {
    targetList = document.getElementById('LaLiga');
  } else if (league_id == PremierLeague_id) {
    targetList = document.getElementById('PremirLeague');
  } else if (league_id == SerieA_id) {
    targetList = document.getElementById('SerieA');
  } else if (league_id == Ligue1_id) {
    targetList = document.getElementById('Leage1');
  } else if (league_id == Bundesliga_id) {
    targetList = document.getElementById('Bundesliga');
  }

  for (let i in teamInfo) {
    teams_name.push(teamInfo[i]["name"]); //謎
    teams_id.push(teamInfo[i]["team_id"]); //謎

    const teamOption = document.createElement('option');
    teamOption.id = teamInfo[i]["team_id"];
    teamOption.value = teamInfo[i]["name"];
    teamOption.innerHTML = teamInfo[i]["name"];
    targetList.appendChild(teamOption);
  }
}


//-----------------------------------------------------------
//過去５試合のメンバーからチームメンバーと正確な背番号を割り出す
const playersObject = new Object();
async function pastXI(team_id, target_name, home_away) {
  let = pastNo = 1;
  const res_pastXI = await fetch(`https://api-football-v1.p.rapidapi.com/v2/fixtures/team/${team_id}/last/5`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "f003acd520msh5976065b082680ap19aabcjsn06211161e262",
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
    }
  });
  const contents_pastXI = await res_pastXI.json();
  const fixtures = contents_pastXI["api"]["fixtures"];
  const NofGames = contents_pastXI["api"]["fixtures"].length;


  //チーム名でオブジェクトを作る
  playersObject[target_name] = new Object();

  for (let i = 1; i < NofGames; i++) {
    load_detail.innerHTML = `${target_name}の過去５試合のチーム情報を取得中(${pastNo}/5)`;
    let pastId = fixtures[i].fixture_id;
    await getXI(pastId);
    pastNo++;
  }
  load_detail.innerHTML = `${target_name}の過去５試合のチーム情報を取得中(${pastNo}/5)`;
  await getXI(fixtures[0].fixture_id, "newest", home_away);

  async function getXI(fixture_id, newest, home_away) {
    const res_getMember = await fetch(`https://api-football-v1.p.rapidapi.com/v2/lineups/${fixture_id}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "f003acd520msh5976065b082680ap19aabcjsn06211161e262",
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
      }
    });

    const contents_getMember = await res_getMember.json();
    const st_member = contents_getMember["api"]["lineUps"][target_name]["startXI"];
    const sub_member = contents_getMember["api"]["lineUps"][target_name]["substitutes"];


    //関数を起動
    if (newest == "newest") {
      await inportMember(st_member, "stm", home_away);
      await inportMember(sub_member, "sub", home_away);

      const formation = contents_getMember["api"]["lineUps"][target_name].formation;
      if (home_away == "home") {
        window.formation_home = formation;
      } else {
        window.formation_away = formation;
      }
    } else {
      await inportMember(st_member);
      await inportMember(sub_member);
    }

    await getDetail(target_name, team_id);

    //playersオブジェクトの中に選手ごとにオブジェクトをつくる関数
    function inportMember(target, stm_sub, home_away) {
      const numberingTarget_home = document.querySelectorAll('.Bnum');
      const numberingTarget_away = document.querySelectorAll('.Gnum');
      let count_home = 0;
      let count_away = 0;

      for (let j = 0; j < target.length; j++) {
        let addPlayer = target[j].number;
        if (stm_sub) {
          if (!playersObject[target_name][addPlayer]) {
            playersObject[target_name][addPlayer] = new Object();
            playersObject[target_name][addPlayer].name = target[j].player;
            playersObject[target_name][addPlayer].number = target[j].number;
            playersObject[target_name][addPlayer].id = target[j].player_id;
            playersObject[target_name][addPlayer].pos = target[j].pos;
            if (stm_sub == "stm") {
              playersObject[target_name][addPlayer].type = "stm";
              if (home_away == "home") {
                numberingTarget_home[count_home].id = `b_${target[j].number}`;
                numberingTarget_home[count_home].innerHTML = target[j].number;
                count_home++;
              } else {
                numberingTarget_away[count_away].id = `g_${target[j].number}`;
                numberingTarget_away[count_away].innerHTML = target[j].number;
                count_away++;
              }
            } else if (stm_sub == "sub") {
              playersObject[target_name][addPlayer].type = "sub";
            }
          } else {
            playersObject[target_name][addPlayer].name = target[j].player;
            playersObject[target_name][addPlayer].number = target[j].number;
            playersObject[target_name][addPlayer].id = target[j].player_id;
            playersObject[target_name][addPlayer].pos = target[j].pos;
            if (stm_sub == "stm") {
              playersObject[target_name][addPlayer].type = "stm";
              if (home_away == "home") {
                numberingTarget_home[count_home].id = `b_${target[j].number}`;
                numberingTarget_home[count_home].innerHTML = target[j].number;
                count_home++;
              } else {
                numberingTarget_away[count_away].id = `g_${target[j].number}`;
                numberingTarget_away[count_away].innerHTML = target[j].number;
                count_away++;
              }
            } else if (stm_sub == "sub") {
              playersObject[target_name][addPlayer].type = "sub";
            }
          }
        } else {
          if (!playersObject[target_name][addPlayer]) {
            playersObject[target_name][addPlayer] = new Object();
            playersObject[target_name][addPlayer].name = target[j].player;
            playersObject[target_name][addPlayer].number = target[j].number;
            playersObject[target_name][addPlayer].id = target[j].player_id;
            playersObject[target_name][addPlayer].pos = target[j].pos;
            playersObject[target_name][addPlayer].type = "oth";
          }
        }
      }
    }
  }
}


//------------------------------
//進行中の試合のメンバーを受け取る
async function getXI_inplay(fixture_id, team_id, team_name, home_away) {
  load_detail.innerHTML = "データ取得中";
  //チーム名でオブジェクトを作る
  playersObject[team_name] = new Object();

  const res_getMember = await fetch(`https://api-football-v1.p.rapidapi.com/v2/lineups/${fixture_id}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "f003acd520msh5976065b082680ap19aabcjsn06211161e262",
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
    }
  });
  const contents_getMember = await res_getMember.json();
  const st_member = contents_getMember["api"]["lineUps"][team_name]["startXI"];
  const sub_member = contents_getMember["api"]["lineUps"][team_name]["substitutes"];
  api++;

  const formation = contents_getMember["api"]["lineUps"][team_name].formation;
  if (home_away == "home") {
    window.formation_home = formation;
  } else {
    window.formation_away = formation;
  }

  await inportMember(st_member, "stm");
  await inportMember(sub_member, "sub");

  await getDetail(team_name, team_id);

  //playersオブジェクトの中に選手ごとにオブジェクトをつくる関数
  function inportMember(target, stm_sub) {
    const numberingTarget_home = document.querySelectorAll('.Bnum');
    const numberingTarget_away = document.querySelectorAll('.Gnum');
    let count_home = 0;
    let count_away = 0;
    for (let j = 0; j < target.length; j++) {
      let addPlayer = target[j].number;

      playersObject[team_name][addPlayer] = new Object();
      playersObject[team_name].formation = formation;
      playersObject[team_name][addPlayer].name = target[j].player;
      playersObject[team_name][addPlayer].number = target[j].number;
      playersObject[team_name][addPlayer].id = target[j].player_id;
      playersObject[team_name][addPlayer].pos = target[j].pos;
      if (stm_sub == "stm") {
        playersObject[team_name][addPlayer].type = "stm";
        if (home_away == "home") {
          numberingTarget_home[count_home].id = `b_${target[j].number}`;
          numberingTarget_home[count_home].innerHTML = target[j].number;
          count_home++;
        } else {
          numberingTarget_away[count_away].id = `g_${target[j].number}`;
          numberingTarget_away[count_away].innerHTML = target[j].number;
          count_away++;
        }
      } else if (stm_sub == "sub") {
        playersObject[team_name][addPlayer].type = "sub";
      }
    }
  }
}


// ---------------------------
// playerObjectの中身を出力する
function outputPlayers(teamName, homeaway) {
  const playersObj = Object.values(playersObject[teamName]);
  for (let i = 0; i < playersObj.length; i++) {
    exportPlayer(playersObj[i]);
  }
  preset("load", null);
  $(loadWrap).fadeOut();

  function exportPlayer(target) {
    let fwList = document.getElementById(`fw-${target.type}-${homeaway}`);
    let mfList = document.getElementById(`mf-${target.type}-${homeaway}`);
    let dfList = document.getElementById(`df-${target.type}-${homeaway}`);
    let gkList = document.getElementById(`gk-${target.type}-${homeaway}`);
    let selectList = document.querySelectorAll(`.${target.type}List`);

    //選手交代の方に出力
    for (let i = 0; i < selectList.length; i++) {
      const optionElement = document.createElement('option');
      optionElement.value = target.number;
      optionElement.innerHTML = `${target.number} ${target.name}`;
      optionElement.classList.add(homeaway);
      optionElement.classList.add(target.number);
      selectList[i].appendChild(optionElement);
    }

    if (target.pos == "F") {
      //必要なタグを生成
      const sectionElement_fw = document.createElement('section');
      const playerElement_fw = document.createElement('p');
      const numberElement_fw = document.createElement('p');

      //タグの中身を出力
      playerElement_fw.innerHTML = target.name;
      numberElement_fw.innerHTML = target.number;

      //クラスとidをつける
      sectionElement_fw.classList.add(target.number);
      playerElement_fw.classList.add("playerName");
      playerElement_fw.id = `stf${i}`;
      numberElement_fw.classList.add("num");
      numberElement_fw.id = `stf${i}_num`;

      //書き出し
      sectionElement_fw.appendChild(numberElement_fw);
      sectionElement_fw.appendChild(playerElement_fw);
      fwList.appendChild(sectionElement_fw);
      sectionElement_fw.addEventListener('click', openDetail, false);

    } else if (target.pos == "M") {
      const sectionElement_mf = document.createElement('section');
      const playerElement_mf = document.createElement('p');
      const numberElement_mf = document.createElement('p');

      sectionElement_mf.classList.add(target.number);
      numberElement_mf.classList.add("num");
      numberElement_mf.id = `stm${i}`;
      playerElement_mf.classList.add("playerName");
      playerElement_mf.id = `stm${i}`;

      numberElement_mf.innerHTML = target.number;
      playerElement_mf.innerHTML = target.name;

      sectionElement_mf.appendChild(numberElement_mf);
      sectionElement_mf.appendChild(playerElement_mf);
      mfList.appendChild(sectionElement_mf);
      sectionElement_mf.addEventListener('click', openDetail, false);

    } else if (target.pos == "D") {
      const sectionElement_df = document.createElement('section');
      const playerElement_df = document.createElement('p');
      const numberElement_df = document.createElement('p');

      sectionElement_df.classList.add(target.number);
      numberElement_df.classList.add("num");
      numberElement_df.id = `std${i}`;
      playerElement_df.classList.add("playerName");
      playerElement_df.id = `std${i}`;

      numberElement_df.innerHTML = target.number;
      playerElement_df.innerHTML = target.name;

      sectionElement_df.appendChild(numberElement_df);
      sectionElement_df.appendChild(playerElement_df);
      dfList.appendChild(sectionElement_df);
      sectionElement_df.addEventListener('click', openDetail, false);

    } else if (target.pos == "G") {
      const sectionElement_gk = document.createElement('section');
      const playerElement_gk = document.createElement('p');
      const numberElement_gk = document.createElement('p');

      sectionElement_gk.classList.add(target.number);
      numberElement_gk.classList.add("num");
      numberElement_gk.id = `stg${i}`;
      playerElement_gk.classList.add("playerName");
      playerElement_gk.id = `stg${i}`;

      numberElement_gk.innerHTML = target.number;
      playerElement_gk.innerHTML = target.name;

      sectionElement_gk.appendChild(numberElement_gk);
      sectionElement_gk.appendChild(playerElement_gk);
      gkList.appendChild(sectionElement_gk);
      sectionElement_gk.addEventListener('click', openDetail, false);
    }
  }
}



const season = 2021;
//------------------------------
//選手に関する詳細な情報を取得する
async function getDetail(team_name, team_id) {
  const res_detail = await fetch(`https://api-football-v1.p.rapidapi.com/v2/players/team/${team_id}/${season}-${season+1}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "f003acd520msh5976065b082680ap19aabcjsn06211161e262",
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
    }
  });
  const contents_detail = await res_detail.json();
  const playersDetail_api = contents_detail["api"]["players"];
  api++;

  const playersList = Object.values(playersObject[team_name]);

  for (let i = 0; i < playersList.length; i++) {
    let player_id = playersList[i].id;

    for (let j = 0; j < playersDetail_api.length; j++) {
      //league_idが所属リーグかつplayer_idが一致するもののみ取り出す
      if ((playersDetail_api[j].league_id == Laliga_id || playersDetail_api[j].league_id == PremierLeague_id || playersDetail_api[j].league_id == SerieA_id || playersDetail_api[j].league_id == Ligue1_id || playersDetail_api[j].league_id == Bundesliga_id) && playersDetail_api[j].player_id == player_id) {
        //必要な情報をapiから取得
        let age = playersDetail_api[j].age;
        let height = playersDetail_api[j].height;
        let weight = playersDetail_api[j].weight;
        let injured = playersDetail_api[j].injured;
        let rating = Math.round(Number(playersDetail_api[j].rating) * 10) / 10;
        let goals_total = playersDetail_api[j]["goals"].total;
        let goals_assists = playersDetail_api[j]["goals"].assists;
        let passes_total = playersDetail_api[j]["passes"].total;
        let passes_accuracy = playersDetail_api[j]["passes"].accuracy;
        let passes_key = playersDetail_api[j]["passes"].key;
        let tackles_total = playersDetail_api[j]["tackles"].total;
        let tackles_blocks = playersDetail_api[j]["tackles"].blocks;
        let tackles_interceptions = playersDetail_api[j]["tackles"].interceptions;
        let duels_total = playersDetail_api[j]["duels"].total;
        let duels_won = playersDetail_api[j]["duels"].won;
        let dribbles_attempts = playersDetail_api[j]["dribbles"].attempts;
        let dribbles_success = playersDetail_api[j]["dribbles"].success;
        let games_appearences = playersDetail_api[j]["games"].appearences;
        let games_minutes = playersDetail_api[j]["games"].minutes_played;

        //オブジェクト生成
        let goals = playersObject[team_name][playersList[i].number]["goals"] = new Object();
        let passes = playersObject[team_name][playersList[i].number]["passes"] = new Object();
        let tackles = playersObject[team_name][playersList[i].number]["tackles"] = new Object();
        let duels = playersObject[team_name][playersList[i].number]["duels"] = new Object();
        let dribbles = playersObject[team_name][playersList[i].number]["dribbles"] = new Object();
        let games = playersObject[team_name][playersList[i].number]["games"] = new Object();

        playersObject[team_name][playersList[i].number].age = age;
        playersObject[team_name][playersList[i].number].height = height;
        playersObject[team_name][playersList[i].number].weight = weight;
        playersObject[team_name][playersList[i].number].injured = injured;
        playersObject[team_name][playersList[i].number].rating = rating;
        goals.goals_total = goals_total;
        goals.goals_assists = goals_assists;
        passes.passes_total = passes_total;
        passes.passes_accuracy = passes_accuracy;
        passes.passes_key = passes_key;
        tackles.tackles_total = tackles_total;
        tackles.tackles_blocks = tackles_blocks;
        tackles.tackles_interceptions = tackles_interceptions;
        duels.duels_total = duels_total;
        duels.duels_won = Math.round(duels_won / duels_total * 100);
        dribbles.dribbles_attempts = dribbles_attempts;
        dribbles.dribbles_success = dribbles_success;
        games.games_appearences = games_appearences;
        games.games_minutes = games_minutes;
      }
    }
  }
}