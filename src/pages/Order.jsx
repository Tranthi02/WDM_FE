import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  Suspense,
} from 'react';
import { Header, Table } from '../components';
import { getWeddings, searchWeddingsByPhone } from '../api/wedding.api';
import {
  EditOrderModalContainer,
  OrderInfoModal,
  CreateOrderModalContainer,
  PayRemainderModal,
  BillModal,
  ServiceModal,
} from '../components/Order';
import { allOrdersTableHeader } from '../utils/orderRenderArr';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';

const Wrapper = React.lazy(() => import('../assets/wrappers/OrderWrapper'));
const OrderContext = createContext();

const Order = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orderList, setOrderList] = useState([]);
  const columns = useMemo(() => allOrdersTableHeader, []);
  const [orderInfo, setOrderInfo] = useState();
  const [newOrder, setNewOrder] = useState();
  const [orderModalState, setOrderModalState] = useState({});
  const [createOrderModalState, setCreateOrderModalState] = useState({});
  const [editOrderModalState, setEditOrderModalState] = useState({});

  const navigate = useNavigate()

  const handleRowClick = (rowData) => {
    navigate(`${rowData.id}`)
    // setOrderInfo(rowData);
    // setOrderModalState({
    //   ...orderModalState,
    //   info: ['deposit', 'pending'].includes(rowData?.status),
    //   bill: rowData?.status === 'paid',
    // });
  };

  const handleAddBtnClick = () => {
    navigate('new-order')
  };

  const fetchWeddings = async () => {
    try {
      const { data } = await getWeddings(true);
      // const renderData = handleRenderData(data)

      setOrderList(data);
      setIsLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRenderData = (data) => {
    
    const renderData = []
    for(let wedding of data ) {
      const Bill = wedding.Bill.reduce(
        (mainBill, currentBill) =>
          mainBill.payment_date < currentBill.payment_date
            ? currentBill
            : mainBill,
        wedding.Bill[0]
      );
      const newData = {
        ...wedding,
        ...Bill,
        shift: wedding.Shift.name,
        shift_id: wedding.Shift.id,
        customer_name: `${wedding.groom}/${wedding.bride}`,
        phone: wedding.Customer.phone,
        lobby_name: wedding.Lobby.name,
        id: wedding.id,
      };
      renderData.push(newData)
    }
    return renderData
  };

  const handleSearch = async (inputValue) => {
    try {
      if (!inputValue && !orderList.length) {
        return await fetchWeddings();
      }
      const { data } = await searchWeddingsByPhone(inputValue);
      // const renderData = handleRenderData(data)
      setOrderList(data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (!orderInfo && !newOrder) fetchWeddings();
  }, [orderInfo, newOrder]);

  return (
    <OrderContext.Provider
      value={{
        orderModalState,
        setOrderModalState,
        createOrderModalState,
        setCreateOrderModalState,
        orderInfo,
        setOrderInfo,
        newOrder,
        setNewOrder,
        editOrderModalState,
        setEditOrderModalState,
        fetchWeddings
      }}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Wrapper>
          <Header
            handleAddBtnClick={handleAddBtnClick}
            headerTitle={'Order'}
            handleSearch={handleSearch}
          />
          <main>
            <div
              className={orderList.length ? 'container' : 'container center'}
            >
              {orderList.length ? (
                <Table
                  data={orderList}
                  setOrderList={setOrderList}
                  columns={columns}
                  handleRowClick={handleRowClick}
                  pagination
                />
              ) : (
                <span className="empty">No order</span>
              )}
            </div>
            {/* <Suspense fallback={<Loading minsize="35px" />}>
              {orderModalState?.info && <OrderInfoModal />}
              {orderModalState?.payRemainder && <PayRemainderModal />}
              {orderModalState?.bill && <BillModal />}
              {orderModalState?.food && (
                <ServiceModal type="food" title="food" />
              )}
              {orderModalState?.service && (
                <ServiceModal type="service" title="service" />
              )}
              <CreateOrderModalContainer />
              <EditOrderModalContainer />
            </Suspense> */}
          </main>
        </Wrapper>
      )}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);
export default Order;
