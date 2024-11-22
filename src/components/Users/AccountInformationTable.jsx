import { Icon } from "../../assets/icon";
import { deleteUser } from "../../api/user.api";
import { truncateUUID } from "../../utils"

export const AccountInformationTable = (p) => {
  const { className, data, deleteRow, editRow, preData } = p
  const handleEdit = (row) => {
    editRow(preData.indexOf(row));
  };

  const handleDelete = (row) => {
    deleteRow(preData.indexOf(row));
    deleteUser(row[0]);
  };

  const renderTableHeader = () => (
    <thead>
      <tr>
        {data[0].map((header, index) => {
        if(index !== 3) // exclude password field
        return (
          <th key={index}>{header}</th>
        )})}
        <th className="empty"></th>
        <th className="empty"></th>
      </tr>
    </thead>
  );

  const renderTableBody = () => (
    <tbody>
      {data.slice(1).map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((cell, cellIndex) => {
            let renderData = cell
            if(cellIndex == 0) {
              renderData = truncateUUID(cell)
            } else if(cellIndex == 3) {//exclude password
              return null;
            }
            return (
            <td key={cellIndex}>{renderData}</td>
          )})}
          <td className="pencilIcon" onClick={() => handleEdit(row)}>
            <Icon.pencil />
          </td>
          <td className="deleteIcon" onClick={() => handleDelete(row)}>
            <Icon.delete />
          </td>
        </tr>
      ))}
    </tbody>
  );

  return (
    <table className={className}>
      {renderTableHeader()}
      {renderTableBody()}
    </table>
  );
};
