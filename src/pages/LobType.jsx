import { useEffect, useState, createContext } from "react";
import { Header } from "../components";
import { findLobTypeByName, getLobbyTypes } from "../api/lobby.api";
import { LobbyBlock, LobbyTableStyled } from "../components/Lobby/Styled";
import LobbyTypeContent from "../components/Lobby/LobbyTypeContent";
import { ToastContainer, toast } from "react-toastify";

export const LobbyTypeContext = createContext();

const LobType = () => {
  const [lobTypeData, setLobTypeData] = useState([]);
  const [searchData ,setSearchData] = useState([])
  const [displayData, setDisplayData] = useState(lobTypeData)
  const [isModalAddLT, setModalAddLT] = useState(false)

  const fetchLobType = async () => {
    const res = await getLobbyTypes();
    const data = res.data;
    setLobTypeData(data);
  };

  useEffect(() => {
    fetchLobType();
  }, []);

  const shareValue = {
    lobTypeData,
    setLobTypeData,
    fetchLobType,
  };

  const handleAddBtnClick = () => {
    LTmodalOption.open()
  }

  const LTmodalOption = {
    open: () => {
      setModalAddLT(true)
    },
    close: () => {
      setModalAddLT(false)
    }
  }

  const handleSearch = async (value) => {
    try {
      const type_name = value
      const res = await findLobTypeByName(type_name)
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
      setDisplayData(lobTypeData)
    }
  }, [searchData, lobTypeData]);

  useEffect(() => {
    setDisplayData(lobTypeData)
  }, [lobTypeData]);

  return (
    <LobbyTypeContext.Provider value={shareValue}>
      <LobbyBlock>
        <Header
          headerTitle={"Kiểu bàn và không gian tiệc"}
          // handleBackBtn={() => handleBackBtn()}
          // isBack={pageDisplay.previousPage}
          handleAddBtnClick={handleAddBtnClick}
          handleSearch={handleSearch}
        />
        <LobbyTableStyled>
          <ToastContainer />
          <LobbyTypeContent data={displayData} isModalAddLT={isModalAddLT} LTmodalOption={LTmodalOption}/>

        </LobbyTableStyled>
      </LobbyBlock>
    </LobbyTypeContext.Provider>
  );
};



export default LobType;
