const memberBtn_t1 = document.getElementsByClassName('memberBtn_t1')[0];
const memberBtn_t2 = document.getElementsByClassName('memberBtn_t2')[0];

const member_team1 = document.getElementsByClassName('member-home')[0];
const member_team2 = document.getElementsByClassName('member-away')[0];

const memberList_home = document.getElementsByClassName('home');
const memberList_away = document.getElementsByClassName('away');


memberBtn_t1.addEventListener('click', function () {
	member_team2.style.display = 'none';
	member_team1.style.display = 'block';
	//↓openDetail用の記述↓
	teamName = this.innerHTML;
	homeAway_inSelect = "home";
	for (let i = 0; i < memberList_home.length; i++) {
		memberList_home[i].style.display = "block";
	}
	for (let j = 0; j < memberList_away.length; j++) {
		memberList_away[j].style.display = "none";
	}
});
memberBtn_t2.addEventListener('click', function () {
	member_team1.style.display = 'none';
	member_team2.style.display = 'block';
	//↓openDetail用の記述↓
	teamName = this.innerHTML;
	homeAway_inSelect = "away";
	for (let i = 0; i < memberList_away.length; i++) {
		memberList_away[i].style.display = "block";
	}
	for (let j = 0; j < memberList_home.length; j++) {
		memberList_home[j].style.display = "none";
	}
});


//横にスクロールする要素をマウスホイールで動かせるようにするJavaScript
$.fn.mycus_hScroll = function (amount) {
	amount = amount || 120;
	$(this).bind("DOMMouseScroll mousewheel", function (event) {
		var oEvent = event.originalEvent,
			direction = oEvent.detail ? oEvent.detail * -amount : oEvent.wheelDelta,
			position = $(this).scrollLeft();
		position += direction > 0 ? -amount : amount;
		$(this).scrollLeft(position);
		event.preventDefault();
	})
};

$(function () {
	$(".detailList").mycus_hScroll(35); // カッコ内の数字でスクロール量を調節できます。
});


//----------------------------------------------------------
//詳細表示（表示されている選手全員にイベントリスナーがついてる）
function openDetail() {
	const detailObj = playersObject[teamName][this.classList[0]];
	const detailList = this.closest('.byPosition').nextElementSibling;
	const detailWrap = detailList.getElementsByClassName('detailWrap')[0];

	//指定したdetailListの子要素を対象にする
	const number = detailList.querySelector('#number');
	const name = detailList.querySelector('#name');
	const age = detailList.querySelector('#age');
	const height = detailList.querySelector('#height');
	const rating = detailList.querySelector('#rating');

	const appearences = detailList.querySelector('#appearences');
	const minutes = detailList.querySelector('#minutes');

	const goals = detailList.querySelector('#goals');
	const assists = detailList.querySelector('#assists');

	const passes_total = detailList.querySelector('#passes_total');
	const passes_suc = detailList.querySelector('#passes_suc');
	const passes_key = detailList.querySelector('#passes_key');

	const dribbles_total = detailList.querySelector('#dribbles_total');
	const dribbles_suc = detailList.querySelector('#dribbles_suc');

	const duels_total = detailList.querySelector('#duels_total');
	const duels_suc = detailList.querySelector('#duels_suc');

	const tackles_total = detailList.querySelector('#tackles_total');
	const tackles_suc = detailList.querySelector('#tackles_suc');
	const tackles_int = detailList.querySelector('#tackles_int');

	number.innerHTML = detailObj.number;
	name.innerHTML = detailObj.name;
	age.innerHTML = detailObj.age;
	height.innerHTML = detailObj.height;
	rating.innerHTML = detailObj.rating;
	appearences.innerHTML = detailObj["games"].games_appearences;
	minutes.innerHTML = detailObj["games"].games_minutes;
	goals.innerHTML = detailObj["goals"].goals_total;
	assists.innerHTML = detailObj["goals"].goals_assists;
	passes_total.innerHTML = detailObj["passes"].passes_total;
	passes_suc.innerHTML = detailObj["passes"].passes_accuracy;
	passes_key.innerHTML = detailObj["passes"].passes_key;
	dribbles_total.innerHTML = detailObj["dribbles"].dribbles_attempts;
	dribbles_suc.innerHTML = detailObj["dribbles"].dribbles_success;
	duels_total.innerHTML = detailObj["duels"].duels_total;
	duels_suc.innerHTML = detailObj["duels"].duels_won;

	tackles_total.innerHTML = detailObj["tackles"].tackles_total;
	tackles_suc.innerHTML = detailObj["tackles"].tackles_blocks;
	tackles_int.innerHTML = detailObj["tackles"].tackles_interceptions;

	if (detailList.style.display == "none") {
		$(detailList).fadeIn();
	}

	const closeDetail = detailList.getElementsByClassName('close_detail')[0];
	closeDetail.addEventListener('click', function () {
		$(detailList).fadeOut();
	});
}


