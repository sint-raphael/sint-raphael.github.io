let visits;
let entireVisitPlaceholder;
let endpointnamespace = "sint-raphael.github.io";
let endpointkey = "Winterwandeling22";


function liveViews(response) {
    console.log("This page got " + response.value + " views");
};
// The function is called in the CDN on HTML.


const getData = (json) => {
	console.log(json);

	if(json.value != null){
		console.log("This page got " + json.value + " views")
		visits.innerText = json.value;
	}
	else{
		console.log("The key used to check the amount of visits is either non existend or expired.")
		if(entireVisitPlaceholder != null){
			entireVisitPlaceholder.innerText = "Op dit moment kunnen we het aantal bezoeken niet weergeven. Probeer het later opnieuw.";
		}
	}
};


function showVisits() {
    let endpoint = `https://api.countapi.xyz/info/${endpointnamespace}/${endpointkey}`;

		fetch(endpoint)
			.then((r) => r.json())
			.then((json) => {
				getData(json);
			})
			.catch((e) => console.error(e));
};


const init = () => {
	visits = document.getElementById('visits');
	entireVisitPlaceholder = document.getElementById('entireVisitPlaceholder');
	if(visits != null){
		showVisits();
		
		setInterval(() => {
			showVisits();
		}, 10000);
	}
};


document.addEventListener('DOMContentLoaded', function () {
    // console.log("DOM content Loaded");
	init();
});