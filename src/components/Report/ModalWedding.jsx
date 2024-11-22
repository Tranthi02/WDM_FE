import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { formatVND } from "../../utils"

// Component to render individual bills
const BillItem = (p) => {
  const { bill, isExtraFee } = p


    return (
  <ListItem>
    <div className="left">
      <div className="item">
        <span className="title">Payment Date:</span> <span className="value">{new Date(bill.payment_date).toLocaleDateString()}</span><br />
      </div>
      <div className='item'><span className="title">Service:</span> <span className="value"> {formatVND(bill.service_total_price)}</span></div>
      <div className='item'><span className="title">Food:</span> <span className="value">{formatVND(bill.food_total_price)}</span></div>
     {isExtraFee && <div className='item'><span className="title">Extra Fee:</span> <span className="value" style={{color: "red", fontWeight: "600"}}>{formatVND(bill.extra_fee)}</span></div>}
      <div className='item'><span className="title">Total:</span> <span className="value" style={{color: "#3f59fd", fontWeight: "600"}}>
      {formatVND(isExtraFee? bill.total_price + bill.extra_fee : bill.total_price)}
      </span></div>
    </div>
    <div className="right">
    <div className="item">  <span className="title">Deposit Amount:</span> <span className="value " style={{color: "green", fontWeight: "600"}}>
    {formatVND(bill.deposit_amount)}
    </span></div>
    <div className="item">  <span className="title">Remaining Amount:</span> <span className="value" style={{color: "#868606", fontWeight: "600"}}>
      {formatVND(bill.remain_amount)}
    </span></div>
    </div>
  </ListItem>
  )
};

// Main component to render the wedding and its bills
const WeddingCard = (p) => {
  const { wedding, isExtraFee } = p

  const [isShowBill, setIsShowBill] = useState(false)
  const [totalBill, setTotalBill] = useState({
    total: 0,
    food: 0,
    service: 0
  })
  
  const handleClickBtnShowBill = () => {
    setIsShowBill(!isShowBill)
  }

  const getStatusStyle = (status) => {
    switch(status){
      case 'paid': 
        return "green"
      case 'deposit': 
        return "red"
      case 'pending': 
        return "#868606"

    }
  }

  useEffect(() => {
    let total = 0
    let food = 0
    let service = 0
    if(wedding.Bill.length > 0) {
      const data = wedding.Bill.reduce((mainBill, currentBill) => (mainBill.payment_date < currentBill.payment_date ? currentBill : mainBill ), wedding.Bill[0])
      isExtraFee 
      ? total = data.total_price + data.extra_fee
      : total = data.total_price
      
      food = data.food_total_price
      service = data.service_total_price
    }

    setTotalBill({
      total,
      food,
      service
    })
  }, []);


  return (
    <Card>
      <Title>
        <span>Mr <span style={{color: "blue"}}>{wedding.groom}</span> & Miss <span style={{color: "pink" }}>{wedding.bride}</span> </span>
        <span className='status'>
          <span >Status: </span> 
          <span style={{ color: getStatusStyle(wedding.status)}}>{wedding.status}</span>
        </span>
      </Title>
      {/* <Info><span className='title'>Date: </span>{new Date(wedding.wedding_date).toLocaleDateString()}</Info> */}
      <Table>
        <tbody>
          <tr>
            <th>Phone:</th>
            <td>{wedding.Customer.phone}</td>
          </tr>
          <tr>
            <th>Lobby:</th>
            <td>{wedding.Lobby.name}</td>
          </tr>
          <tr>
            <th>Table Count:</th>
            <td>{wedding.table_count}</td>
          </tr>
          <tr>
            <th>Note:</th>
            <td>{wedding.note}</td>
          </tr>
          <tr>
            <th>Food Total:</th>
            <td style={{color: "blue", fontWeight: "600"}}>{formatVND(totalBill.food)}</td>
          </tr>
          <tr>
            <th>Service Total:</th>
            <td style={{color: "blue", fontWeight: "600"}}>{formatVND(totalBill.service)}</td>
          </tr>
          <tr>
            <th>Total:</th>
            <td style={{color: "blue", fontWeight: "600"}}>{formatVND(totalBill.total)}</td>
          </tr>
        </tbody>
      </Table>
      <div className='bill-header'>
        <h3 style={{ fontSize: "1.2rem", fontWeight: "700"}}>Bills:</h3>
        <button className={`show_bill_btn ${isShowBill ? "active" : ""}`}  onClick={handleClickBtnShowBill}>{isShowBill? "Hide": "Show" }</button>  
      </div>
      <List>
        {isShowBill && wedding.Bill.map(bill => (
          <BillItem key={bill.id} bill={bill} isExtraFee={isExtraFee} />
        ))}
      </List>
    </Card>
  );
};

// Styled components
const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 20px;
  margin: 20px;
  transition: all .2s linear;

  &:hover {
    scale: 1.01;
  }

  .bill-header {
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    align-items: center;
    margin-bottom: 10px;

    .show_bill_btn {
      cursor: pointer;
      border-radius: 6px;
      width: 60px;
      font-weight: 700;
      padding: 4px 6px;
      background-color: #501dff;
      color: white;


      &.active {
        background-color: #dddddd;
        color: black;

      }
    }
  }
`;

const Title = styled.div `
  color: #333;
  font-size: 24px;
  font-weight: 600;
  text-transform: capitalize;
  display: flex;
  justify-content: space-between;

  .status {
    font-size: 1rem;
  }
`;

const Info = styled.p`
  color: #666;
  font-size: 16px;

  .title {
    font-weight: 600;
  }
`;

const Table = styled.table`
  width: 100%;
  color: #666;
  font-size: 16px;

  th {
    text-align: left;
    font-weight: 600;
  }

  td {
    padding: 8px 0;  // Adjust padding as needed
  }
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;


`;

const ListItem = styled.li`
  padding: 10px;
  justify-content: space-around;
  border-bottom: 1px solid #eee;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  gap: 19px;
  transition: all .2s linear;

  &:hover {
    scale: 1.01;
  }
  .item {
    padding: 8px 0;
    .title {
      font-weight: 600;
    }
  
    .value {
  
    }
  }
`;

export default WeddingCard;
