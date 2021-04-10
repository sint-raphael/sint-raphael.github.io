const PUBLIC_KEY2 = 'd43ff96121df0d5935afa22e9c8f51bb';
const PUBLIC_MIXKEY = '';
const PRIV_KEY = '45d66de33de2eb1f17caf74bb1658c215d734dfb';



const superHeroName1 = ["Spider-Man", "Captain America", "Black Widow", "Iron Man", "Thor", "Captain Marvel", "Hulk", "Hawkeye", "Ant-Man", "Falcon", "Winter Soldier", "War Machine", "Vision", "Scarlet Witch", "Doctor Strange", "Black Panther", "Thanos", "Star Lord", "Gamora", "Groot"];
const superHeroId1   = ["1009610", "1009220", "1009189", "1009368", "1009664", "1010338", "1009351", "1009338", "1010802", "1009297", "1010740", "1017322", "1009697", "1009562", "1009282", "1009187", "1009652", "1010733", "1010763", "1010743"];	
let superHeroComics   = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// 3 Met de data van de API kunnen we de app opvullen
let showResult = queryResponse => {
	//console.log('ShowResult');
	
};

// A Function that goes through the picked characters and makes everytime a new url to get the data
function findMentionsForCharacter() {

	console.log('');
}

let getData1 = async (subjectUrl, parameterList = null) => {

	console.log('in getData');

	var ts = new Date().getTime();
	var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
	

	
	// opbouwen van de url
	ENDPOINT = `https://gateway.marvel.com/v1/public/`;
	// ENDPOINT = `https://gateway.marvel.com/v1/public/characters`;
	// ENDPOINT = 'https://gateway.marvel.com/v1/public/events';
	// ENDPOINT = ENDPOINT + `?apikey=` + PUBLIC_KEY + `&ts=` + ts + `&hash=` + hash;


	ENDPOINT = ENDPOINT + subjectUrl +`?apikey=` + PUBLIC_KEY ;

	if (parameterList != null){
		for ( i=0; i < parameterList.length; i++){
			ENDPOINT = ENDPOINT + '&' + parameterList[i];
		}
	}


	// Met de fetch API proberen we de data op te halen.
	const request = await fetch(`${ENDPOINT}`);
	const data = await request.json();
	console.log(data);

	showResult(data);
	return data;
};

function test () {
	for( i= 0 ; i< superHeroId.length; i++){
		console.log('here');
	}
}

document.addEventListener('DOMContentLoaded', function() {
	// 1 We will query the API with longitude and latitude.
	console.log('Dom Loaded');
	findMentionsForCharacter();
	test();
});
