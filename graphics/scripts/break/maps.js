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
		}))
	}

	let stageElems = document.querySelectorAll('.stageElem');
	let opacity = state ? 1 : 0;

	for (let i = 0; i < stageElems.length; i++) {
		const elem = stageElems[i];
		let cardYTo = state ? 0 : 50;
		let cardYFrom = state ? -50 : 0;
		let cardDelay = 0.075 ;
		let cardEase = state ? 'power2.out' : 'power2.in';
		if(i === 0){
			cardDelay+=offset
		}

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
			setWinner(i + 1, '', false);
		} else if (element === 1) {
			setWinner(i + 1, SBData.value.teamAInfo.name, true);
		} else {
			setWinner(i + 1, SBData.value.teamBInfo.name, true);
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
			if (maplist.length === 4) {
				stageWidth = '300px';
				stagesGrid.style.width = '1020px';
			} else if (maplist.length === 6) {
				stageWidth = '250px';
				stagesGrid.style.width = '1450px';
			} else if (maplist.length === 8) {
				stageWidth = '200px';
				stagesGrid.style.width = '1680px';
			}

			for (let i = 1; i < maplist.length; i++) {
				const element = maplist[i];
				let elem = `
				<div class="stageElem" style="width: ${stageWidth};">
					<div class="stageImg" style="width: ${stageWidth}; background-image: url('${mapNameToImagePath[element.map]}');"></div>
					<div class="stageShade" style="width: ${stageWidth};"></div>

					<div class="gameInfo" style="width: ${stageWidth};">
						<div class="gameMap">${element.map}</div>
						<div class="gameMode">${element.mode}</div>
					</div>

					<div class="stageWinner" style="opacity: 1; width: ${stageWidth};" id="stageWinner_${i}">
						<div class="teamWinnerName" id="stageWinnerName_${i}"> </div>
					</div>
				</div>
				`
				mapsHTML += elem;
			}

			stagesGrid.innerHTML = mapsHTML;
			setWinners(mapWinners.value)
		}
	});
	if (currentBreakScene.value === 'maps'){
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

const maplists = nodecg.Replicant('maplists', 'ipl-overlay-controls');
const currentMaplistID = nodecg.Replicant('currentMaplistID', 'ipl-overlay-controls');
const mapWinners = nodecg.Replicant('mapWinners', 'ipl-overlay-controls');
const SBData = nodecg.Replicant('SBData', 'ipl-overlay-controls');

window.addEventListener('load', () => {
	NodeCG.waitForReplicants(mapWinners, SBData).then(() => {
		mapWinners.on('change', (newValue, oldValue) => {
			setWinners(newValue);
		});

		SBData.on('change', newValue => {
			setWinners(mapWinners.value);
		});
	});
});

NodeCG.waitForReplicants(maplists, currentMaplistID, mapWinners).then(() => {
	currentMaplistID.on('change', newValue => {
		let maplist = maplists.value.filter(list => list[0].id == newValue)[0];
		createMapListElems(maplist);
	});

	maplists.on('change', (newValue, oldValue) => {
		if (!oldValue) return;
		let newCurrentList = newValue.filter(list => list[0].id == currentMaplistID.value)[0];
		let oldCurrentList = oldValue.filter(list => list[0].id == currentMaplistID.value)[0];

		if (compareMapLists(newCurrentList, oldCurrentList)) {
			createMapListElems(newCurrentList);
		}
	});
});
