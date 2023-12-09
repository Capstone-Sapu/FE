/* eslint-disable react/prop-types */
import { InputElement } from "../input";



const Search = ({ searchValue, setSearchValue }) => {
  return (
    <div>
      <InputElement
        type="text"
        value={searchValue}
        name="search"
        className="form-control"
        placeholder="Search"
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default Search;
