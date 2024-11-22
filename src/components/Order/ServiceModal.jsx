import { useMemo, useState, useEffect } from 'react';
import { useOrderContext } from '../../pages/Order';
import { getFoodsCart, getServicesCart } from '../../api/wedding.api';
import Modal from '../Modal';
import Table from '../Table';
import Loading from '../Loading';
import Wrapper from '../../assets/wrappers/Order/ServiceWrapper';

const customStyle = {
  content: {
    width: '60vw',
    height: '65vh',
    left: '50%',
    top: '50%',
    padding: 0,
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
};

const ServiceModal = ({ type, title }) => {
  const { orderModalState, setOrderModalState, orderInfo } = useOrderContext();
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const foodColumns = useMemo(
    () => [
      {
        Header: 'Order',
        accessor: 'order',
      },
      {
        Header: 'Food',
        accessor: 'food_name',
      },
      {
        Header: 'Price',
        accessor: 'food_price',
      },
      {
        Header: 'Quantity',
        accessor: 'count',
      },
      {
        Header: 'Total',
        accessor: 'total',
      },
    ],
    []
  );
  const serviceColumns = useMemo(
    () => [
      {
        Header: 'Order',
        accessor: 'order',
      },
      {
        Header: 'Service',
        accessor: 'service_name',
      },
      {
        Header: 'Price',
        accessor: 'service_price',
      },
      {
        Header: 'Quantity',
        accessor: 'count',
      },
      {
        Header: 'Total',
        accessor: 'total',
      },
    ],
    []
  );
  const total = useMemo(
    () =>
      tableData.map(({ total }) => total).reduce((acc, item) => acc + item, 0),
    [tableData]
  );

  const fetchData = async () => {
    let data;
    try {
      if (type === 'food') data = await getFoodsCart(orderInfo.id);
      if (type === 'service') data = await getServicesCart(orderInfo.id);
      // handle data array
      data = data.data.map((item, index) => ({
        ...item,
        order: index + 1,
        total:
          item.count * (type === 'food' ? item.food_price : item.service_price),
      }));
      setTableData(data);
      setIsLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Modal
      isOpen={orderModalState?.[type]}
      setModalClose={() =>
        setOrderModalState({ ...orderModalState, [type]: false })
      }
      customStyle={customStyle}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Wrapper>
          <h3>{title}</h3>
          <div className="container">
            <Table
              data={tableData}
              columns={type === 'food' ? foodColumns : serviceColumns}
            />
            <strong>total: {total}$</strong>
          </div>
        </Wrapper>
      )}
    </Modal>
  );
};
export default ServiceModal;
