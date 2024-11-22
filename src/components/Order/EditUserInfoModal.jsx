import { useState } from 'react';
import { FaPenToSquare } from 'react-icons/fa6';
import { Modal, DatePick, TextInput, TextRow } from '..';
import { editOrderLeft, editOrderRight } from '../../utils/orderRenderArr';
import { editWedding } from '../../api/wedding.api';
import Wrapper from '../../assets/wrappers/Order/EditOrderInfoWrapper';
import { truncateUUID } from '../../utils';

const customStyle = {
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45vw',
    height: '78vh',
    left: '50%',
    top: '50%',
    padding: 0,
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,.1)',
  },
};

const EditUserInfoModal = (p) => {
  const {
    isOpen,
    setModalClose,
    handleEditLobbyClick,
    orderData,
    setOrderData,
  } = p;
  const [formState, setFormState] = useState({
    groom: orderData.groom,
    bride: orderData.bride,
    note: orderData.note,
    phone: orderData.phone,
    table_count: Number(orderData.table_count),
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  // const handleDateChange = (keyValue, newValue) => {
  //   setFormState({
  //     ...formState,
  //     [keyValue]: newValue.toLocaleDateString(),
  //   });
  // };

  const handleSubmit = async () => {
    try {
      const reqBody = {
        ...formState,
        table_count: Number(formState.table_count),
      };
      if (orderData.new_lobby_id) {
        reqBody.lobby_id = orderData.new_lobby_id;
        reqBody.wedding_date = orderData.wedding_date;
        reqBody.shift_id = orderData.Shift.id;
      }
      await editWedding(orderData.id, reqBody);
      setOrderData({
        ...orderData,
        ...reqBody,
      });
      setModalClose();
    } catch (error) {
      alert(error.msg);
      console.log(error);
    }
  };

  const resolveComponent = (title, key, type, openModal, edit) => {
    if (type === 'text-input') {
      return (
        <TextInput
          key={key}
          keyValue={key}
          title={title}
          value={formState?.[key]}
          handleChange={handleChange}
        />
      );
    }
    return (
      <TextRow
        value={orderData?.[key]}
        title={title}
        keyValue={key}
        key={key}
        openModal={openModal}
        edit={edit}
      />
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      setModalClose={setModalClose}
      customStyle={customStyle}
    >
      <Wrapper>
        <div className="header">
          <h4>
            <div>edit order </div>
            <div>{truncateUUID(orderData?.id)}</div>
          </h4>
        </div>
        <div className="container">
          {/* Left col */}
          <div className="customer_info">
            <div className="rows">
              {editOrderLeft.map(({ title, key, type, openModal, edit }) =>
                resolveComponent(title, key, type, openModal, edit)
              )}
              {/* <DatePick
                title="order date"
                keyValue="orderDate"
                handleDateChange={handleDateChange}
                value={orderData.created_at}
              /> */}
            </div>
          </div>
          {/* Right col */}
          <div className="right-col">
            <div className="col-header">
              <h5>{orderData?.lobby_name}</h5>
              <p className="shift">
                {orderData?.shift?.name || orderData?.shift}
              </p>
              <FaPenToSquare className="icon" onClick={handleEditLobbyClick} />
            </div>
            <div className="rows">
              {editOrderRight.map(({ title, key, type, openModal, edit }) =>
                resolveComponent(title, key, type, openModal, edit)
              )}
            </div>
          </div>
        </div>
        <div className="btn-wrapper">
          <button className="btn" onClick={handleSubmit}>
            save
          </button>
        </div>
      </Wrapper>
    </Modal>
  );
};
export default EditUserInfoModal;
