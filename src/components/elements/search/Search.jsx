/* eslint-disable react/prop-types */
import { InputElement } from "../input";
import { useState, useEffect } from "react";

const Search = ({ searchValue, setSearchValue }) => {
  const [inputValue, setInputValue] = useState(searchValue);

  useEffect(() => {
    const delay = 500; // Delay dalam milidetik

    const timeoutId = setTimeout(() => {
      setSearchValue(inputValue);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [inputValue, setSearchValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <InputElement
        type="text"
        value={inputValue}
        name="search"
        className="form-control"
        placeholder="Search"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Search;
