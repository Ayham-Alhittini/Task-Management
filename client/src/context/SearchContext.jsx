import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, handleSearchChange }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);