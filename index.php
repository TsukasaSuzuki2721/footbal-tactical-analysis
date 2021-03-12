<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="none,noindex,nofollow">
  <link rel="stylesheet" href="css/riset.css">
  <link rel="stylesheet" href="css/style.css">
  <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">
  <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <!-- JQuery color -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-color/2.1.2/jquery.color.js"></script>
  <title>Football tactical analysis</title>
</head>

<body>
  <div class="analysis-borde">
    <div class="left-wrap">
      <header>
        <p><span>Football</span> tactical analysis</p>
        <ul class="navi_header">
          <li>
            <i class="fas fa-undo"></i>
          </li>
          <li id="info"><i class="fas fa-info"></i></li>
        </ul>
      </header>
      <main>
        <div class="tactical-menu">
          <div id="aspectList">
            <input type="radio" name="situation" class="default buildup" id="s01" checked="checked">
            <label for="s01" class="dent">
              <label for="s01">ビルドアップ</label>
            </label>

            <input type="radio" name="situation" class="default finish" id="s02">
            <label for="s02" class="dent">
              <label for="s02">フィニッシュ</label>
            </label>

            <input type="radio" name="situation" class="default press" id="s03">
            <label for="s03" class="dent">
              <label for="s03">プレス</label>
            </label>

            <input type="radio" name="situation" class="default block" id="s04">
            <label for="s04" class="dent">
              <label for="s04">ブロック</label>
            </label>

            <div id="plus">
              <p>+</p>
            </div>
          </div>
        </div>
        <div class="borde">
          <img src="images/borde.jpg" alt="">
          <img src="images/borde.jpg" alt="">
          <img src="images/borde.jpg" alt="">
          <img src="images/borde.jpg" alt="">
          <div>
            <div class="placement">
              <!-- ↑ id指定の場合js側でエラーが出たためクラス指定 -->
              <div class="teamB">
                <div class="team-black drag-and-drop upper" id="b01">
                  <p class="Bnum">1</p>
                </div>
                <div class="team-black drag-and-drop upper" id="b02">
                  <p class="Bnum">2</p>
                </div>
                <div class="team-black drag-and-drop upper" id="b03">
                  <p class="Bnum">3</p>
                </div>
                <div class="team-black drag-and-drop upper" id="b04">
                  <p class="Bnum">4</p>
                </div>
                <div class="team-black drag-and-drop upper" id="b05">
                  <p class="Bnum">5</p>
                </div>
                <div class="team-black drag-and-drop upper" id="b06">
                  <p class="Bnum">6</p>
                </div>
                <div class="team-black drag-and-drop upper" id="b07">
                  <p class="Bnum">7</p>
                </div>
                <div class="team-black drag-and-drop upper" id="b08">
                  <p class="Bnum">8</p>
                </div>
                <div class="team-black drag-and-drop upper" id="b09">
                  <p class="Bnum">9</p>
                </div>
                <div class="team-black drag-and-drop upper" id="b10">
                  <p class="Bnum">10</p>
                </div>
                <div class="team-black drag-and-drop upper" id="b11">
                  <p class="Bnum">11</p>
                </div>
              </div>
              <!-- ↓ここからGrayチーム↓ -->
              <div class="teamG">
                <div class="team-gray drag-and-drop upper" id="g01">
                  <p class="Gnum">1</p>
                </div>
                <div class="team-gray drag-and-drop upper" id="g02">
                  <p class="Gnum">2</p>
                </div>
                <div class="team-gray drag-and-drop upper" id="g03">
                  <p class="Gnum">3</p>
                </div>
                <div class="team-gray drag-and-drop upper" id="g04">
                  <p class="Gnum">4</p>
                </div>
                <div class="team-gray drag-and-drop upper" id="g05">
                  <p class="Gnum">5</p>
                </div>
                <div class="team-gray drag-and-drop upper" id="g06">
                  <p class="Gnum">6</p>
                </div>
                <div class="team-gray drag-and-drop upper" id="g07">
                  <p class="Gnum">7</p>
                </div>
                <div class="team-gray drag-and-drop upper" id="g08">
                  <p class="Gnum">8</p>
                </div>
                <div class="team-gray drag-and-drop upper" id="g09">
                  <p class="Gnum">9</p>
                </div>
                <div class="team-gray drag-and-drop upper" id="g10">
                  <p class="Gnum">10</p>
                </div>
                <div class="team-gray drag-and-drop upper" id="g11">
                  <p class="Gnum">11</p>
                </div>
              </div>
              <!-- <div id="tacticalBox"></div> -->
              <i id="ball" class="far fa-futbol drag-and-drop upper"></i>
              <img src="images/borde.jpg" class="drag-and-drop" id="feeldFilter">
            </div>
          </div>
        </div>
    </div>
    <div class="right-wrap">
      <ul class="data-menu">
        <input type="radio" name="data" id="member" checked="checked">
        <li class="dent" id="view-member">
          <label for="member">
            <div class="menu-box">
              <img src="images/member.svg" alt="">
              <p>メンバー</p>
            </div>
          </label>
        </li>

        <input type="radio" name="data" id="flow">
        <li class="dent" id="view-memo">
          <label for="flow">
            <div class="menu-box">
              <img src="images/stats.svg" alt="">
              <p>メモ</p>
            </div>
          </label>
        </li>

        <input type="radio" name="data" id="tactics">
        <li class="dent" id="view-tactics">
          <label for="tactics">
            <div class="menu-box">
              <img src="images/tactics.svg" alt="">
              <p>タクティクス</p>
            </div>
          </label>
        </li>
      </ul>
      <div class="display">
        <div id="show-member">
          <div class="header_member">
            <div class="memberBtn">
              <input type="radio" name="memberBtn" id="team1" checked>
              <label for="team1">
                <div class="black-team"></div>
                <span class="memberBtn_t1">home team</span>
              </label>
              <input type="radio" name="memberBtn" id="team2">
              <label for="team2">
                <div class="gray-team"></div>
                <span class="memberBtn_t2">away team</span>
              </label>
            </div>
            <button class="btn_change">選手交代</button>
          </div>

          <div class="playerChange">
            <div class="playerChange_wrap">
              <h3>選手交代</h3>
              <section class="changeSection">
                <p>スタメン ⇔ サブメンバー</p>
                <div class="changeSelect">
                  <select class="selectBox stmList change1">
                    <option value="">選択してください</option>
                    <!-- api使用 -->
                  </select>
                  <p>⇔</p>
                  <select class="selectBox subList change1">
                    <option value="">選択してください</option>
                    <!-- api使用 -->
                  </select>
                </div>
                <div class="changeSelect">
                  <select class="selectBox stmList change2">
                    <option value="">選択してください</option>
                    <!-- api使用 -->
                  </select>
                  <p>⇔</p>
                  <select class="selectBox subList change2">
                    <option value="">選択してください</option>
                    <!-- api使用 -->
                  </select>
                </div>
                <div class="changeSelect">
                  <select class="selectBox stmList change3">
                    <option value="">選択してください</option>
                    <!-- api使用 -->
                  </select>
                  <p>⇔</p>
                  <select class="selectBox subList change3">
                    <option value="">選択してください</option>
                    <!-- api使用 -->
                  </select>
                </div>
              </section>
              <section class="changeSection">
                <p>スタメン ⇔ ベンチ外メンバー</p>
                <div class="changeSelect">
                  <select class="selectBox stmList change4">
                    <option value="">選択してください</option>
                    <!-- api使用 -->
                  </select>
                  <p>⇔</p>
                  <select class="selectBox othList change4">
                    <option value="">選択してください</option>
                    <!-- api使用 -->
                  </select>
                </div>
              </section>
              <section class="changeSection">
                <p>サブメンバー ⇔ ベンチ外メンバー</p>
                <div class="changeSelect">
                  <select class="selectBox subList change5">
                    <option value="">選択してください</option>
                    <!-- api使用 -->
                  </select>
                  <p>⇔</p>
                  <select class="selectBox othList change5">
                    <option value="">選択してください</option>
                    <!-- api使用 -->
                  </select>
                </div>
              </section>
              <div class="btnBox">
                <button class="cancelBtn btn_change">キャンセル</button>
                <button class="playerChangeBtn btn_change">交代</button>
              </div>
            </div>
          </div>
          <div class="memberColumn member-home">
            <h3>-STARTING MEMBER-</h3>
            <section class="byPosition">
              <p class="position-fw">FW</p>
              <div class="playerList" id="fw-stm-home">
                <!-- apiで記述 -->
              </div>
            </section>
            <?php include('material.php') ?>

            <section class="byPosition">
              <p class="position-mf">MF</p>
              <div class="playerList" id="mf-stm-home">
                <!-- apiで記述 -->
              </div>
            </section>
            <?php include('material.php') ?>

            <section class="byPosition">
              <p class="position-df">DF</p>
              <div class="playerList" id="df-stm-home">
                <!-- apiで記述 -->
              </div>
            </section>
            <?php include('material.php') ?>

            <section class="byPosition">
              <p class="position-gk">GK</p>
              <div class="playerList" id="gk-stm-home">
                <!-- apiで記述 -->
              </div>
            </section>
            <?php include('material.php') ?>

            <h3>-SUB MEMBER-</h3>
            <section class="byPosition">
              <p class="position-fw">FW</p>
              <div class="playerList" id="fw-sub-home">
                <!-- apiで記述 -->
              </div>
            </section>
            <?php include('material.php') ?>

            <section class="byPosition">
              <p class="position-mf">MF</p>
              <div class="playerList" id="mf-sub-home">
                <!-- apiで記述 -->
              </div>
            </section>
            <?php include('material.php') ?>

            <section class="byPosition">
              <p class="position-df">DF</p>
              <div class="playerList" id="df-sub-home">
                <!-- apiで記述 -->
              </div>
            </section>
            <?php include('material.php') ?>

            <section class="byPosition">
              <p class="position-gk">GK</p>
              <div class="playerList" id="gk-sub-home">
                <!-- apiで記述 -->
              </div>
            </section>
            <?php include('material.php') ?>

            <h3>-OTHER MEMBER-</h3>
            <div class="otherList" id="other-home">
              <section class="byPosition">
                <p class="position-fw">FW</p>
                <div class="playerList" id="fw-oth-home">
                  <!-- apiで記述 -->
                </div>
              </section>
              <?php include('material.php') ?>

              <section class="byPosition">
                <p class="position-mf">MF</p>
                <div class="playerList" id="mf-oth-home">
                  <!-- apiで記述 -->
                </div>
              </section>
              <?php include('material.php') ?>

              <section class="byPosition">
                <p class="position-df">DF</p>
                <div class="playerList" id="df-oth-home">
                  <!-- apiで記述 -->
                </div>
              </section>
              <?php include('material.php') ?>

              <section class="byPosition">
                <p class="position-gk">GK</p>
                <div class="playerList" id="gk-oth-home">
                  <!-- apiで記述 -->
                </div>
              </section>
              <?php include('material.php') ?>
            </div>
          </div>

          <div class="memberColumn member-away">
            <h3>-STARTING MEMBER-</h3>
            <section class="byPosition">
              <p class="position-fw">FW</p>
              <div class="playerList" id="fw-stm-away">
                <!-- apiで記述 -->
              </div>
            </section>
            <?php include('material.php') ?>

            <section class="byPosition">
              <p class="position-mf">MF</p>
              <div class="playerList" id="mf-stm-away">
                <!-- apiで記述 -->
              </div>
            </section>
            <?php include('material.php') ?>

            <section class="byPosition">
              <p class="position-df">DF</p>
              <div class="playerList" id="df-stm-away">
                <!-- apiで記述 -->
              </div>
            </section>
            <?php include('material.php') ?>

            <section class="byPosition">
              <p class="position-gk">GK</p>
              <div class="playerList" id="gk-stm-away">
                <!-- apiで記述 -->
              </div>
            </section>
            <?php include('material.php') ?>

            <h3>-SUB MEMBER-</h3>
            <section class="byPosition">
              <p class="position-fw">FW</p>
              <div class="playerList" id="fw-sub-away">
                <!-- apiで記述 -->
              </div>
            </section>
            <?php include('material.php') ?>

            <section class="byPosition">
              <p class="position-mf">MF</p>
              <div class="playerList" id="mf-sub-away">
                <!-- apiで記述 -->
              </div>
            </section>
            <?php include('material.php') ?>

            <section class="byPosition">
              <p class="position-df">DF</p>
              <div class="playerList" id="df-sub-away">
                <!-- apiで記述 -->
              </div>
            </section>
            <?php include('material.php') ?>

            <section class="byPosition">
              <p class="position-gk">GK</p>
              <div class="playerList" id="gk-sub-away">
                <!-- apiで記述 -->
              </div>
            </section>
            <?php include('material.php') ?>

            <h3>-OTHER MEMBER-</h3>
            <div class="otherList" id="other-away">
              <section class="byPosition">
                <p class="position-fw">FW</p>
                <div class="playerList" id="fw-oth-away">
                  <!-- apiで記述 -->
                </div>
              </section>
              <?php include('material.php') ?>

              <section class="byPosition">
                <p class="position-mf">MF</p>
                <div class="playerList" id="mf-oth-away">
                  <!-- apiで記述 -->
                </div>
              </section>
              <?php include('material.php') ?>

              <section class="byPosition">
                <p class="position-df">DF</p>
                <div class="playerList" id="df-oth-away">
                  <!-- apiで記述 -->
                </div>
              </section>
              <?php include('material.php') ?>

              <section class="byPosition">
                <p class="position-gk">GK</p>
                <div class="playerList" id="gk-oth-away">
                  <!-- apiで記述 -->
                </div>
              </section>
              <?php include('material.php') ?>
            </div>
          </div>
        </div>

        <div id="show-memo">
          <div class="header-memo">
            <section>
              <div class="black-srcle"></div>
              <p id="home-name">Barcelona</p>
            </section>
            <section>
              <div class="gray-srcle"></div>
              <p id="away-name">Real Madrid</p>
            </section>
          </div>
          <div class="contents-wrap">
            <section class="fight-wrap">
              <div class="left-aspect">
                <button class="left-buttom add-memo-btn" id="buildup-home">+</button>
                <section>
                  <p>ビルドアップ</p>
                  <ul id="buildup-home-list">
                  </ul>
                </section>
              </div>
              <p>VS</p>
              <div class="right-aspect">
                <section>
                  <p>プレス</p>
                  <ul id="press-away-list">

                  </ul>
                </section>
                <button class="right-buttom add-memo-btn" id="press-away">+</button>
              </div>
            </section>
            <div class="contents-wrap">
              <section class="fight-wrap">
                <div class="left-aspect">
                  <button class="left-buttom add-memo-btn" id="finish-home">+</button>
                  <section>
                    <p>フィニッシュ</p>
                    <ul id="finish-home-list">

                    </ul>
                  </section>
                </div>
                <p>VS</p>
                <div class="right-aspect">
                  <section>
                    <p>ブロック</p>
                    <ul id="block-away-list">

                    </ul>
                  </section>
                  <button class="right-buttom add-memo-btn" id="block-away">+</button>
                </div>
              </section>
              <div class="contents-wrap">
                <section class="fight-wrap">
                  <div class="left-aspect">
                    <button class="left-buttom add-memo-btn" id="press-home">+</button>
                    <section>
                      <p>プレス</p>
                      <ul id="press-home-list">

                      </ul>
                    </section>
                  </div>
                  <p>VS</p>
                  <div class="right-aspect">
                    <section>
                      <p>ビルドアップ</p>
                      <ul id="buildup-away-list">

                      </ul>
                    </section>
                    <button class="right-buttom add-memo-btn" id="buildup-away">+</button>
                  </div>
                </section>
                <div class="contents-wrap">
                  <section class="fight-wrap">
                    <div class="left-aspect">
                      <button class="left-buttom add-memo-btn" id="block-home">+</button>
                      <section>
                        <p>ブロック</p>
                        <ul id="block-home-list">

                        </ul>
                      </section>
                    </div>
                    <p>VS</p>
                    <div class="right-aspect">
                      <section>
                        <p>フィニッシュ</p>
                        <ul id="finish-away-list">

                        </ul>
                      </section>
                      <button class="right-buttom add-memo-btn" id="finish-away">+</button>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
          </main>
        </div>
        
        <div id="show-tactics">
                <h3>追加</h3>
                <section class="tacticsBox">
                  <label for="longfeed">
                    <input type="checkbox" name="tactics" id="longfeed" class="tactics" value="ロングフィード">
                    <div>
                      <img src="images/longfeed_icon.svg" alt="">
                    </div>
                    ロングフィード
                  </label>
                  <label for="longPass">
                    <input type="checkbox" name="tactics" id="longPass" class="tactics" value="ロングパス">
                    <div>
                      <img src="images/longpass_icon.svg" alt="">
                    </div>
                    ロングパス
                  </label>
                  <label for="robPass">
                    <input type="checkbox" name="tactics" id="robPass" class="tactics" value="ロブパス">
                    <div>
                      <img src="images/lobpass_icon.svg" alt="">
                    </div>
                    ロブパス
                  </label>
                  <label for="pass">
                    <input type="checkbox" name="tactics" id="pass" class="tactics" value="パス">
                    <div>
                      <img src="images/pass_icon.svg" alt="">
                    </div>
                    パス
                  </label>
                  <label for="cross">
                    <input type="checkbox" name="tactics" id="cross" class="tactics" value="クロス">
                    <div>
                      <img src="images/cross_icon.svg" alt="">
                    </div>
                    クロス
                  </label>
                  <label for="earlyCross">
                    <input type="checkbox" name="tactics" id="earlyCross" class="tactics" value="アーリークロス">
                    <div>
                      <img src="images/earlycross_icon.svg" alt="">
                    </div>
                    アーリークロス
                  </label>
                  <label for="sideChange">
                    <input type="checkbox" name="tactics" id="sideChange" class="tactics" value="サイドチェンジ">
                    <div>
                      <img src="images/sidechange_icon.svg" alt="">
                    </div>
                    サイドチェンジ
                  </label>
                  <label for="overlap">
                    <input type="checkbox" name="tactics" id="overlap" class="tactics" value="オーバーラップ">
                    <div>
                      <img src="images/overlap_icon.svg" alt="">
                    </div>

                    オーバーラップ
                  </label>
                  <label for="sprint">
                    <input type="checkbox" name="tactics" id="sprint" class="tactics" value="スプリント">
                    <div>
                      <img src="images/sprint_icon.svg" alt="">
                    </div>
                    スプリント
                  </label>
                  <label for="move">
                    <input type="checkbox" name="tactics" id="move" class="tactics" value="移動">
                    <div>
                      <img src="images/move_icon.svg" alt="">
                    </div>
                    移動
                  </label>
                </section>
                <button id="add-tactics">追加</button>

                <h3>編集・削除</h3>
                <div class="edit-delete">
                  <section>
                    <p>対象：<span id="choosing">対象をクリックして下さい</span></p>
                  </section>
                  <section>
                    <section>
                      <p>回転：</p>
                      <input type="number" step="4" placeholder="0" id="rotate">度
                    </section>
                    <section>
                      <p>反転：</p>
                      <button id="leftAndRight">左右</button>
                      <button id="upAndDown">上下</button>
                    </section>
                    <button id="delete">削除</button>
                  </section>
                </div>
              </div>

        <!-- モーダルウィンドウ（局面追加） -->
        <div class="modalWrap_add">
          <div class="modal_add">
            <div class="relative_add">
              <div id="modalClose">
                <p>×</p>
              </div>
              <section>
                <p>局面を追加する</p>
                <div>
                  <input type="text" id="inputText" placeholder="名前を設定してください" value="">
                  <div id="addSituation">追加</div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div class="loadWrap">
          <div class="mordal_load">
            <div class="remainBox">
              <h1 class="title_modal">Football tactical analysis</h1>
              <p class="load_detail"></p>
              <p class="load_detail2"></p>
            </div>
            <div class="modeColumn">
              <section class="mode liveBtn">
                <div class="modeWrap">
                  <img src="images/live.svg" alt="" class="live">
                  <p>リアルタイム分析</p>
                </div>
              </section>
              <section class="mode simurationBtn">
                <div class="modeWrap">
                  <img src="images/simuration.svg" alt="" class="simuration">
                  <p>シミュレーション</p>
                </div>
              </section>
            </div>
            <div class="explanation">
              <section class="explanationColumn liveColumn no-touch">
                <div class="explanationWrap">
                  <div class="close live_close">×</div>
                  <h3>リアルタイム分析</h3>
                  <p class="detail_load">
                    現在進行中の試合の戦術分析ができます。<br>
                    欧州5大リーグに対応しています。
                  </p>
                  <h4>Line up</h4>
                  <div class="lignUp">
                    <p class="no-games">現在、進行中の試合はありません</p>
                    <!-- api使う -->
                  </div>
                </div>
              </section>
              <section class="explanationColumn simurationColumn no-touch">
                <div class="explanationWrap">
                  <div class="close simuration_close">×</div>
                  <h3>シミュレーション</h3>
                  <p class="detail_load">
                    選んだチームのマッチアップを想定して戦術を考えることができます。<br>
                    欧州5大リーグに対応しています。
                  </p>
                  <h4>TEAM SELECT</h4>
                  <section>
                    <div class="h2h">
                      <input type="text" value="homeTeam" class="inputTeam homeTeam" readonly />
                      <p>VS</p>
                      <input type="text" value="awayTeam" class="inputTeam awayTeam" readonly />
                    </div>
                    <button class="start">START</button>
                    <div class="selectColumn">
                      <select name="" id="LaLiga" class="teamList">
                        <option value="">La Liga</option>
                        <!-- apiで作る -->
                      </select>
                      <select name="" id="SerieA" class="teamList">
                        <option value="">Serie A</option>
                        <!-- apiで作る -->
                      </select>
                      <select name="" id="PremirLeague" class="teamList">
                        <option value="">Premir Leage</option>
                        <!-- apiで作る -->
                      </select>
                      <select name="" id="Leage1" class="teamList">
                        <option value="">Leage 1</option>
                        <!-- apiで作る -->
                      </select>
                      <select name="" id="Bundesliga" class="teamList">
                        <option value="">Bundesliga</option>
                        <!-- apiで作る -->
                      </select>
                    </div>
                  </section>
                </div>
              </section>
            </div>
          </div>
        </div>

        <!-- モーダルウィンドウ（インフォメーション） -->
        <div class="modalWrap_info">
          <div class="modal_info">
            <div class="relative_info">
              <h1>Football tactical analysisの使い方</h1>
              <button id="modalClose_info">×</button>
              <div class="contents">
                <div class="checkList">
                  <section class="introduction" id="about_intro">
                    <i class="far fa-check-circle"></i>
                    <p class="title_info">本サービスについて</p>
                  </section>
                  <section class="introduction" id="placement_intro">
                    <i class="far fa-check-circle"></i>
                    <p class="title_info">選手配置</p>
                  </section>
                  <section class="introduction" id="member_intro">
                    <i class="far fa-check-circle"></i>
                    <p class="title_info">メンバー</p>
                  </section>
                  <section class="introduction" id="flow_intro">
                    <i class="far fa-check-circle"></i>
                    <p class="title_info">メモ</p>
                  </section>
                  <section class="introduction" id="tactics_intro">
                    <i class="far fa-check-circle"></i>
                    <p class="title_info">タクティクス</p>
                  </section>
                </div>
                <div class="detailColumn_info">
                  <h2 class="intro_title">本サービスについて</h2>
                  <div>
                    <img src="images/image01.jpg" class="intro_img">
                    <p class="intro_txt">
                    football tactical analysisはサッカーの戦術分析を手助けするサービスです。<br>戦術的局面ごとに戦術ボードを使い選手の配置を確認できます。<br>また、メンバー一覧では選手に関する詳細なデータを見ることができます。<br>このサービスを利用することで、考えながら見るサッカー観戦が可能になります。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <script src="js/api.js"></script>
        <script src="js/load.js"></script>
        <script src="js/dragdrop.js"></script>
        <script src="js/plus.js"></script>
        <script src="js/tactics.js"></script>
        <script src="js/member.js" defer></script>
        <script src="js/memo.js"></script>
</body>

</html>