const SUEPILL = nodecg.Replicant('suePill')
const nextTeams = nodecg.Replicant('nextTeams', 'ipl-overlay-controls');

SUEPILL.on('change', newValue => {
	FlavourInput.value = newValue.text;
})

updateHeaderText.onclick = () => {
	SUEPILL.value.text = FlavourInput.value
}

teamVSTeam.onclick = () => {
	FlavourInput.value = `${nextTeams.value.teamAInfo.name} VS ${nextTeams.value.teamBInfo.name}`
}