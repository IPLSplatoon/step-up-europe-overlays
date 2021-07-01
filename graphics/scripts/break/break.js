/***
 * Update fitter-text elements, by Inkfarer
 * @param {String} textElemID
 * @param {String} newText
 * @param {any} tl
 * @param {string} oldText
 * @param {number} delay
 */
function setMainSceneText(textElemID, newText, tl, delay = 0, oldText = '') {
	let textElem = document.querySelector(`#${textElemID}`);
	if (textElem.getAttribute('text') === newText) return;

	tl.add(gsap.fromTo(textElem, {clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}, {
		ease: 'power2.inOut', duration: 1, clipPath: 'polygon(0 0, 0% 0, 0% 100%, 0% 100%)', onComplete: function () {
			textElem.setAttribute('text', newText);
			textElem.style.opacity = '0';
			textElem.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
		}
	}));
	const delay_internal = 0.25 + delay
	tl.add(gsap.to(textElem, {duration: 0.5, opacity: 1, delay: delay_internal}));
}

NodeCG.waitForReplicants(activeBreakScene).then(() => {
	activeBreakScene.on('change', (newValue, oldValue) => {
		let changeTimeline = gsap.timeline();
		let offsetTime = 0;
		switch (oldValue) {
			case 'main':
				mainSceneAnimation(false, changeTimeline);
				break;
			case 'teams':
				teamSceneAnimation(false, changeTimeline, 0);
				break;
			case 'stages':
				stagesSceneAnimation(false, changeTimeline, 0);
				break;
			default:
				hideLandmarks();
				mainSceneAnimation(false, changeTimeline);
				teamSceneAnimation(false, changeTimeline, 0);
				headerAnimation(false, changeTimeline);
				stagesSceneAnimation(false, changeTimeline, 0);
				footerAnimation(false, changeTimeline, 0);
				break;
		}
		switch (newValue) {
			case 'main':
				if (['teams', 'stages'].includes(oldValue)) {
					headerAnimation(false, changeTimeline);
					footerAnimation(false, changeTimeline, 1);
				}
				mainSceneAnimation(true, changeTimeline);
				return;
			case 'teams':
				offsetTime = 0;
				if (oldValue === 'main' || oldValue == null) {
					headerAnimation(true, changeTimeline);
					footerAnimation(true, changeTimeline, 2.25);
					offsetTime = 2;
				}
				teamSceneAnimation(true, changeTimeline, offsetTime);
				return;
			case 'stages':
				offsetTime = 0;
				if (oldValue === 'main' || oldValue == null) {
					headerAnimation(true, changeTimeline);
					footerAnimation(true, changeTimeline, 2.25);
					offsetTime = 3;
				}
				stagesSceneAnimation(true, changeTimeline, offsetTime);
				return;
			default:
				mainSceneAnimation(true, changeTimeline);
				return;
		}
	});
});
