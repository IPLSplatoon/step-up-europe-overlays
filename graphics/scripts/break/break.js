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

	if (oldText === '') {
		oldText = textElem.getAttribute('text');
	}

	tl.add(gsap.fromTo(textElem, {clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}, {
		ease: 'power2.inOut', duration: 1, clipPath: 'polygon(0 0, 0% 0, 0% 100%, 0% 100%)', onComplete: function () {
			textElem.setAttribute('text', newText);
			textElem.style.opacity = '0';
			textElem.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
		}
	}));
	tl.add(gsap.to(textElem, {duration: 0.5, opacity: 1, delay: 0.25}));
}
