import debounce from 'lodash/debounce';
import { Notify } from 'notiflix';

import { fetchCountries } from './fetchCountries';
import countriesListTpl from '../tamplates/countriesList.hbs';
import countryCardTpl from '../tamplates/countryCard.hbs';

const inputEl = document.querySelector('#search-box');
const countryCardContainer = document.querySelector('.country-info');
const countriesListContainer = document.querySelector('.country-list');

const DEBOUNCE_DELAY = 300;
let name = '';

inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange() {
  name = inputEl.value;
  if (name === '') {
    countriesListContainer.innerHTML = '';
    countryCardContainer.innerHTML = '';
    return;
  }
  fetchCountries(name)
    .then(countries => {
      if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
      } else if (countries.length >= 2 && countries.length < 10) {
        countryCardContainer.innerHTML = '';
        renderCountriesList(countries);
      } else if (countries.length === 1) {
        countriesListContainer.innerHTML = '';
        renderCountryCard(countries[0]);
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function renderCountriesList(countries) {
  const markup = countriesListTpl(countries);
  countriesListContainer.innerHTML = markup;
}

function renderCountryCard(country) {
  const markup = countryCardTpl(country);
  countryCardContainer.innerHTML = markup;
}
