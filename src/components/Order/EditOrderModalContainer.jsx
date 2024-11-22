import { useOrderContext } from '../../pages/Order';
import {
  PickDateModal,
  PickLobTypeModal,
  PickLobbyModal,
  EditUserInfoModal,
  PickFoodServiceModal,
  SuccessModal,
} from './';
import { ToastContainer, toast } from 'react-toastify';

const CreateOrderModalContainer = () => {
  const {
    editOrderModalState,
    setEditOrderModalState,
    orderInfo,
    setOrderInfo,
  } = useOrderContext();

  const setModalState = (
    currModal,
    currModalState,
    nextModal,
    nextModalState
  ) => {
    setEditOrderModalState({
      [currModal]: currModalState,
      [nextModal]: nextModalState,
    });
  };

  return (
    <>
      <ToastContainer />
      {editOrderModalState?.userInfo && (
        <EditUserInfoModal
          isOpen={editOrderModalState?.userInfo}
          setModalClose={() => setModalState('userInfo', false)}
          handleEditLobbyClick={() =>
            setEditOrderModalState({
              ...editOrderModalState,
              pickDate: true,
            })
          }
          orderData={orderInfo}
          setOrderData={setOrderInfo}
        />
      )}
      {editOrderModalState?.pickDate && (
        <PickDateModal
          isOpen={editOrderModalState?.pickDate}
          setModalClose={() =>
            setModalState('pickDate', false, 'userInfo', true)
          }
          setWeddingDate={(wedding_date) =>
            setOrderInfo({ ...orderInfo, wedding_date })
          }
          setNextModalOpen={() =>
            setModalState('pickDate', false, 'lobType', true)
          }
        />
      )}
      {editOrderModalState?.lobType && (
        <PickLobTypeModal
          isOpen={editOrderModalState?.lobType}
          setModalClose={() =>
            setModalState('lobType', false, 'userInfo', true)
          }
          setLobType={(lob_type_id, deposit_percent) =>
            setOrderInfo({ ...orderInfo, lob_type_id, deposit_percent })
          }
          setNextModalOpen={() =>
            setModalState('lobType', false, 'lobby', true)
          }
        />
      )}
      {editOrderModalState?.lobby && (
        <PickLobbyModal
          isOpen={editOrderModalState?.lobby}
          setModalClose={() => setModalState('lobby', false, 'userInfo', true)}
          setLobbyInfo={(new_lobby_id, shift, lobby_name) =>
            setOrderInfo({ ...orderInfo, new_lobby_id, shift, lobby_name })
          }
          wedding_date={orderInfo.wedding_date}
          lob_type_id={orderInfo.lob_type_id}
          editLobby
        />
      )}
      {editOrderModalState?.food && (
        <PickFoodServiceModal
          isOpen={editOrderModalState?.food}
          setModalClose={() => setModalState('food', false, 'userInfo', true)}
          type="food"
          orderId={orderInfo.id}
          editOrder={(food_total_price, remain_amount, total_price) =>
            setOrderInfo({
              ...orderInfo,
              food_total_price,
              remain_amount,
              total_price,
            })
          }
        />
      )}
      {editOrderModalState?.service && (
        <PickFoodServiceModal
          isOpen={editOrderModalState?.service}
          setModalClose={() =>
            setModalState('service', false, 'userInfo', true)
          }
          type="service"
          orderId={orderInfo.id}
          setServiceData={(total, serviceFee) =>
            setOrderInfo({ ...orderInfo, total, serviceFee })
          }
          editOrder={(service_total_price, remain_amount, total_price) =>
            setOrderInfo({
              ...orderInfo,
              service_total_price,
              remain_amount,
              total_price,
            })
          }
        />
      )}
      {editOrderModalState?.success && (
        <SuccessModal
          isOpen={editOrderModalState?.success}
          setModalClose={() => setModalState('success', false)}
          setNextModalOpen={() => setModalState('success', false)}
        />
      )}
    </>
  );
};
export default CreateOrderModalContainer;
