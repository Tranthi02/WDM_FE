import { FaFilter, FaPlus } from 'react-icons/fa6';
import Wrapper from '../assets/wrappers/HeaderWrapper';
import SearchBox from './SearchBox';
import { Icon } from '../assets/icon';
import { Button } from 'antd';
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const Header = (p) => {
  const {
    handleAddBtnClick,
    headerTitle,
    headerRightTitle="Next",
    isBack=false,
    handleBackBtn,
    handleSearch,
    action=true,
    handleNextBtn=() => {},
    isNext=false
  } = p
  return (
    <Wrapper>
        {isBack && (
          <div style={{marginRight: "10px"}}>
            <Button 
              style={{ width: '50px' }}
              icon={<FaArrowLeft />}
              onClick={handleBackBtn}>
            </Button>
          </div>
        )}
      <h1>{headerTitle}</h1>
      {action && <div className="right-container">
        <SearchBox handleSearch={handleSearch} />
        <button>
          <FaFilter className="icon" />
        </button>
        <button onClick={handleAddBtnClick}>
          <FaPlus className="icon" />
        </button>
      </div>}
      {isNext && <div className="next-action">
        <p className='title'>{headerRightTitle}</p>
        <div>
            <Button 
              style={{ width: '50px' }}
              icon={<FaArrowRight />}
              onClick={handleNextBtn}>
            </Button>
          </div>
      </div>}

    </Wrapper>
  );
};
export default Header;
