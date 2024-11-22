import { useEffect, useState, createContext } from "react";
import { Header } from "../components";
import { findLobByName, getLobbies } from "../api/lobby.api";
import { LobbyBlock, LobbyTableStyled } from "../components/Lobby/Styled";
import LobbyContent from "../components/Lobby/LobbyContent";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";

export const LobbyContext = createContext();

const Lobby = () => {
  const [lobbyList, setLobbyList] = useState([]);
  const [searchData ,setSearchData] = useState([])
  const [displayData, setDisplayData] = useState(lobbyList)

  const { id } = useParams()

  const [isModalAdd, setModalAdd] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate();

  const fetchLobby = async (lobTypeId) => {
    try {
      const res = await getLobbies("", lobTypeId);
      const lobbies = res.data;

      setLobbyList(lobbies);
      setIsLoading(false);

    } catch (error) {
      console.error("Error fetching lob type information:", error);
    }
  }

  const modalOption = { // lobby type modal 
    open: () => {
      setModalAdd(true)
    },
    close: () => {
      setModalAdd(false)
    }
  }


  useEffect(() => {
    fetchLobby(id);
  }, [id]);

  const shareValue = {
    fetchLobby,
    lobbyList: displayData,
    setLobbyList, isLoading,
    lobTypeID: id,
    modalOption
  };

  const handleAddBtnClick = () => {
    modalOption.open()
  }

  const handleBackBtn = () => {
    navigate('/dashboard/lobType', { replace: true });
  }

  const handleSearch = async (value) => {
    try {
      const name = value
      const res = await findLobByName(name, id)
      setSearchData(res.data)

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (searchData.length > 0) {
      setDisplayData(searchData)
    }
    else {
      setDisplayData(lobbyList)
    }
  }, [searchData, lobbyList]);

  useEffect(() => {
    setDisplayData(lobbyList)
  }, [lobbyList]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <LobbyContext.Provider value={shareValue}>
      <LobbyBlock>
        <Header
          headerTitle={"Lobby"}
          handleBackBtn={handleBackBtn}
          isBack={true}
          handleAddBtnClick={handleAddBtnClick}
          handleSearch={handleSearch}
        />
        <LobbyTableStyled>
          <ToastContainer />
          <LobbyContent 
            isModalAdd={isModalAdd}
            modalOption={modalOption}/>
        </LobbyTableStyled>
      </LobbyBlock>
    </LobbyContext.Provider>
  );
};



export default Lobby;
