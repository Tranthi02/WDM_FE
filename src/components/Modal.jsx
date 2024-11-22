import ReactModal from 'react-modal';

const style = {
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50vw',
    height: '50vh',
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

ReactModal.setAppElement('#root');

const Modal = (p) => {
  const { isOpen, setModalClose, children } = p;
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={setModalClose}
      style={p?.customStyle ? p?.customStyle : style}
    >
      {children}
    </ReactModal>
  );
};
export default Modal;
