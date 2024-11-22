import { useRef, useState, useEffect } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import Wrapper from '../assets/wrappers/SearchBoxWrapper';

const SearchBox = (p) => {
  const { handleSearch } = p
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const handleFormClick = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if(typeof handleSearch === 'function') { 
        if(inputValue !== ''){
          handleSearch(inputValue);
        } else {
          handleSearch("");
        }
      }
    }, 750);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue]);

  return (
    <Wrapper onClick={handleFormClick}>
      <form>
        <FaMagnifyingGlass className="icon" />
        <input
          ref={inputRef}
          type="text"
          placeholder="search"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </form>
    </Wrapper>
  );
};
export default SearchBox;
