import { useEffect, useMemo, useRef, useState } from 'react';
import { FaPenToSquare } from 'react-icons/fa6';
import { Modal, DatePick, TextInput, TextRow } from '../components';
import { editOrderLeft, editOrderRight } from '../utils/orderRenderArr';
import { ToastContainer, toast } from 'react-toastify';
import { editWedding, getWeddingById } from '../api/wedding.api';
import { truncateUUID } from '../utils';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components';
import styled from 'styled-components';
import PickFoodService from '../components/Order/OrderId/PickFoodService';

import Flatpickr from "react-flatpickr";
import { getLobbyTypes, getShifts } from '../api/lobby.api';
import { Input, Select, TreeSelect, InputNumber, Button } from 'antd';
import { Option } from 'antd/es/mentions';
import Loading from '../components/Loading';
import { InputField } from './NewOrder';
const { TextArea } = Input;


const OrderID = (p) => {
  const {
    handleEditLobbyClick,
  } = p
  const [orderData, setOrderData] = useState({})
  
  const [loading, setLoading] = useState(true)
  const [restrictedMode, setRestricted] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWedding = async (id) =>  {
      try {
        setLoading(true)
        const res = await getWeddingById(id, null, true)
        setOrderData(res.data)
        setLoading(false)
        const status = res.data.status
        console.log("status", res.data)
        if(status === "paid") setRestricted(true)
      } catch (error) {
        setLoading(false)
        toast.message(error.message)
      }
    }

    fetchWedding(id)

  }, [id]);

  const handleBackBtn =() => {
    navigate('/dashboard/order', { replace: true });
  }
  const handleNextBtn =() => {
    navigate('bill');
  }

  if(loading) {
    return <Loading />
  }

  return (
    <Container>
      <Header
        handleAddBtnClick={() => {}}
        headerTitle={`Order ${truncateUUID(id)}`}
        action={false}
        isBack={true}
        handleBackBtn={handleBackBtn}
        isNext={true}
        handleNextBtn={handleNextBtn}
        headerRightTitle={"View Bill"}
      />
      <Wrapper>
      <ToastContainer 
        position="bottom-center"
        autoClose={2000}
        />
      {Object.values(orderData).length > 0 && <OrderInfor 
        orderData={orderData} 
        setOrderData={setOrderData}
        restrictedMode={restrictedMode}
        />}

      <div className="food_service_container">
        <PickFoodService orderId={id} restrictedMode={restrictedMode}/>
      </div>
      </Wrapper>
    </Container>
  );
};

const OrderInfor = (p) => {
  const { orderData, setOrderData, restrictedMode } = p

  const[filterRenderData, setFilterRenderData] = useState({}) // just for filter the data want to render

  const originalOrderData = useMemo(() => ({
    groom: orderData.groom,
    bride: orderData.bride,
    note: orderData.note,
    phone: orderData.Customer.phone,
    table_count: Number(orderData.table_count),
    wedding_date: new Date(orderData.wedding_date),
    lobby_id: orderData.Lobby.id,
    shift_id: orderData.Shift.id,
  }), [
    orderData.groom,
    orderData.bride,
    orderData.note,
    orderData.Customer.phone,
    orderData.table_count,
    orderData.wedding_date,
    orderData.Lobby.id,
    orderData.Shift.id
  ]);
  const [formState, setFormState] = useState(originalOrderData);
  const [isDisabled, setIsDisabled] = useState(true);
  const fp = useRef(null);

  const handleChange = (name, value) => {
    console.log("name", name);
    console.log("value", value);
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      const updateData ={}

      const fieldsToUpdate = originalOrderData

      Object.keys(fieldsToUpdate).forEach((key) => {
        if (formState[key] !== fieldsToUpdate[key]) {
          updateData[key] = formState[key];
        }
      });

      const res = await editWedding(orderData.id, updateData);
      setOrderData(prev => ({...prev, ...res.data}))
      setIsDisabled(true)
      toast.success("Wedding update successful!");
    } catch (error) {
      toast.warn(error.message);
    }
  };

  const formatDataInput = (data) => {
    const { bride, groom } = data

    return { bride, groom }
  }

  useEffect(() => {
    if(orderData) {
      setFilterRenderData(formatDataInput(orderData))
    }
  }, [orderData]);

  useEffect(() => {
    const fieldsToCompare = JSON.stringify(originalOrderData)
    const currentUpdate = JSON.stringify(formState)
    
    setIsDisabled(fieldsToCompare === currentUpdate)

  }, [formState, originalOrderData]);

  return (
   <OrderInforContainer>
      <div className="container">
        <div className="calendar">
          <div className="flat-picker-wrapper">
            <Flatpickr
              ref={fp}
              options={{
                mode: "single",
                inline: true,
                disable: [
                  restrictedMode && function(date) {
                    // Enable only the wedding_date
                    return date.getTime() !== new Date(formState.wedding_date).getTime();
                  }
                ],
                allowInput: false, // Prevents manual input
              }}
              value={formState.wedding_date}
              onChange={(date) => handleChange('wedding_date', date[0])}
            />
          </div>
        </div>
        <InputField 
          title="Lobby" 
          type="custom" 
          value={formState.lobby_id} 
          onChange={(value) => handleChange('lobby_id', value)}
          options={{ 
            customComponent: <TreeSelectLob currentValue={formState.lobby_id} onChange={(value) => handleChange('lobby_id', value)} restrictedMode={restrictedMode} /> 
          }} 
          restrictedMode={restrictedMode}/>
        <InputField 
          title="Shift" 
          type="custom" 
          value={formState.shift_id}
          onChange={(value) => handleChange('shift_id', value)} 
          options={{ 
            customComponent: <SelectShift currentValue={formState.shift_id} onChange={(value) => handleChange('shift_id', value)} restrictedMode={restrictedMode}/>
          }} 
          restrictedMode={restrictedMode}/>
        <div className='customer_info'>
          <InputField title="Groom" type="text" value={formState.groom} onChange={(value) => handleChange("groom", value)} />
          <InputField title="Bride" type="text" value={formState.bride} onChange={(value) => handleChange("bride", value)}/>
          <InputField title="Phone" type="text" value={formState.phone} onChange={(value) => handleChange("phone", value)}/>
          <InputField title="Tables" type="number" value={formState.table_count} onChange={(value) => handleChange("table_count", value)} restrictedMode={restrictedMode}/>
          <InputField title="Note" type="textarea" value={formState.note} onChange={(value) => handleChange("note", value)}/>
        </div>
      </div>
      <div className="btn-wrapper">
      <Button type="primary" disabled={isDisabled} onClick={handleSubmit}>
        Save
      </Button>
      </div>
   </OrderInforContainer>
  )
}

