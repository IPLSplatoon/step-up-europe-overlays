// Lottie Animation
const landmarksAnim = lottie.loadAnimation({
	container: document.getElementById('landMarks'),
	renderer: 'svg',
	loop: true,
	autoplay: true,
	path: './assets/lottie/SUE-Landmarks_Loading.json'
});

const landmarksUpsideDownAnim = lottie.loadAnimation({
	container: document.getElementById('landMarksUpsideDown'),
	renderer: 'svg',
	loop: true,
	autoplay: true,
	path: './assets/lottie/SUE_Eye_Loading_Upside-Down-Tower.json'
});

function hideLandmarks(){
	gsap.to('#landMarksUpsideDown', {
		ease: 'power2.out',
		y: 405
	})
}

let currentLandmark = "landMarks";

/**
 * Change the view-ability of the main break Scene
 * @param {boolean} state - to show or not
 * @param {any} timeline
 */
function mainSceneAnimation(state, timeline) {
	if (state) {
		// Easter Egg to make some landmarks upside down
		// if ((Math.floor((Math.random() * 100) + 1)) < 75){
		// 	currentLandmark = "landMarks"
		// }else{
		// 	currentLandmark = "landMarksUpsideDown"
		// }
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
		timeline.add(gsap.to(`#${currentLandmark}`, {
			duration: 0.6,
			ease: 'power2.out',
			y: 0
		}), '-=1.5')  // set to -=2.5 for 360 spin
		if(currentLandmark === "landMarks"){
			console.log("call 1")
			timeline.call(landmarksAnim.play)
		}else{
			console.log("call 2")
			timeline.call(landmarksUpsideDownAnim.play)
		}
	} else {
		if(currentLandmark === "landMarks"){
			timeline.call(landmarksAnim.pause)
		}else{
			timeline.call(landmarksUpsideDownAnim.pause)
		}
		timeline.add(gsap.to(`#${currentLandmark}`, {
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

const mainTextTL = gsap.timeline();

mainFlavorText.on('change', newValue => {
	setMainSceneText('breakFlavorText', newValue, mainTextTL);
});


const casterNamesTL = gsap.timeline();

casters.on('change', newValue => {
	let finalElem = '';

	Object.keys(newValue).forEach((item, index, arr) => {
		const element = newValue[item];  // Get caster from object
		// Add , and & to separate comms
		if (index > 0 && index < (arr.length-1)){ finalElem += ` , ` }
		else if(index > 0){ finalElem += ` & ` }
		// Build new object and append to list
		finalElem += `
			${element.name} <span class="pronoun">${element.pronouns}</span>
		`;
	});

	setMainSceneText('breakCastersText', finalElem, casterNamesTL);
});
