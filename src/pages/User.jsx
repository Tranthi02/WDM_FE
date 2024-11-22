import { useEffect, useState } from "react";
import SearchBox from "../components/SearchBox";
import Information from "../components/Users/Information";
import Permission from "../components/Users/Permission";
import { UserBlock, StyledAccountInformationTable, StyledPermissionAccountTable } from "../components/Users/Styled";
import { getUsers } from "../api/user.api";
import { getRoles } from "../api/privilege.api";
import { Icon } from "../assets/icon";
import { updatePermissionForRole, removePermissionFromRole } from "../api/privilege.api";
import styled from "styled-components";
import { Header } from "../components";

const User = () => {
  const [isDisplayInfomationBlock, setIsDisplayInformationBlock] = useState(false);
  const [isDisplayPermissionBlock, setIsDisplayPermissionBlock] = useState("none")
  const [permissionAccount, setPermissionAccount] = useState([
    ["Account Groups", "Lobby", "Order", "Food & Service", "Report", "User"],
  ]);
  const [roles, setRoles] = useState();
  const [accountInformation, setAccountInformation] = useState([
    ["ID", "Display Name", "Username", "Password", "Role"],
  ]);
  const [accountInformationTableFilter, setAccountInformationTableFilter] = useState(accountInformation);
  const [accountInformationInput, setAccountInformationInput] = useState({
    ID: "",
    DisplayName: "",
    UserName: "",
    Password: "",
    Role: "",
  });
  const [boardType, setBoardType] = useState("");
  const [row, setRow] = useState();
  const [searchValue, setSearchValue] = useState();
  const [isFetch, setIsFetch] = useState(Math.random())

  const getRoleIdByName = async (name) => {
    const rolesData = await getRoles()
    const role = rolesData.data.find((value) => value.name === name);
    return role ? role.id : null;
  };

  const getPermissionsIdByName = (name) => {
    const PermissionsId = {
      "Report": "perm1",
      "User": "perm2",
      "Lobby": "perm3",
      "Order": "perm4",
      "Food & Service": "perm5"
    }
    return PermissionsId[name];
  }

  const updateRolePermission = async (rowIndex, cellIndex) => {
    const newPermissionAccount = [...permissionAccount];
    newPermissionAccount[rowIndex + 1][cellIndex] = !permissionAccount[rowIndex + 1][cellIndex];
    setPermissionAccount(newPermissionAccount);

    const roleId = await getRoleIdByName(permissionAccount[rowIndex + 1][0]);
    const permissionId = getPermissionsIdByName(permissionAccount[0][cellIndex]);

    const permission = permissionAccount[rowIndex + 1][cellIndex];

    if (permission) {
      await updatePermissionForRole(roleId, permissionId);
    } else {
      await removePermissionFromRole(roleId, permissionId);
    }
  };

  const handlePermissionCreate = () => {
    setIsDisplayPermissionBlock("flex");
  }


  const handleInformationCreate = () => {
    setIsDisplayInformationBlock(true);
    setBoardType("Create");
    setAccountInformationInput({
      ID: "",
      DisplayName: "",
      UserName: "",
      Password: "",
      Role: "",
    });
  };

  const deleteInformation = (row) => {
    if (window.confirm("Bạn muốn xóa?")) {
      const newAccountInformation = [...accountInformation];
      newAccountInformation.splice(row, 1);
      setAccountInformation(newAccountInformation);
    }
  };

  const editInformation = (row) => {
    setBoardType("Edit");
    setIsDisplayInformationBlock(true);
    const rowData = accountInformation[row];
    setAccountInformationInput({
      ID: rowData[0],
      DisplayName: rowData[1],
      UserName: rowData[2],
      Password: rowData[3],
      Role: rowData[4],
    });
    setRow(row);
  };

  const handleSearchBox = (value) => {
    if (typeof value === 'string') {
      const trimmedValue = value.trim();
      setSearchValue(trimmedValue);

      
    }
  };

  const fetchPermissionsAccount = async () => {
    try {
      const res = await getRoles();
      if (res && res.data) {
        setRoles(res.data);
        const data = res.data;
        const tempPermission = [];
        tempPermission.push(["Account Groups", "Lobby", "Order", "Food & Service", "Report", "User"])
        const pages = ["lobby", "order", "food_service", "report", "user"];
        data.forEach((role) => {
          let subArray = [];
          subArray.push(role.name);
          pages.forEach((page) => {
            const hasPermission = role.permissions.some(permission => permission.page === page);
            subArray.push(hasPermission);
          });
          tempPermission.push(subArray);
        });
        setPermissionAccount(tempPermission);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }


  const fetchDataAccountInformation = async () => {
    try {
      const res = await getUsers();
      if (res && res.data) {
        const data = res.data;
        const tempAccountInformation = [];
        tempAccountInformation.push(["ID", "Display Name", "Username", "Password", "Role"])
        data.forEach((value) => {
          let subArray = [];
          subArray.push(
            value["id"],
            value["display_name"],
            value["username"],
            "",
            value["role"],
          );
          tempAccountInformation.push(subArray);
        });
        setAccountInformation(tempAccountInformation);
      } else {
        console.log('nodata');
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchPermissionsAccount();
    fetchDataAccountInformation();
    return;
  }, [isFetch]);

  const checkRow = (row, searchValue) => {
    return row.some(cell => {
      if (typeof cell === 'string' && typeof searchValue === 'string') {
        return cell.toLowerCase().includes(searchValue.toLowerCase());
      }
    });
  };

  useEffect(() => {
    if (!searchValue) {
      setAccountInformationTableFilter(accountInformation);
    } else {
      const filteredData = accountInformation.slice(1).filter(row => checkRow(row, searchValue));
      filteredData.unshift(accountInformation[0]);
      setAccountInformationTableFilter(filteredData);
    }
  }, [searchValue, accountInformation]);

  return (
    <Container>
      <Header
        handleAddBtnClick={() =>{}}
        headerTitle={'User'}
        handleSearch={() => {}}
        action={false}
      />

     <Content>
        <UserBlock>
          <div className="blockTitle">
            <h4 className="title" onClick={() => console.log(accountInformation)}>
              Permissions of account groups
            </h4>
            <div className="plus">
              <Icon.plus className="iconPlus" onClick={handlePermissionCreate}></Icon.plus>
            </div>
          </div>
          <StyledPermissionAccountTable data={permissionAccount} action={updateRolePermission} getRoleIdByName={getRoleIdByName} setIsFetch={setIsFetch}/>
          <Permission setIsFetch={setIsFetch} display={isDisplayPermissionBlock} setIsDisplayPermissionBlock={setIsDisplayPermissionBlock} setPermissionAccount={setPermissionAccount}/>
          <div className="TitleSearchCombination">
            <div className="blockTitle">
              <h4 className="title" onClick={() => console.log(accountInformation)}>
                Account Information
              </h4>
              <div className="plus">
                <Icon.plus className="iconPlus" onClick={handleInformationCreate}></Icon.plus>
              </div>
            </div>
            <SearchBox handleSearch={handleSearchBox} />
          </div>
          <StyledAccountInformationTable
            data={accountInformationTableFilter}
            preData={accountInformation}
            deleteRow={deleteInformation}
            editRow={editInformation}
          />
          <Information
            display={isDisplayInfomationBlock}
            setIsDisplayInformationBlock={setIsDisplayInformationBlock}
            type={boardType}
            editrow={row}
            accountInformation={accountInformation}
            setAccountInformation={setAccountInformation}
            accountInformationInput={accountInformationInput}
            getRoleIdByName={getRoleIdByName}
            roles={roles}
          />
        </UserBlock>
     </Content>
    </Container>
  );
};

export default User;

const Container = styled.div`
  /* height: 100vh;
  width: 100vw; */
`
const Content = styled.div`
  height: 88vh;
`
