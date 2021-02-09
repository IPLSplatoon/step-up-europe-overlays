// Lottie Animation
const landmarksAnim = lottie.loadAnimation({
	container: document.getElementById('landMarks'),
	renderer: 'svg',
	loop: true,
	autoplay: true,
	path: './assets/lottie/SUE-Landmarks_Loading.json'
});

/**
 * Change the view-ability of the main break Scene
 * @param {boolean} state - to show or not
 * @param {any} timeline
 */
function mainSceneAnimation(state, timeline) {
	if (state) {
		timeline.add(gsap.to('#mainScene', {
			duration: 0.5,
			opacity: 1,
		}))
		timeline.add(gsap.to('#mainPill', {
			left: '290px',
			width: '1340px',
			duration: 0.5,
			ease: 'power2.out'
		}))
		timeline.add(gsap.to('#breakFlavorText', {
			duration: 0.2,
			opacity: 1,
		}))
		timeline.add(gsap.to('#flavourPin', {
			duration: 0.3,
			y: 0
		}), '-=0.3')
		timeline.add(
			gsap.from('#flavourPin',
				{
					duration: 1.5,
					rotation: 30,
					transformOrigin: "center 31%",
					ease: 'elastic.out(2.5, 0.2)',
				}
			), "-=0.1"
		)
		// timeline.add(gsap.to('#flavourPin',
		// 	{
		// 		duration: 3.5,
		// 		rotation: 360,
		// 		transformOrigin: "center 31%",
		// 		ease: 'elastic.out(1.5, 0.5)',
		// 	},
		// 	),'-=0.8'
		// )
		timeline.add(gsap.to('#landMarks', {
			duration: 0.6,
			ease: 'power1.out',
			y: 0
		}), '-=1.5')  // set to -=2.5 for 360 spin
		timeline.call(landmarksAnim.play)
	} else {
		timeline.call(landmarksAnim.pause)
		timeline.add(gsap.to('#landMarks', {
			duration: 0.6,
			ease: 'power2.in',
			y: 405
		}))
		timeline.add(gsap.to('#breakFlavorText', {
			duration: 0.4,
			opacity: 0,
		}), '-=0.4')
		timeline.add(gsap.to('#flavourPin', {
			duration: 0.4,
			y: -600
		}), '-=0.4')
		timeline.add(gsap.to('#mainPill', {
			width: '0',
			duration: 0.5,
			ease: 'power2.in',
			left: '960px'
		}))
		timeline.add(gsap.to('#mainScene', {
			duration: 0.5,
			opacity: 0
		}))
		// Resets pin to 0 rotation so it doesn't freak out next time shown
		timeline.add(gsap.to('#flavourPin', {
			rotation: -0
		}))
	}
}
// Main Scene Fields

const mainFlavorText = nodecg.Replicant('mainFlavorText', 'ipl-overlay-controls', {defaultValue: 'Be right back!'});
const mainTextTL = gsap.timeline();

mainFlavorText.on('change', newValue => {
	setMainSceneText('breakFlavorText', newValue, mainTextTL);
});


const casterNames = nodecg.Replicant('casterNames', 'ipl-overlay-controls', {defaultValue: "We don't know."});
const casterNamesTL = gsap.timeline();

casterNames.on('change', newValue => {
	let finalElem = newValue.replace(/\[\[/g, '<span class="pronoun">').replace(/\]\]/g, '</span>');
	setMainSceneText('breakCastersText', finalElem, casterNamesTL);
});

// Music Text

const nowPlaying = nodecg.Replicant('nowPlaying', 'ipl-overlay-controls');
const nowPlayingManual = nodecg.Replicant('nowPlayingManual', 'ipl-overlay-controls', {
	defaultValue: {
		artist: '',
		song: ''
	}
});
const mSongEnabled = nodecg.Replicant('mSongEnabled', 'ipl-overlay-controls', {defaultValue: false});
const musicTL = gsap.timeline();

function checkStringEmptyOrUndef(string) {
	string = String(string);
	return (string === 'undefined' || string === '');
}

function getSongNameString(rep) {
	if (checkStringEmptyOrUndef(rep.artist) && checkStringEmptyOrUndef(rep.song)) {
		return 'No song is playing.'
	}

	if (checkStringEmptyOrUndef(rep.artist)) {
		return rep.song;
	} else if (checkStringEmptyOrUndef(rep.song)) {
		return rep.artist;
	}

	return rep.artist + ' - ' + rep.song;
}

NodeCG.waitForReplicants(nowPlaying, nowPlayingManual, mSongEnabled).then(() => {
	nowPlaying.on('change', newValue => {
		if (!mSongEnabled.value) {
			setMainSceneText('breakMusicText', getSongNameString(newValue), musicTL);
		}
	});
	mSongEnabled.on('change', newValue => {
		var value;

		if (newValue) {
			value = nowPlayingManual.value;
		} else {
			value = nowPlaying.value;
		}

		setMainSceneText('breakMusicText', getSongNameString(value), musicTL);
	});
	nowPlayingManual.on('change', newValue => {
		if (mSongEnabled.value) {
			setMainSceneText('breakMusicText', getSongNameString(newValue), musicTL);
		}
	});
});

NodeCG.waitForReplicants(nowPlaying, nowPlayingManual, mSongEnabled).then(() => {
	nowPlaying.on('change', newValue => {
		if (!mSongEnabled.value) {

		}
	});
	mSongEnabled.on('change', newValue => {
		var value;

		if (newValue) {
			value = nowPlayingManual.value;
		} else {
			value = nowPlaying.value;
		}


	});
	nowPlayingManual.on('change', newValue => {
		if (mSongEnabled.value) {

		}
	});
});
