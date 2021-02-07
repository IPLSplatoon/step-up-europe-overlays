/**
 * Change the view-ability of the footer
 * Scene Time : 0.6
 * @param {boolean} state - to show or not
 * @param {any} timeline
 * @param {number} offset
 */
function footerAnimation(state, timeline, offset) {
	if (state) {

		timeline.add(gsap.to('#footerCommsBox', {
				width: '800px',
				duration: 0.6
			}), `-=${offset}`
		)
	} else {
		timeline.add(gsap.to('#footerCommsBox', {
				width: '0%',
				duration: 0.6
			}), `-=${offset}`
		)
	}
}

const casterNamesFooterTL = gsap.timeline();

casterNames.on('change', newValue => {
	let finalElem = newValue.replace(/\[\[/g, '<span class="footerPronouns">').replace(/\]\]/g, '</span>');
	setMainSceneText('footerComms', finalElem, casterNamesFooterTL);
});
