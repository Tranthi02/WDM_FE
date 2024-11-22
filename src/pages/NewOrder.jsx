import { useEffect, useMemo, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { createWedding, editWedding, getWeddingById } from '../api/wedding.api';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components';
import styled from 'styled-components';
import PickFoodService from '../components/Order/OrderId/PickFoodService';

import Flatpickr from "react-flatpickr";
import { getLobbyTypes, getShifts } from '../api/lobby.api';
import { Input, Select, TreeSelect, InputNumber, Button, message } from 'antd';
import { Option } from 'antd/es/mentions';
import Loading from '../components/Loading';
const { TextArea } = Input;


const NewOrder = () => {
  const [orderData, setOrderData] = useState({id : null})
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleBackBtn =() => {
    navigate('/dashboard/order', { replace: true });
  }
  const handleNextBtn =() => {
    navigate(`/dashboard/order/${id}/bill`);
  }

  useEffect(() => {
    const fetchWedding = async (id) =>  {
      try {
        setLoading(true)
        const res = await getWeddingById(id)
        setOrderData(res.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        toast.warning(error.message)
      }
    }

    fetchWedding(id)
  }, [id]);

  // if(loading) {
  //   return <Loading />
  // }


  return (
    <Container>
      <Header
        handleAddBtnClick={() => {}}
        headerTitle={`New Order`}
        action={false}
        isBack={true}
        handleBackBtn={handleBackBtn}
        isNext={id}
        handleNextBtn={handleNextBtn}
      />
      <Wrapper>
      <ToastContainer 
        position="bottom-center"
        autoClose={1000}
        />
       <OrderInfor
        orderData={orderData}
        setOrderData={setOrderData}
        setId={setId}
        id={id}
        />

      <div className="food_service_container">
       {id && <PickFoodService orderId={id}/>}
      </div>
      </Wrapper>
    </Container>
  );
};

const OrderInfor = (p) => {
  const { orderData, setOrderData, setId, id } = p
  const originalOrderData = useMemo(() => ({
    groom: orderData?.groom || '',
    bride: orderData?.bride || '',
    note: orderData?.note || '',
    phone: orderData?.Customer?.phone || '',
    table_count: Number(orderData?.table_count) || 0,
    wedding_date: orderData?.wedding_date ? new Date(orderData?.wedding_date) : new Date(),
    lobby_id: orderData?.Lobby?.id || '',
    shift_id: orderData?.Shift?.id || '',
  }), [orderData]);

  const [formState, setFormState] = useState(originalOrderData);
  const [isDisabled, setIsDisabled] = useState(true);
  const fp = useRef(null);

  useEffect(() => {
    setFormState(originalOrderData);
  }, [originalOrderData]);

  useEffect(() => {
    setIsDisabled(JSON.stringify(originalOrderData) === JSON.stringify(formState));
  }, [formState, originalOrderData]);

  const handleChange = (name, value) => {
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const createData = {};
      Object.keys(originalOrderData).forEach((key) => {
        if (key === "wedding_date") {
          const date1 = new Date(formState[key]).getTime();
          const date2 = new Date(originalOrderData[key]).getTime();
          if (date1 !== date2) createData[key] = formState[key];
        } else if (formState[key] !== originalOrderData[key]) {
          createData[key] = formState[key];
        }
      });

      let res;
      if (id) {
        res = await editWedding(id, createData);
        setOrderData(prev => ({ ...prev, ...res.data }));
      } else {
        res = await createWedding(createData);
        setId(res.data.id);
      }
      setIsDisabled(true);
      toast.success("Wedding update successful!");
    } catch (error) {
      toast.warn(error.message);
    }
  };

  return (
    <OrderInforContainer>
      <div className="container">
        <div className="calendar">
          <div className="flat-picker-wrapper">
            <Flatpickr
              ref={fp}
              options={{ mode: "single", inline: true }}
              value={formState.wedding_date}
              onChange={(date) => handleChange('wedding_date', date[0])}
            />
          </div>
        </div>
        <InputField title="Lobby" type="custom" value={formState.lobby_id} onChange={(value) => handleChange('lobby_id', value)} options={{ customComponent: <TreeSelectLob currentValue={formState.lobby_id} onChange={(value) => handleChange('lobby_id', value)} /> }} />
        <InputField title="Shift" type="custom" value={formState.shift_id} onChange={(value) => handleChange('shift_id', value)} options={{ customComponent: <SelectShift currentValue={formState.shift_id} onChange={(value) => handleChange('shift_id', value)} /> }} />
        <div className='customer_info'>
          <InputField title="Groom" type="text" value={formState.groom} onChange={(value) => handleChange("groom", value)} />
          <InputField title="Bride" type="text" value={formState.bride} onChange={(value) => handleChange("bride", value)} />
          <InputField title="Phone" type="text" value={formState.phone} onChange={(value) => handleChange("phone", value)} />
          <InputField title="Tables" type="number" value={formState.table_count} onChange={(value) => handleChange("table_count", value)} />
          <InputField title="Note" type="textarea" value={formState.note} onChange={(value) => handleChange("note", value)} />
        </div>
      </div>
      <div className="btn-wrapper">
        <Button type="primary" disabled={isDisabled} onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </OrderInforContainer>
  );
};


export const InputField = (p) => {
  const { title, type, value, onChange, options, restrictedMode } = p
  const renderInput = () => {
    switch (type) {
      case 'text':
        return <Input value={value} onChange={(e) => onChange(e.target.value)} disabled={restrictedMode} />;
      case 'number':
        return <InputNumber value={value} onChange={(value) => onChange(Math.max(0, value))} disabled={restrictedMode}/>;
      case 'textarea':
        return (
          <TextArea
            value={value}
            placeholder="Wedding note..."
            onChange={(e) => onChange(e.target.value)}
            autoSize={{ minRows: 2, maxRows: 5 }}
            disabled={restrictedMode}
          />
        );
      case 'custom':
        return options.customComponent;
      default:
        return null;
    }
  };

  return (
    <InputFieldWrapper>
      <div className="title">{title}</div>
      {renderInput()}
    </InputFieldWrapper>
  );
};

const TreeSelectLob = (p) => {
  const { currentValue, onChange } = p
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

  const { currentValue, onChange } = p
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

export default NewOrder;
