const SUEPILL = nodecg.Replicant('suePill')

/***
 * Update fitter-text elements, by Inkfarer
 * @param {String} textElemID
 * @param {String} newText
 * @param {any} tl
 * @param {string} oldText
 */
function setMainSceneText(textElemID, newText, tl, oldText = '') {
	let textElem = document.querySelector(`#${textElemID}`);
	if (textElem.getAttribute('text') === newText) return;

	// if (oldText === '') {
	// 	oldText = textElem.getAttribute('text');
	// }

	tl.add(gsap.fromTo(textElem, {clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}, {
		ease: 'power2.inOut', duration: 1, clipPath: 'polygon(0 0, 0% 0, 0% 100%, 0% 100%)', onComplete: function () {
			textElem.setAttribute('text', newText);
			textElem.style.opacity = '0';
			textElem.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
		}
	}));
	tl.add(gsap.to(textElem, {duration: 0.5, opacity: 1, delay: 0.25}));
}


SUEPILL.on('change', newValue => {
	let tHeader = gsap.timeline();
	setMainSceneText('pillFlavourText', newValue.text, tHeader);
})

const currentBreakScene = nodecg.Replicant('currentBreakScene', 'ipl-overlay-controls');

NodeCG.waitForReplicants(currentBreakScene).then(() => {
	currentBreakScene.on('change', (newValue, oldValue) => {
		let changeTimeline = gsap.timeline();
		switch (oldValue) {
			case 'mainScene':
				mainSceneAnimation(false, changeTimeline);
				break;
			case 'nextUp':
				teamSceneAnimation(false, changeTimeline);
				break;
			case 'maps':
				stagesSceneAnimation(false, changeTimeline);
				break;
			default:
				stagesSceneAnimation(false, changeTimeline);
				mainSceneAnimation(false, changeTimeline);
				teamSceneAnimation(false, changeTimeline);
				headerAnimation(false, changeTimeline);
				break;
		}
		switch (newValue) {
			case 'mainScene':
				if (['nextUp', 'maps'].includes(oldValue)) headerAnimation(false, changeTimeline);
				mainSceneAnimation(true, changeTimeline);
				return;
			case 'nextUp':
				if (oldValue === 'mainScene' || oldValue == null) headerAnimation(true, changeTimeline);
				teamSceneAnimation(true, changeTimeline);
				return;
			case 'maps':
				if (oldValue === 'mainScene' || oldValue == null) headerAnimation(true, changeTimeline);
				stagesSceneAnimation(true, changeTimeline);
				return;
			default:
				mainSceneAnimation(true, changeTimeline);
				return;
		}
	});
});