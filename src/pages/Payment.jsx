import { useEffect,  useState } from 'react';

import {  TextInput, TextRow, Radio } from '../components';

import { ToastContainer, toast } from 'react-toastify';

import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components';
import styled from 'styled-components';

import { Input } from 'antd';


import { depositOrder, fullPayOrder, getWeddingById } from '../api/wedding.api';
import { paymentOverall, paymentOption } from '../utils/orderRenderArr';
import Wrapper from '../assets/wrappers/Order/PaymentWrapper';
import { truncateUUID } from '../utils';



const Payment = () => {

    const navigate = useNavigate();
    const { id } = useParams()
    
    const [orderData, setOrderData] = useState([])

    const handleBackBtn =() => {
        navigate(`/dashboard/order/${id}`, { replace: true });
    }

//   if(loading) {
//     return <Loading />
//   }

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const res = await getWeddingById(id, true)
                setOrderData(res.data)
            } catch (error) {
                toast.error(error.message)
            }
        }

        fetchOrderData()
    }, []);

  return (
    <Container>
      <Header
        handleAddBtnClick={() => {}}
        headerTitle={`Payment`}
        action={false}
        isBack={true}
        handleBackBtn={handleBackBtn}
      />
      <ToastContainer 
        position="bottom-center"
        autoClose={1000}
        />
        <div className="content-wrapper">
            <Content
                orderData={orderData}
                setOrderData={setOrderData}
            />
        </div>
    </Container>
  );
};

const Content = (p) => {
    const {
        orderData,
        setOrderData,
    } = p
    const [payValue, setPayValue] = useState(orderData.requiredDeposit);
    const [payOption, setPayOption] = useState('deposit');

    const handleOptionChange = (value) => {
    setPayOption(value);
    setPayValue(
        value === 'deposit' ? orderData.requiredDeposit : orderData.total
    );
    };

    const handleNextBtnClick = async () => {
    let result;
    try {
        if (payOption === 'deposit')
        result = await depositOrder(orderData.id, Number(payValue));
        if (payOption === 'full')
        result = await fullPayOrder(orderData.id, Number(payValue));
        if (result.data.msg) throw new Error(result.data.msg);
        setOrderData({
        ...result.data,
        ...result.data.weddingData,
        phone: orderData.phone,
        lobby_name: orderData.lobby_name,
        });
    } catch (error) {
        alert(error.message);
    }
    };

    useEffect(() => {
    const requiredDeposit =
        (Number(orderData.deposit_percent) / 100) * Number(orderData.total);
    setOrderData({
        ...orderData,
        requiredDeposit,
    });
    setPayValue(requiredDeposit);
    }, []);

    return (
    <Wrapper>
        <h4>Order: {truncateUUID(orderData.id)}</h4>
        <div className="container">
            <div className="overall">
            <h5>overall</h5>
            {paymentOverall.map(({ title, key }) => (
                <TextRow
                title={title}
                keyValue={key}
                key={key}
                value={orderData?.[key]}
                />
            ))}
            <TextRow
                title="total"
                value={orderData.total}
                keyValue={'remainder'}
            />
            </div>
            <div className="payment">
            <h5>payment option</h5>
            {paymentOption.map(({ key, value, title }) => (
                <Radio
                key={value}
                title={title}
                keyValue={key}
                value={value}
                handleChange={() => handleOptionChange(value)}
                currValue={payOption}
                />
            ))}
            <h5>pay remainder</h5>
            <TextInput
                keyValue="payRemainder"
                value={payValue}
                handleChange={(e) => setPayValue(e.target.value)}
            />
            </div>
        </div>
        <button className="btn" onClick={handleNextBtnClick}>
            next: review
        </button>
    </Wrapper>
    );
}

const Container = styled.div`
  height: 88vh;

    .content-wrapper {
        width: 100%;
        height: 100%;
        padding: 2.5rem;
    }
`


export default Payment;
