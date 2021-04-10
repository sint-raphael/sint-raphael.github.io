let characterSelect, graph, canvas, loaderContainer, loaderDelay, loader,
characterName, characterSummary, cardHide, characterCheckbox, photoSrcSet, photo;

const PUBLIC_KEY = 'd43ff96121df0d5935afa22e9c8f51bb';
const superHeroName = ["spider-man", "captain america", "black widow", "iron man", "thor", "captain marvel", "hulk", "hawkeye", "ant-man", "falcon", "winter soldier", "war machine", "vision", "scarlet witch", "doctor strange", "black panther", "thanos", "star lord", "gamora", "groot"];
const superHeroId   = ["1009610", "1009220", "1009189", "1009368", "1009664", "1010338", "1009351", "1009338", "1010802", "1009297", "1010740", "1017322", "1009697", "1009562", "1009282", "1009187", "1009652", "1010733", "1010763", "1010743"];	

let varLegendOn = true;

const hideLoader = function () {
	clearTimeout(loaderDelay);

	loaderContainer.style.display = 'none';
	canvas.style.display = 'block';
	loader.style.opacity = 0;
};

const showLoader = function () {
	loaderContainer.style.display = 'flex';
	canvas.style.display = 'none';

	loaderDelay = setTimeout(() => {
		loader.style.opacity = 1;
	}, 1000);
};

const drawChart = (data) => {
	let biggestNumber = 0;

	for(i = 0 ; i< data.length;i++){
		if (biggestNumber <= data[i]){
			biggestNumber = data[i];
		}
	}
	let border = biggestNumber / 100;
	border = parseInt(border);
	border = border * 100 + 100;


	let ctx = graph.getContext('2d');

	// let chart = new Chart(ctx, {
	new Chart(ctx, {
		type: 'bar',
		data: {
			labels: ['Comics', 'Series', 'Stories', 'Events'],
			datasets: [
				{
					label: 'Available',
					data: data,
					borderColor: '#A3A0FB',
					backgroundColor: '#A3A0FB10',
					pointBackgroundColor: 'white',
					lineTension: 0.3,
					borderWidth: 2,
					pointRadius: 4,
				},
			],
		},
		options: {
			defaultFontColor: (Chart.defaults.global.defaultFontColor = '#808495'),
			defaultFontSize: (Chart.defaults.global.defaultFontSize = 14),
			scales: {
				yAxes: [
					{
						ticks: {
							min: 0,
							max: border,
						},
					},
				],
			},
			tooltips: {
				xPadding: 10,
				yPadding: 10,
				cornerRadius: 0,
			},
			legend: {
				display: varLegendOn,
				position: 'bottom',
				align: 'start',
				labels: {
					defaultFontFamily: (Chart.defaults.global.defaultFontFamily = "'Roboto Condensed','Source Sans Pro', 'Helvetica', 'arial', 'sans-serif'"),
					boxWidth: 2,
				},
			},
			responsive: true,
		},
	});
};

const getData = (json) => {
	let data = [];
	console.log(json);

	json = json.data.results[0];
	
	data.push(json.comics.available);
	data.push(json.series.available);
	data.push(json.stories.available);
	data.push(json.events.available);


	let thumbnailUrl = json.thumbnail.path;
	thumbnailUrl = thumbnailUrl.replace(`http://`, `https://`);
	let thumbnailUrlS = thumbnailUrl + `/standard_xlarge.` + json.thumbnail.extension;
	let thumbnailUrlL = thumbnailUrl + `/portrait_xlarge.` + json.thumbnail.extension;

	photo.src = thumbnailUrlS;
	photoSrcSet.srcset = thumbnailUrlL;


	if(json.name != ""){
		characterName.innerHTML = json.name;
	}
	else{
		characterName.innerHTML = "Niet gekend"
	}

	if(json.description != ""){
		characterSummary.innerHTML = json.description;
	}
	else{
		characterSummary.innerHTML = "We kunnen momenteel geen beschrijving vinden."
	}



	console.log(data)

	// json.map((sort) => {
	// 	data.push(sort.);
	// });

	drawChart(data);
	hideLoader();
};

const getAmountPerSortPerCharacter = (character) => {
	// Enable loader
	showLoader();

	let characterID = 0;
	// console.log('in getAmountPerSortPerCharacter');

	if (superHeroName.indexOf(character) != -1) {
		indexInList = superHeroName.indexOf(character);
		characterID = superHeroId[indexInList];
		// console.log("The character ID is: " + characterID);
	}

	if (characterID != 0){
		let endpoint = `https://gateway.marvel.com/v1/public/characters/${characterID}`;

		endpoint = endpoint + `?apikey=` + PUBLIC_KEY;

		fetch(endpoint)
			.then((r) => r.json())
			.then((json) => {
				getData(json);
			})
			.catch((e) => console.error(e));
	}
	
};

//---------------------------------------------- CHECKBOX --------------------------------------------------
function handleCharacterButton() {
	let myClass = 'c-card--hide';

	cardHide = document.querySelector('.js-card-hide');
	characterCheckbox = document.querySelector( '.js-character-checkbox');

	let reg = new RegExp('(^| )' + myClass + '($| )', 'g');
	characterCheckbox.addEventListener('click', function () {
		if(characterCheckbox.checked){
			//remove class on cardHide
			cardHide.className = cardHide.className.replace(reg, ' ');
		}
		else{
			//add class on cardHide
			if ((' ' + cardHide.className + ' ').indexOf(' ' + myClass + ' ') < 0) {
				cardHide.className += ' ' + myClass;
			}
		}
	})
}

const init = () => {
	characterSelect = document.querySelector('.js-character-select');
	graph = document.querySelector('.js-graph');

	characterSelect.addEventListener('change', function (e) {
		getAmountPerSortPerCharacter(e.target.value);
	});

	canvas = document.querySelector('.js-graph');
	loaderContainer = document.querySelector('.js-load-container');
	loader = document.querySelector('.js-loader');

	characterName = document.querySelector('.js-character-name');
	characterSummary = document.querySelector('.js-character-summary');

	photoSrcSet = document.querySelector('.js-character-photo-srcset');
	photo = document.querySelector('.js-character-photo');
	
	var width = document.documentElement.clientWidth;
	if (width < 768) {
		varLegendOn = false;
	}

	getAmountPerSortPerCharacter('spider-man');
	handleCharacterButton();
};

document.addEventListener('DOMContentLoaded', function () {
	init();
});
