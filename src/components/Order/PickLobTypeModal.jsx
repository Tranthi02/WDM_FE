import { useEffect, useMemo, useState } from 'react';
import { getLobbyTypes } from '../../api/lobby.api';
import Loading from '../Loading';
import Modal from '../Modal';
import Wrapper from '../../assets/wrappers/Order/LobTypeWrapper';
import Table from '../Table';

const customStyle = {
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70vw',
    height: '87vh',
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

const PickLobTypeModal = ({
  isOpen,
  setModalClose,
  setNextModalOpen,
  setLobType,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'Type',
        accessor: 'type_name',
      },
      {
        Header: 'Max table',
        accessor: 'max_table_count',
      },
      {
        Header: 'Min price',
        accessor: 'min_table_price',
      },
      {
        Header: 'Required deposit',
        accessor: 'deposit_percent',
      },
    ],
    []
  );

  const fetchLobTypes = async () => {
    try {
      const lobType = await getLobbyTypes();
      setData(lobType.data);
      setIsLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchLobTypes();
  }, []);

  const handleRowClick = (lobType) => {
    setLobType(lobType.id, lobType.deposit_percent);
    setNextModalOpen();
  };

  return (
    <Modal
      isOpen={isOpen}
      setModalClose={setModalClose}
      customStyle={customStyle}
    >
      <Wrapper>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <h4>choose lobby type</h4>
            <div className="container">
              <Table
                data={data}
                columns={columns}
                handleRowClick={handleRowClick}
                pagination
              />
            </div>
          </>
        )}
      </Wrapper>
    </Modal>
  );
};
export default PickLobTypeModal;
