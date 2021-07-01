const CLIP_PATH_INITIAL = 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)';
const CLIP_PATH_VISIBLE = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
const CLIP_PATH_HIDE = 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)';

scoreboardData.on('change', newValue => {
	document.querySelector('#teamAName').setAttribute('text', newValue.teamAInfo.name);
	document.querySelector('#teamBName').setAttribute('text', newValue.teamBInfo.name);

	gsap.to('#teamAColor', {duration: 0.5, backgroundColor: (newValue.swapColorOrder) ? newValue.colorInfo.clrB : newValue.colorInfo.clrA});
	gsap.to('#teamBColor', {duration: 0.5, backgroundColor: (newValue.swapColorOrder) ? newValue.colorInfo.clrA : newValue.colorInfo.clrB});

	document.querySelector('.sbFlavorText fitted-text').setAttribute('text', newValue.flavorText);
});

teamScores.on('change', newValue => {
	document.querySelector('#teamAScore').setAttribute('text', newValue.teamA);
	document.querySelector('#teamBScore').setAttribute('text', newValue.teamB);
});

scoreboardShown.on('change', newValue => {
	const clipFrom = newValue ? CLIP_PATH_INITIAL : CLIP_PATH_VISIBLE;
	const clipTo = newValue ? CLIP_PATH_VISIBLE : CLIP_PATH_HIDE;
	const ease = newValue ? 'power2.out' : 'power2.in';

	gsap.fromTo('.sbTeamsWrapper', {clipPath: clipFrom}, {duration: 0.5, ease: ease, clipPath: clipTo});
	gsap.fromTo('.sbFlavorText', {clipPath: clipFrom}, {duration: 0.5, ease: ease, clipPath: clipTo, delay: 0.1});
});
