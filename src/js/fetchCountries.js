export function fetchCountries(name) {
  return fetch(
    `https://restcountries.eu/rest/v2/name/${name}?fields=name;capital;population;flag;languages`,
  ).then(response => {
    return response.json();
  });
}
