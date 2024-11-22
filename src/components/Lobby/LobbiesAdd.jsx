import { EditBlock, TableInput, TypeTableCancelAndSave } from "./Styled";
import AddLobbiesForm from "./components/AddLobbiesForm";
import { useContext, useState } from "react";
import { createLobby } from "../../api/lobby.api";
import { toast } from 'react-toastify';
import { LobbyContext } from "../../pages/Lobby";


const LobbiesAdd = () => {

  const { lobTypeID, setLobbyList, modalOption } = useContext(LobbyContext);

  const [inputValue, setInputValue] = useState({
    name: ""
  });
  const handleCancelButton = () => {
    modalOption.close()
  }

  const handleSaveButton = async () => {
    try {
      const createData = {
        "name": inputValue.name.trim(),
        "lob_type_id": lobTypeID
      }
      const res = await createLobby(createData)

      setLobbyList(prev => ([...prev, res.data]))
      modalOption.close()

    } catch (error) {
      toast.success(error.message)
    }
  }


  return (
    <EditBlock onClick={(e) => { e.stopPropagation(); console.log(123) }}>
      <TableInput className="TypeInform">
        <h4 className="TypeInform">Add Lobby</h4>
        <AddLobbiesForm
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <TypeTableCancelAndSave className="TypeInform">
          <button className="button buttonCancel" onClick={handleCancelButton}> Cancel </button>
          <button className="button buttonSave" onClick={() => handleSaveButton()}>Save </button>
        </TypeTableCancelAndSave>
      </TableInput>
    </EditBlock>
  )
}

export default LobbiesAdd;