import { useOrderContext } from '../../pages/Order';
import {
  PickDateModal,
  PickLobTypeModal,
  PickLobbyModal,
  GetUserInfoModal,
  PickFoodServiceModal,
  PaymentModal,
  ReviewModal,
  SuccessModal,
} from './';

const CreateOrderModalContainer = () => {
  const {
    createOrderModalState,
    setCreateOrderModalState,
    newOrder,
    setNewOrder,
  } = useOrderContext();

  const setModalState = (
    currModal,
    currModalState,
    nextModal,
    nextModalState
  ) => {
    setCreateOrderModalState({
      [currModal]: currModalState,
      [nextModal]: nextModalState,
    });
  };

  return (
    <>
      {createOrderModalState?.pickDate && (
        <PickDateModal
          isOpen={createOrderModalState?.pickDate}
          setModalClose={() => setModalState('pickDate', false)}
          setWeddingDate={(wedding_date) => setNewOrder({ wedding_date })}
          setNextModalOpen={() =>
            setModalState('pickDate', false, 'lobType', true)
          }
        />
      )}
      {createOrderModalState?.lobType && (
        <PickLobTypeModal
          isOpen={createOrderModalState?.lobType}
          setModalClose={() => setModalState('lobType', false)}
          setLobType={(lob_type_id, deposit_percent) =>
            setNewOrder({ ...newOrder, lob_type_id, deposit_percent })
          }
          setNextModalOpen={() =>
            setModalState('lobType', false, 'lobby', true)
          }
        />
      )}
      {createOrderModalState?.lobby && (
        <PickLobbyModal
          isOpen={createOrderModalState?.lobby}
          setModalClose={() => setModalState('lobby', false)}
          setNextModalOpen={() =>
            setModalState('lobby', false, 'userInfo', true)
          }
          setLobbyInfo={(lobby_id, shift, lobby_name) =>
            setNewOrder({ ...newOrder, lobby_id, shift, lobby_name })
          }
          wedding_date={newOrder.wedding_date}
          lob_type_id={newOrder.lob_type_id}
        />
      )}
      {createOrderModalState?.userInfo && (
        <GetUserInfoModal
          isOpen={createOrderModalState?.userInfo}
          setModalClose={() => setModalState('userInfo', false)}
          setNextModalOpen={() =>
            setModalState('userInfo', false, 'food', true)
          }
          setUserInfo={(formResult, id, table_count) =>
            setNewOrder({
              ...newOrder,
              ...formResult,
              id,
              table_count,
            })
          }
          lobby_id={newOrder.lobby_id}
          shift={newOrder.shift}
          wedding_date={newOrder.wedding_date}
        />
      )}
      {createOrderModalState?.food && (
        <PickFoodServiceModal
          isOpen={createOrderModalState?.food}
          setModalClose={() => setModalState('food', false)}
          setNextModalOpen={() => setModalState('food', false, 'service', true)}
          type="food"
          orderId={newOrder.id}
          setFoodData={(food_total_price) =>
            setNewOrder({ ...newOrder, food_total_price })
          }
        />
      )}
      {createOrderModalState?.service && (
        <PickFoodServiceModal
          isOpen={createOrderModalState?.service}
          setModalClose={() => setModalState('service', false)}
          setNextModalOpen={() =>
            setModalState('service', false, 'payment', true)
          }
          type="service"
          orderId={newOrder.id}
          setServiceData={(total, service_total_price) =>
            setNewOrder({ ...newOrder, total, service_total_price })
          }
        />
      )}
      {createOrderModalState?.payment && (
        <PaymentModal
          isOpen={createOrderModalState?.payment}
          setModalClose={() => setModalState('payment', false)}
          setNextModalOpen={() =>
            setModalState('payment', false, 'review', true)
          }
          orderData={newOrder}
          setOrderData={setNewOrder}
        />
      )}
      {createOrderModalState?.review && (
        <ReviewModal
          isOpen={createOrderModalState?.review}
          setModalClose={() => setModalState('review', false)}
          setNextModalOpen={() =>
            setModalState('review', false, 'success', true)
          }
          orderData={newOrder}
          setOrderData={setNewOrder}
        />
      )}
      {createOrderModalState?.success && (
        <SuccessModal
          isOpen={createOrderModalState?.success}
          setModalClose={() => setModalState('success', false)}
          setNextModalOpen={() => setModalState('success', false)}
        />
      )}
    </>
  );
};
export default CreateOrderModalContainer;
