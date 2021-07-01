casters.on('change', newValue => {
	let bg = document.querySelector('.sbCastersContainer');

	let elemHtml = '';
	Object.keys(newValue).forEach((item, index, arr) => {
		const element = newValue[item];  // Get caster from object
		// Build new object and append to list
		elemHtml += `
			<fitted-text text="${element.name} <span class=&quot;pronoun&quot;>${element.pronouns}</span>" useInnerHTML max-width="230" align="left"></fitted-text>
		`;
	});
	bg.innerHTML = elemHtml;
});

nodecg.listenFor('mainShowCasters', DASHBOARD_BUNDLE_NAME, () => {
	gsap.fromTo('.sbCasters', {clipPath: CLIP_PATH_INITIAL}, {duration: 0.5, clipPath: CLIP_PATH_VISIBLE, ease: 'power2.out'});
	gsap.to('.sbCasters', {duration: 0.5, clipPath: CLIP_PATH_HIDE, delay: 14.5, ease: 'power2.in'});
});
