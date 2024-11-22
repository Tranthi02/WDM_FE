import { useContext } from "react";

import Wrapper from '../../../assets/wrappers/Order/LobWrapper.js';
import LobbyCard from '../LobbyCard.jsx';
import Loading from '../../Loading.jsx';
import { LobbyContext } from "../../../pages/Lobby.jsx";
import { useNavigate } from "react-router-dom";

const LobbyUIList = () => {

  const { isLoading, lobbyList } = useContext(LobbyContext);
  const navigate = useNavigate()

  const handleClickLobCard = (id) => {
    navigate(`lobby/${id}`)
  }

  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="container">
            {lobbyList && lobbyList.map((lobby) => (
              <LobbyCard
                handleClickLobCard={() =>handleClickLobCard(lobby.id)}
                lobby={lobby}
                key={lobby.id}
              />
            ))}
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default LobbyUIList;



