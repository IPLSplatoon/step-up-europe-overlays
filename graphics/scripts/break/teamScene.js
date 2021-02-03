/**
 * Change the view-ability of the team break Scene
 * @param {boolean} state - to show or not
 * @param {any} timeline
 */
function teamSceneAnimation(state, timeline){
	if (state) {
		timeline.add(gsap.to('#teamScene', {
			duration: 0.5,
			opacity: 1,
		}))
	} else {
		timeline.add(gsap.to('#teamScene', {
			duration: 0.5,
			opacity: 0,
		}))
	}
}
