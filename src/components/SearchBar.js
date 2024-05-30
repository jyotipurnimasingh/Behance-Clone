import React from 'react';
import '../App.css';

const SearchBar = ({ suggestions, onSuggestionSelect, inputValue, onChange }) => {
  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={inputValue}
          onChange={onChange}
        />
        {inputValue.trim() !== '' && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => onSuggestionSelect(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
