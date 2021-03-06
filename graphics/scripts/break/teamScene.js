const nextTeams = nodecg.Replicant('nextTeams', 'ipl-overlay-controls');
const teamImageHidden = nodecg.Replicant('teamImageHidden', 'ipl-overlay-controls');

let nextTeamAName = document.getElementById('nextTeamAName')
let nextTeamBName = document.getElementById('nextTeamBName')
let teamAIcon = document.getElementById('teamAIcon')
let teamBIcon = document.getElementById('teamBIcon')
let teamANames = document.getElementById('teamANames')
let teamBNames = document.getElementById('teamBNames')

/**
 * Change the view-ability of the team break Scene
 * Scene Time : 1.00
 * @param {boolean} state - to show or not
 * @param {any} timeline
 * @param {number} offset
 */
function teamSceneAnimation(state, timeline, offset) {
	let teamOffset = 0
	if (offset > 0){
		teamOffset = 0.1
	}else {
		teamOffset = 0.5
	}

	if (state) {
		timeline.add(gsap.to('#vsIcon', {
			duration: 0.5,
			opacity: 1,
		}), `-=${offset}`)

		timeline.add(gsap.to('#teamBoxA', {
			duration: 0.5,
			opacity: 1,
		}), `-=${offset+0.4}`)
		timeline.add(gsap.to('#teamBoxB', {
			duration: 0.5,
			opacity: 1,
		}), `-=${offset+0.5}`)

		timeline.add(gsap.to('#teamANames', {
			duration: 0.5,
			x: 0,
			ease: 'power2.out'
		}), `-=${offset + 0.1}`)
		timeline.add(gsap.to('#teamBNames', {
			duration: 0.5,
			x: 0,
			ease: 'power2.out'
		}), `-=${offset + teamOffset}`)

	} else {
		timeline.add(gsap.to('#vsIcon', {
			duration: 0.5,
			opacity: 0,
		}))

		timeline.add(gsap.to('#teamANames', {
			duration: 0.5,
			x: -400,
			ease: 'power2.in'
		}))
		timeline.add(gsap.to('#teamBNames', {
			duration: 0.5,
			x: -400,
			ease: 'power2.in'
		}), '-=0.5')

		timeline.add(gsap.to('#teamBoxA', {
			duration: 0.5,
			opacity: 0,
		}), '-=0.3')
		timeline.add(gsap.to('#teamBoxB', {
			duration: 0.5,
			opacity: 0,
		}), '-=0.5')
	}
}

function createNextTeamPlayerElem(name, align, team, index) {
	const textElem = document.createElement('fitted-text');
	textElem.setAttribute('text', name);
	textElem.setAttribute('max-width', '400');
	textElem.setAttribute('align', align);
	textElem.setAttribute('class', 'teamMemberText');
	textElem.setAttribute('id', `teamPlayer-${team}-${index}`);
	return textElem;
}

NodeCG.waitForReplicants(nextTeams, teamImageHidden).then(() => {
	teamImageHidden.on('change', newValue => {
		let opacityA = (newValue.teamA && nextTeams.value.teamAInfo.logoUrl) ? 1 : 0;
		let opacityB = (newValue.teamB && nextTeams.value.teamBInfo.logoUrl) ? 1 : 0;

		gsap.to('#teamAIcon', {duration: 0.5, opacity: opacityA});
		gsap.to('#teamABackground', {duration: 0.5, opacity: opacityA});
		gsap.to('#teamBIcon', {duration: 0.5, opacity: opacityB});
		gsap.to('#teamBBackground', {duration: 0.5, opacity: opacityB});
	});

	nextTeams.on('change', newValue => {
		nextTeamAName.setAttribute('text', newValue.teamAInfo.name);
		nextTeamBName.setAttribute('text', newValue.teamBInfo.name);


		let opacityA = (newValue.teamAInfo.logoUrl && teamImageHidden.value.teamA) ? 1 : 0;
		let opacityB = (newValue.teamBInfo.logoUrl && teamImageHidden.value.teamB) ? 1 : 0;


		gsap.to('#teamABackground', {opacity: opacityA});
		teamAIcon.src = `${newValue.teamAInfo.logoUrl}`
		gsap.to('#teamAIcon', {opacity: opacityA});

		gsap.to('#teamBBackground', {opacity: opacityB});
		teamBIcon.src = `${newValue.teamBInfo.logoUrl}`
		gsap.to('#teamBIcon', {opacity: opacityB});

		teamANames.innerHTML = '';
		teamBNames.innerHTML = '';

		for (let x in newValue.teamAInfo.players) {
			const elem = createNextTeamPlayerElem(newValue.teamAInfo.players[x].name, 'left', 'a', x);
			teamANames.appendChild(elem);
		}

		for (let x in newValue.teamBInfo.players) {
			const elem = createNextTeamPlayerElem(newValue.teamBInfo.players[x].name, 'left', 'b', x);
			teamBNames.appendChild(elem);
		}
	});

})
