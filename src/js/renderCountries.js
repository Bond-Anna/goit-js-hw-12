import debounce from 'lodash/debounce';

import { fetchCountries } from './fetchCountries';
import countryCardTpl from '../tamplates/countryCard.hbs';

const inputEl = document.querySelector('#search-box');
const countryCardContainer = document.querySelector('.country-info');
const countriesListContainer = document.querySelector('.country-list');

const DEBOUNCE_DELAY = 300;
let name = '';

inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange() {
  name = inputEl.value;
  console.log(name);
  fetchCountries(name)
    .then(renderCountryCard)
    .catch(eror => console.log(eror));
}

console.log(onInputChange());

function renderCountryCard(country) {
  const markup = countryCardTpl(country[0]);
  countryCardContainer.innerHTML = markup;
}
