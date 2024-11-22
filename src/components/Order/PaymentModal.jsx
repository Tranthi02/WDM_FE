import { useEffect, useState } from 'react';
import { TextRow, TextInput, Radio } from '../';
import { depositOrder, fullPayOrder } from '../../api/wedding.api';
import { paymentOverall, paymentOption } from '../../utils/orderRenderArr';
import Modal from '../Modal';
import Wrapper from '../../assets/wrappers/Order/PaymentWrapper';

const customStyle = {
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30vw',
    height: '70vh',
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

const PaymentModal = (p) => {
  const {
    isOpen,
    setModalClose,
    setNextModalOpen,
    orderData,
    setOrderData,
  } = p
  const [payValue, setPayValue] = useState(orderData.requiredDeposit);
  const [payOption, setPayOption] = useState('deposit');

  const handleOptionChange = (value) => {
    setPayOption(value);
    setPayValue(
      value === 'deposit' ? orderData.requiredDeposit : orderData.total
    );
  };

  const handleNextBtnClick = async () => {
    let result;
    try {
      if (payOption === 'deposit')
        result = await depositOrder(orderData.id, Number(payValue));
      if (payOption === 'full')
        result = await fullPayOrder(orderData.id, Number(payValue));
      if (result.data.msg) throw new Error(result.data.msg);
      setOrderData({
        ...result.data,
        ...result.data.weddingData,
        phone: orderData.phone,
        lobby_name: orderData.lobby_name,
      });
      setNextModalOpen();
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const requiredDeposit =
      (Number(orderData.deposit_percent) / 100) * Number(orderData.total);
    setOrderData({
      ...orderData,
      requiredDeposit,
    });
    setPayValue(requiredDeposit);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      setModalClose={setModalClose}
      customStyle={customStyle}
    >
      <Wrapper>
        <h4>payment</h4>
        <div className="container">
          <div className="overall">
            <h5>overall</h5>
            {paymentOverall.map(({ title, key }) => (
              <TextRow
                title={title}
                keyValue={key}
                key={key}
                value={orderData?.[key]}
              />
            ))}
            <TextRow
              title="total"
              value={orderData.total}
              keyValue={'remainder'}
            />
          </div>
          <div className="payment">
            <h5>payment option</h5>
            {paymentOption.map(({ key, value, title }) => (
              <Radio
                key={value}
                title={title}
                keyValue={key}
                value={value}
                handleChange={() => handleOptionChange(value)}
                currValue={payOption}
              />
            ))}
            <h5>pay remainder</h5>
            <TextInput
              keyValue="payRemainder"
              value={payValue}
              handleChange={(e) => setPayValue(e.target.value)}
            />
          </div>
        </div>
        <button className="btn" onClick={handleNextBtnClick}>
          next: review
        </button>
      </Wrapper>
    </Modal>
  );
};
export default PaymentModal;
