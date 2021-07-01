/**
 * Change the viewable state of the header pill
 * Scene Time : 2.25 | 1
 * @param {boolean} state - to show or not
 * @param {any} timeline
 */
function headerAnimation(state, timeline) {
	if (state) {
		timeline.add(gsap.to('#header', {
			width: '1890px',
			duration: 0.5,
			ease: 'power2.out',
			padding: "0px"
		}))
		timeline.add(gsap.to('#pillLogo', {
			duration: 0.4,
			ease: 'power2.out',
			y: 0
		}))
		timeline.add(
			gsap.from('#pillLogo',
				{
					duration: 1.5,
					rotation: 30,
					transformOrigin: "center 31%",
					ease: 'elastic.out(2.5, 0.2)',
				}
			), "-=0.15"
		)
		timeline.add(gsap.to('#pillFlavourText', {
			duration: 0.4,
			opacity: 1,
		}), '-=1.35')
	} else {
		timeline.add(gsap.to('#pillLogo', {
			duration: 0.4,
			ease: 'power2.in',
			y: -170
		}))
		timeline.add(gsap.to('#pillFlavourText', {
			duration: 0.4,
			opacity: 0,
		}), '-=0.4')
		timeline.add(gsap.to('#header', {
			width: '0%',
			duration: 0.6,
			ease: 'power2.in',
			padding: "0px"
		}))
		// Resets pin to 0 rotation so it doesn't freak out next time shown
		timeline.add(gsap.to('#pillLogo', {
			rotation: -0
		}))
	}
}

NodeCG.waitForReplicants(activeBreakScene, nextTeams).then(() => {
	activeBreakScene.on('change', (newValue, oldValue) => {
		let tHeader = gsap.timeline();
		switch (newValue) {
			case 'teams':
				setMainSceneText('pillFlavourText', mainFlavorText.value, tHeader, 2);
				break;
			case 'stages':
				const newText = `${nextTeams.value.teamAInfo.name} VS ${nextTeams.value.teamBInfo.name}`
				setMainSceneText('pillFlavourText', newText, tHeader, 2);
				break;
		}
	});
});
