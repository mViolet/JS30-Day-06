//I coded along with Wes for this one, so most of this solution is taken directly from the tutorial.

//Note to self: Need to practice using the methods/tools used here more as I am not too well-versed in JS at the moment... i.e.
// RegExp() / regex
// fetch()
// match()
// replace()
// spread in ES6
// methods for array like map() join() filter()
// the blob in .json


const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
	.then(blob => blob.json())
	.then(data => cities.push(...data));

function findMatches(wordToMatch, cities) {
	return cities.filter(place => {
		//here figure out if city/state matches what was searched

		const regex = new RegExp(wordToMatch, 'gi');
		return place.city.match(regex) || place.state.match(regex);
	});
}

/* http://stackoverflow.com/a/2901298 */
function numberWithCommas(x) {
  var parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

function displayMatches() {
	//gets input value
	const matchArray = findMatches(this.value, cities);
	// console.log(matchArray); // displays matches
	const html = matchArray.map(place => {
		const regex = new RegExp(this.value, 'gi');
		const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
		const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
		return `
		<li>
			<span class="name">${cityName}, ${stateName}</span>
			<span class="population">${numberWithCommas(place.population)}</span>
		</li>
		`;
	}).join(''); //to change returned array to string
	suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('input', displayMatches);