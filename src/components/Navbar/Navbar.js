import React from 'react';
import './Navbar.css';

const Navbar = props => {
  const {
    view,
    dropdown,
    onSortByName,
    onSortByPopulation,
    onFilterBySubregion,
    onFilterByNumLanguages,
    dropdownSelection,
  } = props;

  const callbackMap = {
    name: onSortByName,
    languages: onFilterByNumLanguages,
    population: onSortByPopulation,
    subregion: onFilterBySubregion,
  };

  const callback = callbackMap[view.name];
  const resetView = { isResetView: true };

  const onSelectFromDropdown = e => {
    const selected = e.target.value;
    callback(selected);
  };

  return (
    <nav>
      <ul className='nav-inner'>
        <div className='nav-mobile-top'>
          <li
            onClick={() => onSortByName(resetView)}
            className={`opt ${view.name === 'name' ? 'active' : ''}`}
          >
            name
          </li>
          <li
            onClick={() => onSortByPopulation(resetView)}
            className={`opt ${view.name === 'population' ? 'active' : ''}`}
          >
            population
          </li>
        </div>
        <div className='nav-mobile-bottom'>
          <li
            onClick={() => onFilterBySubregion()}
            className={`opt ${view.name === 'subregion' ? 'active' : ''}`}
          >
            subregion
          </li>
          <li
            onClick={() => onFilterByNumLanguages()}
            className={`opt ${view.name === 'languages' ? 'active' : ''}`}
          >
            languages
          </li>
        </div>
        {
          <select
            value={dropdownSelection}
            onChange={onSelectFromDropdown}
            className='dropdown'
          >
            {dropdown.map(itemName => {
              return <option key={itemName}>{itemName}</option>;
            })}
          </select>
        }
      </ul>
    </nav>
  );
};

export default Navbar;
