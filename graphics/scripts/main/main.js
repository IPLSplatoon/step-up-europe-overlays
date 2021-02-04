const DASHBOARD_BUNDLE_NAME = 'ipl-overlay-controls';
const CLIP_PATH_INITIAL = 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)';
const CLIP_PATH_VISIBLE = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
const CLIP_PATH_HIDE = 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)';

const SBData = nodecg.Replicant('SBData', DASHBOARD_BUNDLE_NAME);

SBData.on('change', newValue => {
	document.querySelector('#teamAName').setAttribute('text', newValue.teamAInfo.name);
	document.querySelector('#teamBName').setAttribute('text', newValue.teamBInfo.name);

	gsap.to('#teamAColor', {duration: 0.5, backgroundColor: (newValue.swapColorOrder) ? newValue.colorInfo.clrB : newValue.colorInfo.clrA});
	gsap.to('#teamBColor', {duration: 0.5, backgroundColor: (newValue.swapColorOrder) ? newValue.colorInfo.clrA : newValue.colorInfo.clrB});

	document.querySelector('.sbFlavorText fitted-text').setAttribute('text', newValue.flavorText);
});

const teamScores = nodecg.Replicant('teamScores', DASHBOARD_BUNDLE_NAME);

teamScores.on('change', newValue => {
	document.querySelector('#teamAScore').setAttribute('text', newValue.teamA);
	document.querySelector('#teamBScore').setAttribute('text', newValue.teamB);
});

const casterNames = nodecg.Replicant('casterNames', DASHBOARD_BUNDLE_NAME);

casterNames.on('change', newValue => {
	let nameArray = newValue.split('&');
	let bg = document.querySelector('.sbCastersContainer');
	bg.innerHTML = '';

	nameArray.forEach(name => {
		var elem = document.createElement('fitted-text');
		var htmlText = name.replace(/\[\[/g, '<span class="pronoun">').replace(/\]\]/g, '</span>');
		elem.setAttribute('text', htmlText);
		elem.setAttribute('max-width', '230');
		elem.setAttribute('align', 'left');
		elem.setAttribute('useInnerHTML', '');
		
		bg.appendChild(elem);
	});
});

nodecg.listenFor('mainShowCasters', DASHBOARD_BUNDLE_NAME, () => {
	gsap.fromTo('.sbCasters', {clipPath: CLIP_PATH_INITIAL}, {duration: 0.5, clipPath: CLIP_PATH_VISIBLE, ease: 'power2.out'});
	gsap.to('.sbCasters', {duration: 0.5, clipPath: CLIP_PATH_HIDE, delay: 14.5, ease: 'power2.in'});
});

const SBShown = nodecg.Replicant('SBShown', DASHBOARD_BUNDLE_NAME);

SBShown.on('change', newValue => {
	const clipFrom = newValue ? CLIP_PATH_INITIAL : CLIP_PATH_VISIBLE;
	const clipTo = newValue ? CLIP_PATH_VISIBLE : CLIP_PATH_HIDE;
	const ease = newValue ? 'power2.out' : 'power2.in';

	gsap.fromTo('.sbTeamsWrapper', {clipPath: clipFrom}, {duration: 0.5, ease: ease, clipPath: clipTo});
	gsap.fromTo('.sbFlavorText', {clipPath: clipFrom}, {duration: 0.5, ease: ease, clipPath: clipTo, delay: 0.1});
});
