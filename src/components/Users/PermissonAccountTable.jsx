import { Checkbox } from "./Styled";
import { Icon } from "../../assets/icon";
import { deleteRole } from "../../api/privilege.api";

export const PermissonAccountTable = (p) => {
  const { className, data, action, getRoleIdByName, setIsFetch } = p

  const handleDeleteRole = async(data) => {
    try {
      const roleID = await getRoleIdByName(data[0])
      await deleteRole(roleID)
      setIsFetch(Math.random())
    } catch (error) {
      alert(error.message)
    }
  }

  const renderTableRows = () => {
    return data.slice(1).map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.map((cell, cellIndex) => {
          if (cellIndex === 0) return <td key={cellIndex}>{cell}</td>;
          return (
            <td key={cellIndex}>
              <Checkbox
                onChange={() => action(rowIndex, cellIndex)}
                type="checkbox"
                id="myCheckbox"
                checked={cell}
                disabled={row[0] === "Admin"}
              />
            </td>
          );
        })}
        <td style={{ width: "5vw" }} >
          <Icon.delete style={{ cursor: "pointer" }} onClick={() => handleDeleteRole(row)}/>
        </td>
      </tr>
    ));
  };

  return (
    <table className={className}>
      <thead>
        <tr>
          {data && data.length > 0 && data[0].map((header, index) => (
            <th key={index}>{header}</th>
          ))}
          <th style={{ width: "5vw" }}></th> 
        </tr>
      </thead>
      <tbody>{renderTableRows()}</tbody>
    </table>
  );
};