//--------
//選手交代
const playerChange = document.getElementsByClassName('playerChange')[0];
const playerChange_wrap = document.getElementsByClassName('playerChange_wrap')[0];
const cancelBtn = document.getElementsByClassName('cancelBtn')[0];
const btn_playerChange = document.getElementsByClassName('btn_change')[0];
const memberColumn = document.getElementsByClassName('memberColumn');


cancelBtn.addEventListener('click', function () {
	$(playerChange_wrap).animate({
		"opacity": "0"
	});
	$(playerChange).delay(300).animate({
		"width": "0",
		"padding": "20px 0"
	});
	$(playerChange_wrap).hide(500);
	$(playerChange).hide(500);
	for (let k = 0; k < memberColumn.length; k++) {
		memberColumn[k].style.opacity = 1;
		memberColumn[k].classList.remove('no-touch');
	}
});

btn_playerChange.addEventListener('click', function () {
	if (playerChange_wrap.style.display == "" || playerChange_wrap.style.display == "none") {
		$(playerChange_wrap).animate({
			"opacity": "1"
		});
		$(playerChange).animate({
			"width": "64%",
			"padding": "20px"
		});
		$(playerChange_wrap).fadeIn(300);
		$(playerChange).show();
		for (let j = 0; j < memberColumn.length; j++) {
			memberColumn[j].classList.add('no-touch');
		}
	} else {
		close();
	}
	for (let i = 0; i < memberList_away.length; i++) {
		memberList_away[i].style.display = "none";
	}
	homeAway_inSelect = "home";
})

const member_home = document.querySelector('.member-home');
const member_away = document.querySelector('.member-away');

const playerChangeBtn = document.getElementsByClassName('playerChangeBtn')[0];
playerChangeBtn.addEventListener('click', function () {
	for (let i = 1; i <= 5; i++) {
		const change = document.querySelectorAll(`.change${i}`);

		let from = change[0].value;
		let to = change[1].value;

		if (from !== "") {
			if (homeAway_inSelect == "home") {
				let from_id = document.getElementById(`b_${from}`);

				from_section = member_home.getElementsByClassName(from)[0];
				to_section = member_home.getElementsByClassName(to)[0];
				if (from_id) {
					from_id.innerHTML = to;
					from_id.id = `b_${to}`;
				}
				change[0].value = "";
				change[1].value = "";
			} else {
				let from_id = document.getElementById(`g_${from}`);

				from_section = member_away.getElementsByClassName(from)[0];
				to_section = member_away.getElementsByClassName(to)[0];
				if (from_id) {
					from_id.innerHTML = to;
					from_id.id = `g_${to}`;
				}
				change[0].value = "";
				change[1].value = "";
			}
			const from_class = from_section.classList[0];
			const to_class = to_section.classList[0];
			const from_number = from_section.children[0].innerHTML;
			const from_playerName = from_section.children[1].innerHTML;
			const to_number = to_section.children[0].innerHTML;
			const to_playerName = to_section.children[1].innerHTML;
			const change0_sameList = document.getElementsByClassName(change[0].classList[1]);
			const change1_sameList = document.getElementsByClassName(change[1].classList[1]);
			const targetElement_from = change[0].getElementsByClassName(from, homeAway_inSelect)[0];
			const targetElement_to = change[1].getElementsByClassName(to, homeAway_inSelect)[0];

			from_section.classList.replace(from_class, to_class);
			to_section.classList.replace(to_class, from_class);
			from_section.children[0].innerHTML = to_number;
			from_section.children[1].innerHTML = to_playerName;
			to_section.children[0].innerHTML = from_number;
			to_section.children[1].innerHTML = from_playerName;


			for (let j = 0; j < change0_sameList.length; j++) {
				let fromElement = change0_sameList[j].getElementsByClassName(from, homeAway_inSelect)[0];
				const clone_from = targetElement_to.cloneNode(true);
				fromElement.remove();
				change0_sameList[j].appendChild(clone_from);
			}
			for (let j = 0; j < change1_sameList.length; j++) {
				let toElement = change1_sameList[j].getElementsByClassName(to, homeAway_inSelect)[0];
				const clone_to = targetElement_from.cloneNode(true);
				toElement.remove();
				change1_sameList[j].appendChild(clone_to);
			}
		}
	}
	close();

	function close() {
		$(playerChange_wrap).animate({
			"opacity": "0"
		});
		$(playerChange).delay(300).animate({
			"width": "0",
			"padding": "20px 0"
		});
		$(playerChange_wrap).hide(500);
		$(playerChange).hide(500);
		for (let k = 0; k < memberColumn.length; k++) {
			memberColumn[k].style.opacity = 1;
			memberColumn[k].classList.remove('no-touch');
		}
	}
});