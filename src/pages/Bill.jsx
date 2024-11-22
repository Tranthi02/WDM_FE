import { useEffect,  useMemo,  useState } from 'react';

import {  TextInput, TextRow, Radio } from '../components';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';

import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components';
import styled from 'styled-components';

import { Form, Input, Checkbox, Button, DatePicker, Select, message, Modal } from 'antd';

const { Option } = Select;

import { depositOrder, fullPayOrder, getBill, getExtraFee, getWeddingById, togglePenalty } from '../api/wedding.api';
import Wrapper from '../assets/wrappers/Order/PaymentWrapper';
import { formatVND, truncateUUID } from '../utils';
import { FaFilePdf } from 'react-icons/fa';
import BillPdf from '../components/Order/BillPdf';
import { PDFDownloadLink } from '@react-pdf/renderer';
import SpecificOrderTable from '../components/Order/SpecificOrderTable';
import Loading from '../components/Loading';
import { PlusOutlined } from '@ant-design/icons';
import { customerInfo, weddingInfo } from '../utils/billTable';

const Bill = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [orderData, setOrderData] = useState({});
    const [bill, setBill] = useState({});
    const [loading, setLoading] = useState(true);

    const handleBackBtn = () => {
        navigate(`/dashboard/order/${id}`, { replace: true });
    };


    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                setLoading(true);
                const resWedding = await getWeddingById(id, true);
                const resBill = await getBill(id);
                setBill(resBill.data)
                setOrderData(resWedding.data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderData();
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    return (
        <Container>
            <Header
                handleAddBtnClick={() => {}}
                headerTitle={`Bill`}
                action={false}
                isBack={true}
                handleBackBtn={handleBackBtn}
            />
            <ToastContainer 
                position="bottom-center"
                autoClose={1000}
            />
            <div className="content-wrapper">
                {orderData && (
                    <Content orderData={orderData} setOrderData={setOrderData} bill={bill}/>
                )}
            </div>
        </Container>
    );
};

const Content = (p) => {
    const { orderData, bill, setOrderData } = p

    const [customerData] = useState({
        groom: orderData.groom,
        bride: orderData.bride,
        note: orderData.note,
        phone: orderData.Customer.phone,
    })

    const [billInfo, setBillInfo] = useState({
        table_count: Number(orderData.table_count),
        wedding_date: orderData.wedding_date,
        lobby: orderData.Lobby.name,
        shift: orderData.Shift.name,
        payment_date: orderData.Bill.length > 0 ? (orderData.Bill[0].payment_date ): null,
        service_total_price: bill.servicePrice,
        food_total_price: bill.foodPrice,
        extra_fee: bill.extraFee,
        total_price: bill.totalPrice,
        remain_amount: bill.remainPrice,
        depositRequire: bill.depositRequire
    })


    const [checked, setChecked] = useState(orderData.is_penalty_mode);

    // Modal payment
    const [visible, setVisible] = useState(false);
  
    const showModal = () => {
      setVisible(true);
    };
  
    const handleCancel = () => {
      setVisible(false);
    };
  
    const handlePaymentSubmit = async (values) => {
        try {
            const res = await depositOrder(orderData.id, values.amount, values.paymentDate.$d)
            setBillInfo(prev => ({
                ...prev,
                remain_amount: res.data.remainPrice
            }))
            setVisible(false);
        } catch (error) {
            toast.warning(error.message)
        }
    };

    const onCheckPenal = async (e) => {
      setChecked(e.target.checked);
        try {
            const res = await togglePenalty(orderData.id)
            setBillInfo(prev => ({
                ...prev,
                total_price: res.data.total + res.data.extraFee,
                extra_fee: res.data.extraFee,
                remain_amount: res.data.remainPrice,
            }))
            setOrderData(prev => ({...prev, is_penalty_mode: e.target.checked}))
        } catch (error) {
            toast.error(error.message)
        }
    };

    // useEffect(() => {
    //     const fetchExtraFee = async() => {
    //         try{
    //            const res = await getExtraFee(orderData.id)
    //            setBillInfo(prev => ({...prev, extra_fee: res.data, total_price: res.data+prev.total_price}))
    //         } catch (error) {
    //             toast.error(error.message)
    //         }
    //     }
    //     orderData?.id && fetchExtraFee()
    // }, [orderData]);
    return (
        <Wrapper>
            <Modal
                title="Payment Form"
                open={visible}
                onCancel={handleCancel}
                footer={null}
                >
                <PaymentForm onPaymentSubmit={handlePaymentSubmit} />
            </Modal>
            <h4>
                <div>Order</div>
                <div>{truncateUUID(orderData?.id)}</div>
            </h4>
            <div className="container">
                <h5>Customer Information</h5>
                {customerData && <SpecificOrderTable orderData={customerData} renderData={customerInfo} />}
                <h5>Wedding Information</h5>
                {billInfo && <SpecificOrderTable orderData={billInfo} renderData={weddingInfo} isPenalty={orderData.is_penalty_mode}/>}
                <div className="more-info">
                    {/* <div className={`paid-date ${orderData?.extra_fee > 0 && 'red'}`}>
                        <span className="title">Paid Date:</span> 
                         <span>{billInfo?.payment_date}</span>
                    </div> */}
                    {orderData && customerData && billInfo && 
                    <PDFDownloadLink
                        className="pdf-export"
                        document={<BillPdf orderInfo={orderData} customerData={customerData} weddingData={billInfo} />}
                        fileName={`${orderData.groom}-${orderData.bride}.pdf`}
                    >
                        {({ loading }) =>
                            loading ? (
                                'Loading document...'
                            ) : (
                                <>
                                    Export to PDF <FaFilePdf />
                                </>
                            )
                        }
                    </PDFDownloadLink>}
                    <Checkbox checked={checked} onChange={onCheckPenal}>
                        Penalty
                    </Checkbox>
                </div>
               {Number(billInfo.remain_amount) > 0 && <button className="btn" onClick={showModal}>
                    Pay
                </button>}
            </div>
        </Wrapper>
    );
};


const PaymentForm = (p) => {
    const { onPaymentSubmit } = p
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      message.success('Payment processed successfully');
      onPaymentSubmit(values); // Pass payment details to parent component
    }, 1000);
  };

  return (
    <Form onFinish={handleSubmit} layout="vertical">
      <Form.Item
        name="amount"
        label="Amount"
        rules={[{ required: true, message: 'Please enter the payment amount' }]}
      >
        <Input prefix="đ" type="number" placeholder="Enter amount" />
      </Form.Item>
      {/* <Form.Item
        name="paymentMethod"
        label="Payment Method"
        rules={[{ required: true, message: 'Please select a payment method' }]}
      >
        <Select placeholder="Select a payment method">
          <Option value="creditCard">Credit Card</Option>
          <Option value="bankTransfer">Bank Transfer</Option>
          <Option value="cash">Cash</Option>
        </Select>
      </Form.Item> */}
      <Form.Item
        name="paymentDate"
        label="Payment Date"
        rules={[{ required: true, message: 'Please select a payment date' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      {/* <Form.Item name="notes" label="Notes">
        <Input.TextArea placeholder="Additional notes (optional)" />
      </Form.Item> */}
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit Payment
        </Button>
      </Form.Item>
    </Form>
  );
};

const Container = styled.div`
  height: 88vh;

  .content-wrapper {
    width: 100%;
    height: 100%;
    padding: 2.5rem;
  }
`;


export default Bill;
