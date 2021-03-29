import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from './components/Cards/Cards';
import Navbar from './components/Navbar/Navbar';
import './App.css';

const DEFAULT_VIEW = 'name';
const DROPDOWN_ASCENDING = ['Ascending', 'Descending'];
const DROPDOWN_LANGUAGES = ['Languages (1)', 'Languages (2)', 'Languages (3+)'];
const REQ_URL = 'https://restcountries.eu/rest/v2/region/europe';

const initialState = {
  dropdown: [],
  countries: [],
  dropdownSelection: '',
  countriesFiltered: [],
  selectedCountry: null,
  view: {
    name: DEFAULT_VIEW,
    isAscending: true,
  },
};

function App() {
  const [state, setState] = useState({ ...initialState });
  useEffect(() => {
    const getCountries = async () => {
      const response = await axios.get(REQ_URL);
      const newCountries = response.data.sort((x, y) =>
        x.name.localeCompare(y.name)
      );
      const dropdown = DROPDOWN_ASCENDING;
      setState(prevState => {
        return {
          ...prevState,
          dropdown,
          countries: newCountries,
          dropdownSelection: 'Ascending',
        };
      });
    };
    getCountries();
  }, []);

  const onSortByName = payload => {
    let newCountries, dropdownSelection;
    const isResetView = payload && payload.isResetView;
    const isAscending = !isResetView && state.view.isAscending;
    if (!isAscending) {
      newCountries = [...state.countries].sort((x, y) => {
        return x.name.localeCompare(y.name);
      });
      dropdownSelection = 'Ascending';
    } else {
      newCountries = [...state.countries].sort((x, y) => {
        return y.name.localeCompare(x.name);
      });
      dropdownSelection = 'Descending';
    }
    const dropdown = DROPDOWN_ASCENDING;
    setState(prevState => {
      return {
        ...prevState,
        dropdown,
        dropdownSelection,
        countries: newCountries,
        countriesFiltered: [],
        view: {
          name: 'name',
          isAscending: !isAscending,
        },
      };
    });
  };

  const onSortByPopulation = payload => {
    let newCountries, dropdownSelection;
    const dropdown = DROPDOWN_ASCENDING;
    const isResetView = payload && payload.isResetView;
    const isAscending = !isResetView && state.view.isAscending;
    if (isAscending) {
      newCountries = [...state.countries].sort((x, y) => {
        return x.population < y.population ? 1 : -1;
      });
      dropdownSelection = 'Descending';
    } else {
      newCountries = [...state.countries].sort((x, y) => {
        return x.population > y.population ? 1 : -1;
      });
      dropdownSelection = 'Ascending';
    }
    setState(prevState => {
      return {
        ...prevState,
        dropdown,
        dropdownSelection,
        countries: newCountries,
        countriesFiltered: [],
        view: {
          name: 'population',
          isAscending: !isAscending,
        },
      };
    });
  };

  const onFilterBySubregion = (
    selectedSubRegion = state.countries[0].subregion
  ) => {
    const countriesFiltered = state.countries
      .filter(country => country.subregion === selectedSubRegion)
      .sort((x, y) => x.name.localeCompare(y.name));
    const dropdown = [
      ...new Set(
        state.countries
          .map(country => country.subregion)
          .sort((x, y) => x.localeCompare(y))
      ),
    ];
    const dropdownSelection = selectedSubRegion.name;
    setState(prevState => {
      return {
        ...prevState,
        dropdown,
        dropdownSelection,
        countriesFiltered,
        view: {
          name: 'subregion',
          isAscending: state.view.isAscending,
        },
      };
    });
  };

  const onFilterByNumLanguages = (selectedOpt = DROPDOWN_LANGUAGES[0]) => {
    const isLast = selectedOpt.includes('+');
    const targetIdx = isLast ? 3 : 2;
    const numSelected = Number(
      selectedOpt.substring(
        selectedOpt.length - targetIdx,
        selectedOpt.length - (targetIdx - 1)
      )
    );
    const countriesFiltered = state.countries
      .filter(country => country.languages.length === numSelected)
      .sort((x, y) => x.name.localeCompare(y.name));
    const dropdown = DROPDOWN_LANGUAGES;
    const dropdownSelection = selectedOpt;
    setState(prevState => {
      return {
        ...prevState,
        dropdown,
        dropdownSelection,
        countriesFiltered,
        view: {
          name: 'languages',
          isAscending: state.view.isAscending,
        },
      };
    });
  };

  const onToggleCountry = selectedCountry => {
    let newCountries;
    let isBorderViewActive = false;
    const countryCode = selectedCountry.cioc;
    if (state.view.isBorderViewActive) {
      newCountries = state.countries.map(country => {
        country.isBorder = false;
        return country;
      });
    } else {
      newCountries = state.countries.map(country => {
        if (country.borders.includes(countryCode)) {
          country.isBorder = true;
        }
        return country;
      });
      isBorderViewActive = true;
    }
    setState(prevState => {
      return {
        ...prevState,
        countries: newCountries,
        view: {
          name: state.view.name,
          isBorderViewActive: isBorderViewActive,
          isAscending: state.view.isAscending,
        },
      };
    });
  };

  return (
    <>
      {!state.countries.length && <p>Loading</p>}
      {state.countries.length > 0 && (
        <>
          <Navbar
            {...state}
            onSortByName={onSortByName}
            onSortByPopulation={onSortByPopulation}
            onFilterBySubregion={onFilterBySubregion}
            onFilterByNumLanguages={onFilterByNumLanguages}
          />
          <Cards {...state} onToggleCountry={onToggleCountry} />
        </>
      )}
    </>
  );
}

export default App;
