let visits;
let endpointnamespace = "sint-raphael.github.io";
let endpointkey = "Winterwandeling22";


function liveViews(response) {
    console.log("This page got " + response.value + " views");
};
// The function is called in the CDN on HTML.


const getData = (json) => {
	console.log(json);
	console.log("This page got " + json.value + " views")
    visits.innerText = json.value;
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