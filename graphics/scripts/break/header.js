/**
 * Change the viewable state of the header pill
 * @param {boolean} state - to show or not
 * @param {any} timeline
 */
function headerAnimation(state, timeline) {
	if (state) {
		timeline.add(gsap.to('#header', {
			width: '1890px',
			duration: 0.6,
			ease: 'power2.out',
			padding: "0px"
		}))
		timeline.add(gsap.to('#pillLogo', {
			duration: 0.4,
			ease: 'power2.out',
			y: 0
		}))
		timeline.add(
			gsap.from('#pillLogo',
				{
					duration: 1.5,
					rotation: 30,
					transformOrigin: "center 31%",
					ease: 'elastic.out(2.5, 0.2)',
				}
			), "-=0.15"
		)
		timeline.add(gsap.to('#pillFlavourText', {
			duration: 0.4,
			opacity: 1,
		}), '-=2.2')
	} else {
		timeline.add(gsap.to('#pillLogo', {
			duration: 0.4,
			ease: 'power2.in',
			y: -150
		}))
		timeline.add(gsap.to('#pillFlavourText', {
			duration: 0.4,
			opacity: 0,
		}), '-=0.4')
		timeline.add(gsap.to('#header', {
			width: '0%',
			duration: 0.6,
			ease: 'power2.in',
			padding: "0px"
		}))
		// Resets pin to 0 rotation so it doesn't freak out next time shown
		timeline.add(gsap.to('#pillLogo', {
			rotation: -0
		}))
	}
}
