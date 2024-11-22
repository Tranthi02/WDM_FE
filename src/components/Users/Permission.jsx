import { useEffect, useState } from "react";
import { createRole } from "../../api/privilege.api";
import { PermissionBlock, PermissionForm, PermissionCancelandSave, PermissionInput } from "./Styled";
const Permission = (p) => {
  const { display, setIsDisplayPermissionBlock, setPermissionAccount, setIsFetch } = p
  const [inputValue, setInputValue] = useState();
  const handleCancelButton = () => {
    setIsDisplayPermissionBlock("none");
  }
  const handleSaveButton = async () => {
    await createRole(inputValue, []);

    const newRole = [inputValue, false, false, false, false, false]
    
    setPermissionAccount(prev => {
      return [
        ...prev.slice(0, 1), // Include the first element
        newRole,             // Insert newRole next
        ...prev.slice(1)
      ];
    })
    setIsFetch(Math.random())
    setInputValue("")
    setIsDisplayPermissionBlock("none");
  }
  const handleInput = (e) => {
    setInputValue(e.target.value);
  }
  useEffect(() => {
    setInputValue("")
  }, [])
  return (
    <PermissionBlock display={display}>
      <PermissionForm>
        <h4 className="formTitle">Add new Role</h4>
        <PermissionInput>
          <p className="inputTitle">Role : </p>
          <div className="input">
            <input
              value={inputValue}
              onChange={(e) => { handleInput(e) }}
            ></input>
          </div>
        </PermissionInput>
        <PermissionCancelandSave>
          <button
            className="buttonCancel"
            onClick={handleCancelButton}
          >
            Cancel
          </button>
          <button
            className="buttonSave"
            onClick={handleSaveButton}
          >
            Save
          </button>
        </PermissionCancelandSave>
      </PermissionForm>
    </PermissionBlock>
  )
}

export default Permission;