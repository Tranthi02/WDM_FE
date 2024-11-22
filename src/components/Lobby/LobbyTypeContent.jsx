import { Fragment,  useContext, useState } from 'react';
import { LobbyTypeContext } from '../../pages/LobType';
import LobTypeEdit from './LobTypeEdit';
import LobTypeTable from './components/LobTypeTable';
import { WrapTable } from './Styled';
import LobTypeAdd from './LobTypeAdd';
import { useNavigate } from 'react-router-dom';

const LobbyTypeContent = (p) => {
  const { data, isModalAddLT, LTmodalOption } = p
  const {
    fetchLobType,
  } = useContext(LobbyTypeContext);
  const [editData, setEditData] = useState();
  const [isLobTypeEditDisplay, setIsLobTypeEditDisplay] = useState(false);
  // const testData = data || [];
  // const pagination = usePagination(testData, 9);
  const navigate = useNavigate()

  const handleEditButton = (value) => {
    console.log(value)
    setIsLobTypeEditDisplay(true);
    setEditData(value);
  };

  const handleLobTypeClick = (value) => {
    console.log(value)
    navigate(value.id)
  };

  return (
    <Fragment>
      <WrapTable>
        <LobTypeTable
          data={data}
          handleEditButton={handleEditButton}
          handleLobTypeClick={handleLobTypeClick}
        />
        {/* <PagePagination pagination={pagination} handleGetLTID={handleGetLTID}/> */}
      </WrapTable>
      {isLobTypeEditDisplay && (
        <LobTypeEdit
          setIsLobTypeEditDisplay={setIsLobTypeEditDisplay}
          editData={editData}
          fetchLobType={fetchLobType}
        />
      )}

      {isModalAddLT && 
        <LobTypeAdd
          modalOption={LTmodalOption}
          editData={editData}
          fetchLobType={fetchLobType}
          
        />
      }
    </Fragment>
  );
};

export default LobbyTypeContent;
