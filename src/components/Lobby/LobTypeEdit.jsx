import { useEffect, useState } from "react";
import { updateLobType, deleteLobType } from "../../api/lobby.api";
import { EditBlock, TableInput, TypeTableCancelAndSave } from "./Styled";
import EditLobTypeInput from "./components/CreateTypeEditInput";
import { ToastContainer, toast } from 'react-toastify';

const LobTypeEdit = (p) => {
  const { setIsLobTypeEditDisplay, editData, fetchLobType } = p
  const lobTypeID = editData.id
  const [inputValue, setInputValue] = useState({
    type_name: editData.type_name,
    max_table_count: Number(editData.max_table_count),
    min_table_price: Number(editData.min_table_price),
    deposit_percent: Number(editData.deposit_percent),
  });

  const handleCancelButton = () => {
    setIsLobTypeEditDisplay(false);
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
      await updateLobType(lobTypeID, inputValue);
      await fetchLobType();
      setIsLobTypeEditDisplay(false);
    } catch (error) {
      toast.error(error.message)
    }
  };

  const handleDeleteButton = async () => {
    try {
      await deleteLobType(lobTypeID)
      await fetchLobType();
      setIsLobTypeEditDisplay(false);
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    setInputValue({
      type_name: editData.type_name,
      max_table_count: Number(editData.max_table_count),
      min_table_price: Number(editData.min_table_price),
      deposit_percent: Number(editData.deposit_percent),
    });
  }, [editData]);

  return (
    <EditBlock>
      <TableInput className="Type">
        <h4>Sửa bàn</h4>
        <EditLobTypeInput handleInput={handleInput} inputValue={inputValue} />
        <TypeTableCancelAndSave className="Type">
          <button className="button buttonDelete" onClick={handleDeleteButton}>Delete </button>
          <button className="button buttonCancel" onClick={handleCancelButton}> Cancel </button>
          <button className="button buttonSave" onClick={handleSaveButton}>Save </button>
        </TypeTableCancelAndSave>
      </TableInput>
    </EditBlock>
  );
};

export default LobTypeEdit;
