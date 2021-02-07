function footerAnimation(state, timeline) {
	if (state) {

		timeline.add(gsap.to('#footerCommsBox', {
				width: '800px',
				duration: 0.6
			}), '-=0'
		)
	} else {
		timeline.add(gsap.to('#footerCommsBox', {
				width: '0%',
				duration: 0.6
			}), '-=0'
		)
	}
}

const casterNamesFooterTL = gsap.timeline();

casterNames.on('change', newValue => {
	let finalElem = newValue.replace(/\[\[/g, '<span class="footerPronouns">').replace(/\]\]/g, '</span>');
	setMainSceneText('footerComms', finalElem, casterNamesFooterTL);
});
