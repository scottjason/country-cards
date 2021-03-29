import React from 'react';
import Card from '../Card/Card';
import './Cards.css';

const Cards = props => {
  const { view, countries, countriesFiltered, onToggleCountry } = props;
  const renderedCountries =
    countriesFiltered.length > 0 ? countriesFiltered : countries;
  return (
    <div className='cards-container'>
      {renderedCountries.map(country => {
        return (
          <Card
            view={view}
            country={country}
            key={country.alpha2Code}
            onToggleCountry={onToggleCountry}
          />
        );
      })}
    </div>
  );
};

export default Cards;
