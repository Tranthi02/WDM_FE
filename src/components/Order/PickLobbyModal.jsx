import { useEffect, useState } from 'react';
import { getLobbies, getShifts } from '../../api/lobby.api';
import Modal from '../Modal';
import Wrapper from '../../assets/wrappers/Order/LobWrapper';
import LobCard from './LobCard';
import Loading from '../Loading';

const customStyle = {
  content: {
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

const PickLobbyModal = (p) => {
  const {
    isOpen,
    setModalClose,
    setNextModalOpen,
    setLobbyInfo,
    editLobby,
    wedding_date,
    lob_type_id,
  } = p;
  const [lobbyList, setLobbyList] = useState([]);
  const [shiftList, setShiftList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLobbies = async () => {
    try {
      const lobbies = await getLobbies(wedding_date, lob_type_id);
      setLobbyList(lobbies.data);
    } catch (error) {
      alert(error.message);
    }
  };
  const fetchShifts = async () => {
    try {
      const shift = await getShifts();
      setShiftList(shift.data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchLobbies(), fetchShifts()]);
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
            <h4>choose lobby</h4>
            <div className="container">
              {lobbyList.map((lobby, idx) => (
                <LobCard
                  lobby={lobby}
                  key={idx}
                  shiftList={shiftList}
                  setLobbyInfo={setLobbyInfo}
                  setNextModalOpen={setNextModalOpen}
                  setPickLobbyModalClose={setModalClose}
                  editLobby={editLobby}
                />
              ))}
            </div>
          </>
        )}
      </Wrapper>
    </Modal>
  );
};
export default PickLobbyModal;
