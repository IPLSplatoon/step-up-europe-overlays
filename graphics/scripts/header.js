const SUEPILL = nodecg.Replicant('suePill')

/**
 * Change the viewable state of the header pill
 * @param {boolean} state - to show or not
 * @param {any} timeline
 */
function headerAnimation(state, timeline) {
	if (state) {
		timeline.add(gsap.to('#header', {
			width: '1890px',
			duration: 0.8,
			ease: 'power2.out',
			padding: "0px"
		}))
		timeline.add(gsap.to('#pillLogo', {
			duration: 0.4,
			y: 0
		}))
		timeline.add(gsap.to('#pillFlavourText', {
			duration: 0.4,
			opacity: 1,
		}, '-=0.4'))
	} else {
		timeline.add(gsap.to('#pillLogo', {
			duration: 0.4,
			y: -150
		}))
		timeline.add(gsap.to('#pillFlavourText', {
			duration: 0.4,
			opacity: 0,
		}, '-=0.4'))
		timeline.add(gsap.to('#header', {
			width: '0%',
			duration: 0.8,
			ease: 'power2.in',
			padding: "0px"
		}))
	}
}


