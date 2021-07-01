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

casters.on('change', newValue => {
	let elemHtml = '';

	Object.keys(newValue).forEach((item, index, arr) => {
		const element = newValue[item];  // Get caster from object
		// Build new object and append to list
		elemHtml += `
			${element.name} <span class="footerPronouns">${element.pronouns}</span>
		`;
	});

	setMainSceneText('footerComms', elemHtml, casterNamesFooterTL);
});
