import { useOrderContext } from '../pages/Order';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import resolveDate from '../utils/resolveDate';
import resolveCurrency from '../utils/resolveCurrency';
import Wrapper from '../assets/wrappers/TextRowWrapper';

const TextRow = ({ title, keyValue, value, openModal, type, edit }) => {
  // const { setOrderModalState, setEditOrderModalState } = useOrderContext();

  const resolveClass = () => {
    switch (keyValue) {
      case 'remainder':
        return 'strong';
      case 'extraFee':
        return value > 0 ? 'red' : '';
      default:
        return;
    }
  };

  if (openModal) {
    return (
      <Wrapper className="text-row">
        <span className="title">{title}</span>
        <div
          onClick={() => {
            // if (edit)
              // return setEditOrderModalState({
              //   [openModal]: true,
              //   userInfo: true,
              // });
            // setOrderModalState({ [openModal]: true, info: true });
          }}
          className="open-modal"
        >
          {value}
          {resolveCurrency(keyValue)}
          <FaArrowUpRightFromSquare />
        </div>
      </Wrapper>
    );
  }

  if (type === 'date') {
    return (
      <Wrapper className="text-row">
        <span className="title">{title}</span>
        <span>{resolveDate(value)}</span>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="text-row">
      <span className={`title  ${resolveClass()}`}>{title}</span>
      <span className={resolveClass()}>
        {typeof value === 'number' ? value.toFixed(1) : value}
        {resolveCurrency(keyValue)}
      </span>
    </Wrapper>
  );
};

export default TextRow;
