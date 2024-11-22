import { Modal } from '../';
import { FaPenToSquare } from 'react-icons/fa6';
import { useOrderContext } from '../../pages/Order';
import { orderInfoLeft, orderInfoRight } from '../../utils/orderRenderArr';
import TextRow from '../TextRow';
import Wrapper from '../../assets/wrappers/Order/OrderInfoWrapper';
import { truncateUUID } from '../../utils';

const style = {
  content: {
    width: '50vw',
    height: '55vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    left: '50%',
    top: '50%',
    padding: 0,
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
};

const OrderInfoModal = () => {
  const {
    orderInfo,
    setOrderInfo,
    orderModalState,
    setOrderModalState,
    setEditOrderModalState,
  } = useOrderContext();

  const handlePayBtnClick = () => {
    setOrderModalState({
      ...orderModalState,
      info: false,
      payRemainder: true,
    });
  };

  return (
    <Modal
      customStyle={style}
      isOpen={orderModalState?.info}
      setModalClose={() => {
        setOrderModalState({ info: false });
        setOrderInfo(null);
      }}
    >
      <Wrapper>
        <div className="header">
          <h4>
            <p> order</p>
            <p> {truncateUUID(orderInfo?.id)}</p>
          </h4>
          <FaPenToSquare
            className="icon"
            onClick={() => setEditOrderModalState({ userInfo: true })}
          />
        </div>
        <div className="container">
          {/* Left col */}
          <div>
            <h5>Customer information</h5>
            <div className="rows">
              {orderInfoLeft.map(({ title, key, type }) => (
                <TextRow
                  title={title}
                  keyValue={key}
                  key={key}
                  type={type}
                  value={orderInfo?.[key]}
                />
              ))}
            </div>
          </div>
          {/* Right col */}
          <div>
            <h5>{orderInfo?.lobby_name}</h5>
            <p className="shift">
              {orderInfo?.shift?.name || orderInfo?.shift}
            </p>
            <div className="rows">
              {orderInfoRight.map(({ title, key, openModal }) => (
                <TextRow
                  value={orderInfo?.[key]}
                  title={title}
                  keyValue={key}
                  key={key}
                  openModal={openModal}
                />
              ))}
            </div>
          </div>
        </div>
        <button className="btn" onClick={handlePayBtnClick}>
          pay
        </button>
      </Wrapper>
    </Modal>
  );
};
export default OrderInfoModal;
