import { FaCheck } from 'react-icons/fa';
import Modal from '../Modal';
import Wrapper from '../../assets/wrappers/Order/SuccessWrapper';

const customStyle = {
  content: {
    width: '55vw',
    height: '40vh',
    left: '50%',
    top: '50%',
    padding: 0,
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,.5)',
  },
};

const SuccessModal = ({ isOpen, setModalClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      setModalClose={setModalClose}
      customStyle={customStyle}
    >
      <Wrapper>
        <div className="top">
          <div className="icon-wrapper">
            <FaCheck className="icon" />
          </div>
        </div>
        <div className="bottom">
          <strong>create new order successfully</strong>
          <div className="btn" onClick={setModalClose}>
            back to home
          </div>
        </div>
      </Wrapper>
    </Modal>
  );
};
export default SuccessModal;
