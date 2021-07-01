/**
 * Change the view-ability of the team break Scene
 * Scene Time : 0.9
 * @param {boolean} state - to show or not
 * @param {any} timeline
 * @param {number} offset
 */
function stagesSceneAnimation(state, timeline, offset) {
	if (state){
		timeline.add(gsap.to('.stagesGrid', {
			opacity: 1,
		}), `-=${offset}`)
	}

	let stageElems = document.querySelectorAll('.stageElem');
	let opacity = state ? 1 : 0;

	for (let i = 0; i < stageElems.length; i++) {
		const elem = stageElems[i];
		let cardYTo = state ? 0 : 50;
		let cardYFrom = state ? -50 : 0;
		let cardDelay = 0.16;
		let cardEase = state ? 'power2.out' : 'power2.in';

		timeline.add(gsap.fromTo(elem,
			{y: cardYFrom, opacity: (opacity === 1) ? 0 : 1},
			{duration: 0.3, y: cardYTo, ease: cardEase, opacity: opacity}
		), `-=${cardDelay}`)
	}

	if (!state){
		timeline.add(gsap.to('.stagesGrid', {
			opacity: 0,
		}))
	}

}

function setWinners(val) {
	for (let i = 0; i < val.length; i++) {
		const element = val[i];
		if (element === 0) {
			setWinner(i, '', false);
		} else if (element === 1) {
			setWinner(i, scoreboardData.value.teamAInfo.name, true);
		} else {
			setWinner(i, scoreboardData.value.teamBInfo.name, true);
		}
	}
}

function setWinner(index, name, shown) {
	let winnerElem = document.querySelector(`#stageWinner_${index}`);
	let winnerNameElem = document.querySelector(`#stageWinnerName_${index}`);

	if (!winnerElem) return;
	let opacity;

	if (shown) {
		opacity = 1;
	} else {
		opacity = 0
	}
	;

	if (shown) {
		winnerNameElem.innerText = name;
	}

	gsap.to(winnerElem, {opacity: opacity, duration: 0.5});
}

function createMapListElems(maplist) {
	let stagesGrid = document.querySelector('.stagesGrid');
	gsap.to(stagesGrid, {
		duration: 0.5, opacity: 0, onComplete: function () {
			stagesGrid.innerHTML = '';

			let mapsHTML = '';
			let stageWidth
			let nameWidth;
			if (maplist.length === 3) {
				stageWidth = '300px';
				stagesGrid.style.width = '1020px';
				nameWidth = "280px"
			} else if (maplist.length === 5) {
				stageWidth = '250px';
				stagesGrid.style.width = '1450px';
				nameWidth = "230px"
			} else if (maplist.length === 7) {
				stageWidth = '200px';
				stagesGrid.style.width = '1680px';
				nameWidth = "180px"
			}

			for (let i = 0; i < maplist.length; i++) {
				const element = maplist[i];
				let elem = `
				<div class="stageElem" style="width: ${stageWidth};">
					<div class="stageImg" style="width: ${stageWidth}; background-image: url('${mapNameToImagePath[element.stage]}');"></div>
					<div class="stageShade" style="width: ${stageWidth};"></div>

					<div class="gameInfo" style="width: ${stageWidth};">
						<div class="gameMap">${element.stage}</div>
						<div class="gameMode">${element.mode}</div>
					</div>

					<div class="stageWinner" style="opacity: 1; width: ${stageWidth};" id="stageWinner_${i}">
						<div class="teamWinnerName" style="max-width: ${nameWidth}" id="stageWinnerName_${i}"> </div>
					</div>
				</div>
				`
				mapsHTML += elem;
			}

			stagesGrid.innerHTML = mapsHTML;
			setWinners(gameWinners.value)
		}
	});
	if (activeBreakScene.value === 'stages'){
		gsap.to(stagesGrid, {duration: 0.5, opacity: 1, delay: 1});
	}
}

// returns true if there is a difference
function compareMapLists(val1, val2) {
	if (val1[0].id !== val2[0].id || val1[0].name !== val2[0].name) return true;
	if (val1.length !== val2.length) return true;
	for (let i = 1; i < val1.length; i++) {
		if (val1[i].map !== val2[i].map || val1[i].mode !== val2[i].mode) return true;
	}
	return false;
}

// returns true if there is a difference
function roundsDiffer(val1, val2) {
	if (val1.length !== val2.length) return true;
	for (let i = 0; i < val1.length; i++) {
		if (val1[i].stage !== val2[i].stage || val1[i].mode !== val2[i].mode) return true;
	}
	return false;
}

window.addEventListener('load', () => {
	NodeCG.waitForReplicants(gameWinners, scoreboardData).then(() => {
		gameWinners.on('change', (newValue, oldValue) => {
			setWinners(newValue);
		});

		scoreboardData.on('change', newValue => {
			setWinners(gameWinners.value);
		});
	});
});

NodeCG.waitForReplicants(rounds, activeRound, gameWinners).then(() => {
	activeRound.on('change', newValue => {
		let maplist = rounds.value[newValue]['games'];
		createMapListElems(maplist);
	});

	rounds.on('change', (newValue, oldValue) => {
		if (!oldValue) return;
		let newCurrentList = newValue[activeRound.value]['games'];
		let oldCurrentList = oldValue[activeRound.value]['games'];

		if (roundsDiffer(newCurrentList, oldCurrentList)) {
			createMapListElems(newCurrentList);
		}
	});
});
