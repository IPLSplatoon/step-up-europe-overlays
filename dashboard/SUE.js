const SUEPILL = nodecg.Replicant('suePill')

SUEPILL.on('change', newValue => {
	FlavourInput.value = newValue.text;
	disableBarButtons(newValue.show)

})

hidePill.onclick = () => {SUEPILL.value.show = false;}
showPill.onclick = () => {SUEPILL.value.show = true;}

function disableBarButtons(currentBar) {
	const elements = ["hidePill", "showPill"];
	elements.forEach(element => { document.getElementById(element).disabled = false; });
	if (currentBar === true){
		showPill.disabled = true;
	} else{
		hidePill.disabled = true;
	}
}
