import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

import { InformationBlock, InformationBoard, SaveButton } from "./Styled";
import { updateUserInfo } from "../../api/user.api";
import { register } from "../../api/auth.api";
import { updateRoleforUser, getRoles } from "../../api/privilege.api";
import { findUserByUserName } from "../../api/user.api";

const Information = (p) => {
  const {
    display,
    setIsDisplayInformationBlock,
    type,
    editrow,
    accountInformation,
    accountInformationInput,
    getRoleIdByName,
    setAccountInformation,
    roles
  } = p

  const [inputValue, setInputValue] = useState(accountInformationInput);
  const [tempData, setTempData] = useState({
    ID: "",
    DisplayName: "",
    UserName: "",
    Password: "",
    Role: accountInformationInput?.Role,
  });

  const [selectValue, setSelectValue] = useState(inputValue.Role);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isModified, setIsModified] = useState(false);
  // const [roles, setRoles] = useState([])

  const updateTempData = (name, data) => {
    setTempData(prevData => ({ ...prevData, [name]: data }));
  };

  const updateInput = (value) => {
    setInputValue(value);
    setIsModified(true)
  };

  const handleSaveButton = () => {
    type === "Edit" ? handleEditSave() : handleCreateSave();
  };

  const handleEditSave = async () => {
    const newData = [...accountInformation];
    try {
      newData[editrow] = Object.values(tempData).map((value, index) => value === '' ? newData[editrow][index] : value);
      // console.log(accountInformation)

      const roleID = await getRoleIdByName(tempData.Role)
      const userID = newData[editrow][0]
      
      const updateData = {}

      if(tempData.Password !== accountInformationInput.Password) {
        updateData.password = tempData.Password
      }

      if(tempData.Role !== accountInformationInput.Role) {
        updateData.role_id = roleID
      }

      if(tempData.DisplayName !== accountInformationInput.DisplayName) {
        updateData.display_name = tempData.DisplayName
      }

      console.log("newData[editrow]", updateData)

      // await updateRoleforUser(roleID, userID)
      await updateUserInfo(userID, updateData);
      setIsDisplayInformationBlock(false);
      setAccountInformation(newData)
    } catch (error) {
      toast.error(error.message);
    }

  };

  const handleCreateSave = async () => {
    try {
      await register(Object.values(tempData)[2], Object.values(tempData)[3], Object.values(tempData)[1]);
      setIsDisplayInformationBlock(false);
      const res = await findUserByUserName(Object.values(tempData)[2]);
      await updateRoleforUser(await getRoleIdByName(Object.values(tempData)[4]), res.data.id)
      tempData.ID = res.data.id
      tempData.Password = res.data.password
      
      // window.location.reload();
      const newUser = Object.values(tempData)

      setAccountInformation(prev => {
        const newResult = [
          ...prev.slice(0, 1), // Include the first element
          newUser,             // Insert newRole next
          ...prev.slice(1)
        ]
        return newResult
      })
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    updateTempData("Role", value);
    setSelectValue(value);
    setIsModified(true);
  };

  useEffect(() => {
    setTempData({
      ID: "",
      DisplayName: accountInformationInput.DisplayName,
      UserName: "",
      Password: "",
      Role: accountInformationInput.Role,
    })
    setIsModified(false);
    setInputValue(accountInformationInput);
    setSelectValue(accountInformationInput.Role);
  }, [display, accountInformationInput]);

  useEffect(() => {
    const editData = {
      Password: tempData.Password,
      Role: tempData.Role,
      DisplayName: tempData.DisplayName,
    }

    const originalData = {
      Password: accountInformationInput.Password,
      Role: accountInformationInput.Role,
      DisplayName: accountInformationInput.DisplayName,
    }

    console.log("editData", editData)
    console.log("originalData", originalData)
    if(JSON.stringify(editData) === JSON.stringify(originalData)) {
      setIsSaveDisabled(true);
    }
    else {
      setIsSaveDisabled(false);
    }

    // if (type === "Edit") {
    //   if (
    //     tempData.Role === accountInformationInput.Role && 
    //     tempData.DisplayName === accountInformationInput.DisplayName
    //   ) {
    //     setIsSaveDisabled(true);
    //   }
    //   else if (tempData.DisplayName === "") setIsSaveDisabled(true)
    //   else setIsSaveDisabled(false);
    // } else {
    //   setIsSaveDisabled(!(tempData.DisplayName && tempData.Password && tempData.Role && tempData.UserName));
    // }

    //  code phức tạp vl
  }, [type, tempData, inputValue]);

  // useEffect(() => {
  //   // getroles
  //   const processGetRoles = async () => {
  //     try {
  //       const res = await getRoles()

  //       setRoles(res.data)
  //     } catch (error) {
  //       alert(error.message)
  //     }
  //   }

  //   processGetRoles()
  // }, [])

  const renderInputs = () => {
    return (
      <tbody>
        <tr>
          <td className="informationTitle"><p>Name :</p> </td>
          <td>
            <input
              value={inputValue["DisplayName"]}
              onChange={(e) => {
                updateInput(e.target.value, "DisplayName");
                updateTempData("DisplayName", e.target.value);
              }}
            ></input>
          </td>
        </tr>
        <tr>
          <td className="informationTitle"><p>Username :</p> </td>
          <td>
            <input
              value={inputValue["UserName"]}
              onChange={(e) => {
                updateInput(e.target.value, "UserName");
                updateTempData("UserName", e.target.value);
              }}
              disabled={type === "Edit"}
            ></input>
          </td>
        </tr>
        <tr>
          <td className="informationTitle"><p>New Password :</p> </td>
          <td>
            <input
              value={inputValue["Password"]}
              onChange={(e) => {
                updateInput(e.target.value, "Password");
                updateTempData("Password", e.target.value);
              }}
              disabled={false}
            ></input>
          </td>
        </tr>
        <tr>
          <td className="informationTitle"><p>Role :</p></td>
          <td>
            <select value={selectValue} onChange={(e) => handleSelectChange(e)}>
              <option value="" disabled>Select an option</option>
              {roles && roles.map((role, idx) => {
                  return (
                    <option value={role.name} key={idx}>{role.name}</option>
                  )
                })
              }
            </select>
          </td>
        </tr>
      </tbody>
    );
  };

  return (
    <InformationBlock display={display.toString()}>
      <ToastContainer />
      <InformationBoard>
        <h4>Account Information</h4>
        <table className="boardInput">
          {renderInputs()}
        </table>
        <div className="cancelSaveCombination">
          <button className="cancelButton"
            onClick={async () => {
              setIsDisplayInformationBlock(false);
            }}>Cancel</button>
          <SaveButton
            onClick={handleSaveButton}
            disabled={isSaveDisabled}
          >
            Save
          </SaveButton>
        </div>
      </InformationBoard>
    </InformationBlock >
  );
};

export default Information;