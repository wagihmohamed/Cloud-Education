import { Country } from 'country-state-city';

export const countriesOptions = Country.getAllCountries().map((country) => ({
	value: country.name,
	label: country.name,
	cc: country.isoCode,
}));
