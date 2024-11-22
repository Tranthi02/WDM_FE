import { TextRow } from '../';
import { reviewOrderLeft, reviewOrderRight } from '../../utils/orderRenderArr';
import Modal from '../Modal';
import Wrapper from '../../assets/wrappers/Order/ReviewWrapper';

const ReviewModal = (p) => {
  const {
    isOpen,
    setModalClose,
    setNextModalOpen,
    orderData,
    setOrderData,
  } = p
  const handleNextBtnClick = () => {
    setNextModalOpen();
    setOrderData(null);
  };

  return (
    <Modal isOpen={isOpen} setModalClose={setModalClose}>
      <Wrapper>
        <h4>review</h4>
        <div className="container">
          {/* Left col */}
          <div>
            <h5>Customer information</h5>
            <div className="rows">
              {reviewOrderLeft.map(({ title, key, type }) => (
                <TextRow
                  title={title}
                  keyValue={key}
                  key={key}
                  value={orderData[key]}
                  type={type}
                />
              ))}
            </div>
          </div>
          {/* Right col */}
          <div>
            <h5>{orderData?.lobby_name}</h5>
            <p className="shift">{orderData?.shift}</p>
            <div className="rows">
              {reviewOrderRight.map(({ title, key, openModal }) => (
                <TextRow
                  value={orderData?.[key]}
                  title={title}
                  keyValue={key}
                  key={key}
                  openModal={openModal}
                />
              ))}
            </div>
          </div>
        </div>
        <button className="btn" onClick={handleNextBtnClick}>
          complete
        </button>
      </Wrapper>
    </Modal>
  );
};
export default ReviewModal;
