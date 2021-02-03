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
	} else {
		timeline.add(gsap.to('#mainScene', {
			duration: 0.5,
			opacity: 0,
		}))
	}
}
