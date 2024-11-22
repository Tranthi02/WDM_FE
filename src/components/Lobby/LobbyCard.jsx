import { useState, useRef, useEffect, useContext } from 'react';
import lobImg from '../../assets/images/lobby.jpg';
import styled from 'styled-components';
import { updateLobby, getLobbyTypes, softDeleteLobby } from "../../api/lobby.api.js" 
import { LobbyContext } from '../../pages/Lobby.jsx';


const LobbyCard = (p) => {
  const {
    lobby,
    onClick,
    handleClickLobCard
  } = p
  const { id, name, lob_type_id } = lobby;
  const cardRef = useRef(null);


  const handleCardClick = () => {
    onClick()
  };

  return (
    <div className="card" ref={cardRef} onClick={handleCardClick}>
      <img src={lobImg} alt={name} className="lob-img" onClick={handleClickLobCard}/>
      <div className="content" style={{marginTop: "10px"}}>
        <NameBox id={id} name={name} lob_type_id={lob_type_id}>
        </NameBox>
      </div>
    </div>
  );
};


const NameBox = (p) => {
  const { id, name, lob_type_id } = p
  const { lobbyList, setLobbyList } = useContext(LobbyContext)
  const [value, setValue] = useState({name: name, lobTypeID: lob_type_id})
  const [isEdit, setEdit] = useState(false)
  const [saveAble, setSaveAble] = useState(false)
  const [optionData, setOptionData] = useState([])
  const inputRef = useRef(null)

  useEffect(() => {
    if (isEdit) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  useEffect(() => {
    if (value.name !== name || value.lobTypeID !== lob_type_id) {
      setSaveAble(true)
    }
    else {
      setSaveAble(false)
    }
  }, [name, value]);

  const editOption = {
    open: () => {
      setEdit(true)
    },
    // close: (isCancel=false) => {
    //   setEdit(false)
    //   isCancel && setValue(name)
    // },
    save: async () => {
      try {

        const dataUpdate = {
          lob_type_id: value.lobTypeID,
          name: value.name
        }
        await updateLobby(id, dataUpdate)
        setSaveAble(false)
        value.lobTypeID !== lob_type_id && removeLobFromLobList(id)


      } catch(error) {
        alert(error.message)
      }
    }
  }

  const removeLobFromLobList = (lobbyID) => {
    const newLobList = lobbyList.filter(lob => lob.id !== lobbyID)
    setLobbyList(newLobList)
  }

  useEffect(() => {
    const getLobType = async () => {
      try {
        const res = await getLobbyTypes()

        const options = res.data.map(lobtype => {
          return {
            value: lobtype.id,
            label: lobtype.type_name
          }
        })
        setOptionData(options)
      } catch(error) {
        alert(error.message)
      } 
    }

    getLobType()
  }, [])
  
  // Function to handle when an option is selected
  function handleSelectChange(event) {
    setValue(prev => ({...prev, lobTypeID: event.target.value}))
  }

  const handleInputName = (e) => {
    setValue(prev => ({...prev, name: e.target.value}))
  }

  const handleDeleteLob = async () => {
    try {
      await softDeleteLobby(id)
      removeLobFromLobList(id)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <NameContainer>
      {
        <InputBox> 
            <div className="edit-content">
              <InputWrapper> 
                <p style={{ fontWeight: "600" }}>Lobby Name</p>
                <input ref={inputRef} type="text" value={value.name} onInput={(e) => handleInputName(e)}/>
              </InputWrapper>
              <SelectInputWrapper>
                <p style={{ fontWeight: "600" }}>Lobby Type</p>
                <CustomSelect 
                  options={optionData} 
                  onChange={handleSelectChange} 
                  defaultValue={value.lobTypeID}
                />
              </SelectInputWrapper>
            </div>
            <div className="action-box">
              <button className="btn delete" onClick={handleDeleteLob}>Delete</button>  
              {saveAble && <button className="btn save " onClick={editOption.save}>Save</button>  }
            </div> 
          </InputBox>
      }
    </NameContainer>
  )
}


const CustomSelect = (p) => {
  const { options, onChange, defaultValue } = p
  return (
    <SelectWrapper>
      <select onChange={onChange} value={defaultValue}>
        {options && options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </SelectWrapper>
  );
};

const NameContainer = styled.div`

`
const InputBox = styled.div `
  width: 100%;
  
  .edit-content {
    width: 100%;
    display: flex;
    gap: 10px;

  }
  .action-box {
    justify-content: center;
    gap: 10px;
    display: flex;

    .btn {
      &.delete {
        background-color: #e05252;
      }
    }
  }
`

const InputWrapper = styled.div`

  input {
    margin: 10px 0;
    border-radius: 6px;
    padding: 7px 10px;
    box-shadow: rgba(9,30,66,0.25) 0px 1px 1px, rgba(9,30,66,0.13) 0px 0px 1px 1px;
    overflow: hidden;
    width: 100%;
  }
`

const SelectInputWrapper = styled.div `
  flex:1;

`


const SelectWrapper = styled.div`
    width: 100%;
    margin: 10px 0;
    border-radius: 6px;
    padding: 7px 10px;
    box-shadow: rgba(9,30,66,0.25) 0px 1px 1px, rgba(9,30,66,0.13) 0px 0px 1px 1px;
    overflow: hidden;
    background: white;

    select {
      width: 100%;
      outline: none;
      border: none;
      border-radius: 6px;
      background: transparent;
      box-shadow: none;
      -webkit-appearance: none; /* Removes default styling of select in webkit browsers */
      -moz-appearance: none; /* Removes default styling of select in Mozilla browsers */
      appearance: none;
    }

    /* Custom arrow using a background image, can be replaced with a SVG or other method */
    &:after {
      content: "";
      position: absolute;
      right: 15px;
      top: 18px;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid black; /* Arrow color */
      pointer-events: none;
    }
`;


const LobTile = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center
`
export default LobbyCard;
