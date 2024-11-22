import { useEffect, useState, useRef } from "react";
import { Header } from "../components";
import { deleteShifts, getShifts, createShifts } from "../api/lobby.api";
import { LobbyBlock, LobbyTableStyled } from "../components/Lobby/Styled";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { truncateUUID } from "../utils";
import Flatpickr from "react-flatpickr";
import { FaDeleteLeft } from "react-icons/fa6";

import { Checkbox, Input, Button, Table, Tag } from "antd";
import useDebounce from "../hook/useDebounce";
import { searchWeddingsByDateForLob } from "../api/wedding.api";

const LobbyID = () => {

  const { lobID, id } = useParams()
  const navigate = useNavigate()

  const [searchParam, setSearchParam] = useState({
    date: new Date(),
    shift_list: []
  })

  const debouncedSearchParam = useDebounce(searchParam, 200);

  const handleBackBtn = () => {
    navigate(`/dashboard/lobType/${id}`, { replace: true });
  }


  return (
      <LobbyBlock>
        <Header
          headerTitle={`Lobby ${truncateUUID(lobID)}`}
          handleBackBtn={handleBackBtn}
          isBack={true}
          action={false}
        />
        <LobbyTableStyled>
          <ToastContainer />
          <Container>

            <ActionContainer searchParam={searchParam} setSearchParam={setSearchParam}/>
            <ContentContainer searchParam={debouncedSearchParam} lobID={lobID}/>
            

          </Container>
        </LobbyTableStyled>
      </LobbyBlock>
  );
};

const ActionContainer = (p) => {
  const { searchParam, setSearchParam } = p

  const fp = useRef(null);

  const [shiftList, setShiftList] = useState([])


  const [newShiftName, setNewShiftName] = useState("")
  const [isdisableBtnAddShift, setDisableBtnAddShift] = useState(true)


  const handleCreateShift = async () => {
    try{
      const res = await createShifts(newShiftName)
      setNewShiftName("")
      setShiftList(prev => [...prev, res.data])
    } catch (error) {
      alert(error.message)
    }
  }

  const handleChooseDate = (date) => {
    setSearchParam({...searchParam, date: date[0] })
  }

  const handleCheckboxChange = (shift, checked) => {
    setSearchParam(prevState => {
      const { shift_list } = prevState;
      if (checked) {
        // Add the shift to the list if it doesn't already exist
        if (!shift_list.some(item => item.id === shift.id)) {
          return {
            ...prevState,
            shift_list: [...shift_list, shift]
          };
        }
      } else {
        // Remove the shift from the list if it exists
        return {
          ...prevState,
          shift_list: shift_list.filter(item => item.id !== shift.id)
        };
      }
      return prevState;
    });
  };

  const handleDeleteShift = async (id) => {
    try{
      await deleteShifts(id)
      setShiftList(prev => {
        const newArray = prev.filter(data => data.id !== id)
        return newArray
      })
    } catch (error) {
      alert(error.messge)
    }

  }

  useEffect(() => {
    const fetchShifts = async () => {
      try{
        const res = await getShifts()
        setSearchParam({...searchParam, shift_list: res.data})
        setShiftList(res.data)
      } catch (error) {
        alert(error)
      }
    }

    fetchShifts()
  }, [])

  useEffect(() => {
    if(newShiftName.length > 0) {
      setDisableBtnAddShift(false)
    } else {
      setDisableBtnAddShift(true)
    }
  }, [newShiftName])



  return (
    <Action>
      <div className="calendar">
        <div className="action-title">Select Date</div>
        <div className="flat-picker-wrapper">
          <Flatpickr
            ref={fp}
            options={{
                mode: "single",
                inline: true
            }}
            value={searchParam.date}
            onChange={handleChooseDate}
            />
        </div>
      </div>

      <div className="shift">
        <div className="action">
          <div className="shift-list-wrapper">
            {/* <p>Select Shift</p> */}
            <div className="shift-list">
              {shiftList && shiftList.map((shift) => {
              const isChecked = searchParam.shift_list.some(item => item.id === shift.id);
              return (
                <span key={shift.id} className="shift-item">
                  <Checkbox 
                    checked={isChecked}
                    onChange={(e) => handleCheckboxChange(shift, e.target.checked)}
                  >
                    {shift.name}
                  </Checkbox> 
                  <span onClick={() => handleDeleteShift(shift.id)}><FaDeleteLeft /></span>
                </span>)
              })}
            </div>
          </div>
          <div className="add_shift">
            <p>New Shift</p>
            <Input 
              placeholder="new shift..." 
              size="small"
              value={newShiftName}
              onChange={(e) => setNewShiftName(e.target.value)}
            />
            <div style={{marginTop: "10px"}}>
              <Button type="primary" disabled={isdisableBtnAddShift} onClick={handleCreateShift}>Save</Button>
            </div>
          </div>
        </div>
      </div>
    </Action>
  )
}

const ContentContainer = (p) => {
  const { searchParam, lobID } = p


  const [dataSource, setDataSource] = useState([])

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

  const columns = [
    {
      title: 'Groom',
      dataIndex: 'groom',
      key: 'groom',
    },
    {
      title: 'Bride',
      dataIndex: 'bride',
      key: 'bride',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Shift',
      dataIndex: 'shift',
      key: 'shift',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => {
        let color = getStatusStyle(status)

        return (
          <Tag color={color} key={status}>
              {status.toUpperCase()}
          </Tag>
        )
      }
    },
  ];



  const formatDataWedding = (array) => {
    const result = array.map(data => {
      const { Customer, Shift, ...rest } = data

      return {...rest, phone: Customer.phone, shift: Shift.name}
    })

    return result
  }

  useEffect(()=> {
    console.log(searchParam)

    const fetchWeddingData = async () => {
      try{ 
        const date = searchParam.date
        const shift_list = searchParam.shift_list
        const res = await searchWeddingsByDateForLob(date, shift_list, lobID)
        const result = formatDataWedding(res.data)
        console.log(result)

        setDataSource(result)
      } catch(error) {
        alert(error.message)
      }
    }

    fetchWeddingData()
  }, [searchParam, lobID])
  
  return (    
    <Content>
      <Table dataSource={dataSource} columns={columns} />
    </Content>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`

const Action = styled.div`
    width: auto;
    background-color: white;
    padding: 20px;
    /* display: flex;
    justify-content: center;
    align-items: center; */
    border-radius: 10px;
  .action-title {
    font-size: 20px;
    font-weight: 700;
    margin: 10px 0;
  }
  .calendar {
    margin-bottom: 20px;
    .flat-picker-wrapper {
      input.flatpickr-input {
        display: none!important;
      }
    }
  }

  .shift {
    .action {
      display: flex;
      gap: 20px;
      margin-top: 40px;
      justify-content: space-between;
      .shift-list-wrapper {
        &>p {
          font-size: 0.9rem;
          font-weight: 600;
        }
        
        .shift-list {
          display: flex;
          flex-direction: column;
          border: 1px solid #e6e6e6;
          padding: 10px;
          border-radius: 10px;
          height: 150px;
          overflow-y: scroll;

          .shift-item {
            display: flex;
            align-items: center;
            justify-content: space-between;


            svg {
              transition: all 0.2s ease;
              cursor: pointer;
              &:hover {
                scale: 1.2;
              }
            }
          }
        }
      }

      .add_shift {
        &>p {
          font-size: 0.9rem;
          font-weight: 600;
        }
      }
    }
  }
`
const Content = styled.div`
  flex: 1;
`

export default LobbyID;