const TreeSelectLob = (p) => {
  const { currentValue, onChange, restrictedMode } = p
  const { TreeNode } = TreeSelect;
  const [lobTypes, setLobTypes] = useState([])

  const fetchLobType = async () => {
    try {
      
      const res = await getLobbyTypes(false, true);
      const data = res.data;
      setLobTypes(data);
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    fetchLobType()
  }, []);

  return (
    <TreeSelect
      showSearch
      style={{ width: '100%' }}
      value={currentValue}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder="Please select"
      allowClear
      treeDefaultExpandAll
      onChange={onChange}
      disabled={restrictedMode}
    >
      {lobTypes && 
      lobTypes.map(lobType => {
        return (
          <TreeNode key={lobType.id} value={lobType.id} title={lobType.type_name} selectable={false}>
            {lobType.Lobby.map(lob => {
              return (
                <TreeNode key={lob.id} value={lob.id} title={lob.name} />
              )
            })}
          </TreeNode>)
      })}
    </TreeSelect>
  );
}

const SelectShift = (p) => {

  const { currentValue, onChange, restrictedMode } = p
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    const fetchShifts = async () => {
      try{
        const res = await getShifts()
        setShifts(res.data)
      } catch (error) {
        toast.error(error.message)
      }
    }

    fetchShifts()
  }, [])
  return (
    <div style={{  margin: 'auto' }}>
      <Select
        value={currentValue}
        onChange={onChange}
        style={{ width: '100%' }}
        placeholder="Please select an option"
        disabled={restrictedMode}
      >
      {shifts &&
      shifts.map(shift => {
        return (
          <Option key={shift.id} value={shift.id}>{shift.name}</Option>
        )
      })}
      </Select>
    </div>
  );
}

const Container = styled.div`
  height: 100vh;

  .food_service_container {
    width: 80%;
    position: relative;
  }


`

const OrderInforContainer = styled.div`
  height: 100%;
  padding: 30px;
  width: 30%;
  background-color: white;
  overflow-y: scroll;

  .container {

    .calendar {
      margin-bottom: 20px;
      .flat-picker-wrapper {
        input.flatpickr-input {
          display: none!important;
        }
      }
    }

    .customer_info {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10px;
    }
  }
`

const InputFieldWrapper = styled.div`
  width: 100%;
  padding: 10px 0;
  &:last-child {
    grid-column: span 2; /* Make the last item span all 4 columns */
  }

  .title { 
    margin-bottom: 5px;
    font-size: 1rem;
    font-weight: 600;
  }
`

const Wrapper = styled.div`
height: 88vh;
width: 100%;
padding: 2.5rem;
display: flex;
 
`;

export default OrderID;
