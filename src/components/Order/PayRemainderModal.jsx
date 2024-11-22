import { useState } from 'react';
import { useOrderContext } from '../../pages/Order';
import { CheckBox, Modal, TextInput } from '../';
import { togglePenalty, depositOrder } from '../../api/wedding.api';
import { payRemainderOverall } from '../../utils/orderRenderArr';
import TextRow from '../TextRow';
import Wrapper from '../../assets/wrappers/Order/PayRemainderWrapper';

const customStyle = {
  content: {
    width: '35vw',
    height: '75vh',
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

const PayRemainderModal = () => {
  const { orderModalState, setOrderModalState, orderInfo, setOrderInfo } =
    useOrderContext();
  const [payRemainder, setPayRemainder] = useState(orderInfo.remain_amount);

  console.log(orderInfo);

  const handlePenaltyModeChange = async () => {
    try {
      const result = await togglePenalty(orderInfo.id);
      const { is_penalty_mode, total, extraFee, remainPrice } = result.data;
      setOrderInfo({
        ...orderInfo,
        is_penalty_mode,
        total_price: total,
        extra_fee: extraFee,
        remain_amount: remainPrice,
      });
      setPayRemainder(remainPrice);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSubmitBtnClick = async () => {
    try {
      const result = await depositOrder(orderInfo.id, Number(payRemainder));
      if (result.data.msg) throw new Error(result.data.msg);
      if (result.data.remainPrice > 0) {
        setOrderInfo(null);
        setOrderModalState({ payRemainder: false });
      }
      if (result.data.remainPrice === 0) {
        setOrderInfo({
          ...orderInfo,
          paid_date: result.data.paid_date,
          status: result.data.status,
        });
        setOrderModalState({
          ...orderModalState,
          payRemainder: false,
          bill: true,
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Modal
      isOpen={orderModalState?.payRemainder}
      setModalClose={() =>
        setOrderModalState({
          payRemainder: false,
        })
      }
      customStyle={customStyle}
    >
      <Wrapper>
        <h4>payment</h4>
        <p>{orderInfo?.id}</p>
        <div className="container">
          {/* Overall block */}
          <div className="overall">
            <h5>overall</h5>
            {payRemainderOverall.map(({ title, key }) => (
              <TextRow
                title={title}
                keyValue={key}
                key={key}
                value={orderInfo?.[key]}
              />
            ))}
          </div>
          {/* Payment block */}
          <div className="payment">
            <h5>pay remainder</h5>
            <TextInput
              keyValue="payRemainder"
              value={payRemainder}
              handleChange={(e) => setPayRemainder(e.target.value)}
              type="number"
            />
          </div>
        </div>
        <div className="btn-wrapper">
          <button className="btn" onClick={handleSubmitBtnClick}>
            complete
          </button>
          <CheckBox
            title="penalty mode"
            type="checkbox"
            keyValue="isPenaltyMode"
            value={orderInfo?.is_penalty_mode}
            handleChange={handlePenaltyModeChange}
          />
        </div>
      </Wrapper>
    </Modal>
  );
};
export default PayRemainderModal;
