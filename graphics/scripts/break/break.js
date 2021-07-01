NodeCG.waitForReplicants(activeBreakScene).then(() => {
	activeBreakScene.on('change', (newValue, oldValue) => {
		let changeTimeline = gsap.timeline();
		let offsetTime = 0;
		switch (oldValue) {
			case 'main':
				mainSceneAnimation(false, changeTimeline);
				break;
			case 'teams':
				teamSceneAnimation(false, changeTimeline, 0);
				break;
			case 'stages':
				stagesSceneAnimation(false, changeTimeline, 0);
				break;
			default:
				hideLandmarks();
				mainSceneAnimation(false, changeTimeline);
				teamSceneAnimation(false, changeTimeline, 0);
				headerAnimation(false, changeTimeline);
				stagesSceneAnimation(false, changeTimeline, 0);
				footerAnimation(false, changeTimeline, 0);
				break;
		}
		switch (newValue) {
			case 'main':
				if (['teams', 'stages'].includes(oldValue)) {
					headerAnimation(false, changeTimeline);
					footerAnimation(false, changeTimeline, 1);
				}
				mainSceneAnimation(true, changeTimeline);
				return;
			case 'teams':
				offsetTime = 0;
				if (oldValue === 'main' || oldValue == null) {
					headerAnimation(true, changeTimeline);
					footerAnimation(true, changeTimeline, 2.25);
					offsetTime = 2;
				}
				teamSceneAnimation(true, changeTimeline, offsetTime);
				return;
			case 'stages':
				offsetTime = 0;
				if (oldValue === 'main' || oldValue == null) {
					headerAnimation(true, changeTimeline);
					footerAnimation(true, changeTimeline, 2.25);
					offsetTime = 3;
				}
				stagesSceneAnimation(true, changeTimeline, offsetTime);
				return;
			default:
				mainSceneAnimation(true, changeTimeline);
				return;
		}
	});
});
