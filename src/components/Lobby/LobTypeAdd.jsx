import { useContext, useState } from "react";
import { createLobType } from "../../api/lobby.api";
import { EditBlock, TableInput, TypeTableCancelAndSave } from "./Styled";
import EditLobTypeInput from "./components/CreateTypeEditInput";
import { toast } from 'react-toastify';
import { LobbyTypeContext } from "../../pages/LobType";


const LobTypeAdd = (p) => {
  const { modalOption } = p;

  const {
    setLobTypeData,
  } = useContext(LobbyTypeContext);
  
  const [inputValue, setInputValue] = useState({
    type_name: "",
    max_table_count: "",
    min_table_price: "",
    deposit_percent: "",
  });

  const handleCancelButton = () => {
    modalOption.close();
  };

  const handleInput = (value, name) => {
    if (name === "type_name") {
      setInputValue({ ...inputValue, [name]: value.replace(/[^A-Za-z]/g, '') });
    } else if (typeof value === 'string' && /^\d+$/.test(value)) {
      if (name === "max_table_count" || name === "min_table_price" || name === "deposit_percent") {
        setInputValue({ ...inputValue, [name]: parseInt(value) });
      } else {
        setInputValue({ ...inputValue, [name]: value });
      }
    } else if (value === "") {
      setInputValue({ ...inputValue, [name]: value });
    }
  };

  const handleSaveButton = async () => {
    try {
      console.log(inputValue)
      const res = await createLobType(inputValue);
      const newData = res.data
      setLobTypeData(prev => [newData, ...prev])
      modalOption.close();
      
      toast.success(`${res.data.type_name} created!`)
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <EditBlock>
      <TableInput className="Type">
        <h4>Thêm bàn` </h4>
        <EditLobTypeInput handleInput={handleInput} inputValue={inputValue} />
        <TypeTableCancelAndSave className="Type">
          <button className="button buttonCancel" onClick={handleCancelButton}> Cancel </button>
          <button className="button buttonSave" onClick={handleSaveButton}>Save </button>
        </TypeTableCancelAndSave>
      </TableInput>
    </EditBlock>
  );
};

export default LobTypeAdd;
