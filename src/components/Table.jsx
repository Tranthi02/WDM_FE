import { useTable, useSortBy, usePagination } from 'react-table';
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDown,
  FaAngleUp,
} from 'react-icons/fa';
import resolveDate from '../utils/resolveDate';
import Wrapper from '../assets/wrappers/TableWrapper';
import resolveCurrency from '../utils/resolveCurrency';
import { truncateUUID } from '../utils';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { deleteWedding } from '../api/wedding.api';

const Table = (p) => {
  const { columns, data, handleRowClick, pagination, setOrderList } = p
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    nextPage,
    canNextPage,
    previousPage,
    canPreviousPage,
    state: { pageIndex },
    pageCount,
  } = useTable({ columns, data }, useSortBy, usePagination);
  


  const resolveCellClass = (cellValue) => {
    switch (cellValue) {
      case 'paid':
        return 'paid';
      case 'deposit':
        return 'deposit';
      case 'pending':
        return 'pending';
      default:
        return;
    }
  };

  const formatRenderDate = (date) => {
    const inputDate = new Date(date);
    const formattedDate = inputDate.toLocaleDateString();
  
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to midnight for accurate comparison
  
    const isPastDate = inputDate < today;
  
    return {
      formattedDate,
      isPastDate,
    };
  }

  const handleDelete = async (id) => {
    try {
      await deleteWedding(id)
      setOrderList(prev => prev.filter(order => order.id !== id));
    } catch (error) {
      toast.error(error.message)
    }
  }

  const DeleteButton = (p) => {
    const { id } = p
    return (
<Popconfirm
      title="Are you sure you want to delete this item?"
      onConfirm={() => handleDelete(id)}
      okText="Yes"
      cancelText="No"
    >
      <Button type="primary" danger icon={<DeleteOutlined />}>
        Delete
      </Button>
    </Popconfirm>
    )
  }
  

  return (
    <Wrapper>
      <table {...getTableBodyProps()}>
        <thead>
          {headerGroups.map((headerGroup, idx) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
              {headerGroup.headers.map((column, idx) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} key={idx}>
                  {column.render('Header')}
                  {column.isSorted && (
                    <span className="sort-icon">
                      {column.isSortedDesc ? <FaAngleDown /> : <FaAngleUp />}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableProps()}>
          {page.map((row) => {
            prepareRow(row);
            console.log(row.values.status)
            return (
              <tr
                {...row.getRowProps()}
                className={handleRowClick && 'can-click'}
                key={row.id}  // It's better to use a unique identifier for the row if available
              >
                {row.cells.map((cell, idx) => {
                  let renderData = cell.value
                  let isPast = false
                  if(cell.column.id.includes('date')) {
                    const {formattedDate, isPastDate} = formatRenderDate(cell.value)
                    renderData = formattedDate
                    isPast = isPastDate

                  } else if(cell.column.id === "id" ) {
                    renderData = truncateUUID(cell.value)
                  }

                return (
                  <td
                    {...cell.getCellProps()}
                    className={resolveCellClass(cell.value)}
                    title={cell.column.id === 'customerName' ? cell.value : ''}
                    key={idx}  // Adding the key here
                    style={isPast && row.values.status!=="paid" ? {color: "red"} : {}}
                  >
                    {renderData}
                    {resolveCurrency(cell.column.id)}
                  </td>
                )})}
                <td>
                  <Button type="primary" icon={<EditOutlined />} onClick={() => handleRowClick(row.original)}>
                    Edit
                  </Button>
                </td>
                <td>
                  <DeleteButton id={row.values.id}/>
                </td>
              </tr>
            );
          })}

        </tbody>
      </table>
      {pagination && (
        <div className="page-group">
          <button disabled={!canPreviousPage} onClick={previousPage}>
            <FaAngleLeft />
          </button>
          <span>
            {pageIndex + 1} of {pageCount}
          </span>
          <button disabled={!canNextPage} onClick={nextPage}>
            <FaAngleRight />
          </button>
        </div>
      )}
    </Wrapper>
  );
};



export default Table;
