import { useOrderContext } from '../../pages/Order';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import resolveDate from '../../utils/resolveDate';
import resolveCurrency from '../../utils/resolveCurrency';
import Wrapper from '../../assets/wrappers/Order/SpecificOrderTableWrapper';
import { weddingInfo } from '../../utils/billTable';
import { formatVND } from '../../utils';
import { format } from 'date-fns';
import { useState } from 'react';

const SpecificOrderTable = (p) => {
  const { orderData, renderData, isPenalty=true } = p
  console.log(orderData)
  const calculateLateFee = (totalPrice, weddingDate, paymentDate=new Date() ) => {
    const wedding = new Date(weddingDate);
    const payment = new Date(paymentDate);
  
    if (payment <= wedding) {
      return totalPrice; // No late fee if payment is on or before the wedding date
    }
  
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const daysLate = Math.floor((payment.getTime() - wedding.getTime()) / millisecondsPerDay);
  
    const lateFeePercentage = daysLate * 0.01;
  
    return lateFeePercentage;
  };
  
  return (
    <Wrapper>
      <table className="table">
        {renderData.map(({title, key, type}, index) => {
        if(!isPenalty && key==="extra_fee") return null
        return (
          <tr 
            className="row" key={index} 
            style={
              key==="extra_fee" && Number(orderData["extra_fee"]) > 0 ?{color: "red"}:{}
            }>
            <td className={`cell`}>{index + 1}</td>
            <td className={`cell`}>{title}</td>
            <td className={`cell`}>
              <span>{
                type ==="concurrency" ? formatVND(orderData[key]):
                type ==="date" ? format(new Date(orderData.wedding_date), 'MM/dd/yyyy'): 
                orderData[key]
              }</span>
              <span style={{ fontSize: "0.7rem" }}>
                {key === "extra_fee" && Number(orderData["extra_fee"]) > 0 && (
                  ` (${calculateLateFee(orderData.total_price, orderData.wedding_date).toFixed(2)})`
                )}
              </span>
            </td>
            
          </tr>
        )
        }
        )}
      </table>
    </Wrapper>
  );
};
export default SpecificOrderTable;
