import React from 'react';
import './Card.css';

const Card = props => {
  const { view, country, onToggleCountry } = props;
  const { isBorder } = country;
  const { isBorderViewActive } = view;
  const containerClass =
    isBorderViewActive && !isBorder ? 'card-container dim' : 'card-container';
  return (
    <div className={containerClass} onClick={() => onToggleCountry(country)}>
      <div className='card-section-top'>
        <p>{country.name}</p>
        <img alt='flag' className='flag' src={country.flag} />
      </div>
      <div className='card-section-bottom'>
        <div className='country-attrs'>
          <p className='atrr-name'>subregion</p>
          <p>{country.subregion}</p>
          <p className='atrr-name'>capital</p>
          <p>{country.capital}</p>
        </div>
        <div className='country-attrs'>
          <p className='atrr-name'>population</p>
          <p>{country.population}</p>
          <p className='atrr-name'>capital</p>
          <p>{country.capital}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
