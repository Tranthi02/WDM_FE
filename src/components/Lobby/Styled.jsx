import styled from "styled-components"

export const LobbyBlock = styled.div`
  height: 100%;
`

export const LobbyContent = styled.div`
  width: 90%;
  height: 100%;
`

export const LobbyTableStyled = styled.div`
  width: 100%;
  height: 88vh;
  background-color: #f5f7fa;
  padding: 2.5rem;
`
export const WrapTable = styled.div`
    background-color: white;
    height: 100%;
    display: flex; 
    flex-direction: column;
    justify-content: space-between;
    border-radius: 10px;
    padding-bottom: 1%;
    table{
      table-layout: fixed;
      width: 100%;
      padding-top: 1%;
      tr{
        height: 7vh;
        &:hover{
          cursor: pointer;
        }
      }
      th{
        width: auto;
        text-align: center;
        font-size: 1.5em;
        color: #718ebf;
      }
      td{
        width: auto;
        text-align: center;
        font-size: 1.25em;
      }
    }
    .paginationButtonTable{

    }
`
export const PagePaginationStyled = styled.div`
    user-select: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .button{
      display: flex;
      justify-content: center;
      align-items: center;
      svg{
        width: 30px;
        height: 30px;
      }
      &:hover{
        cursor: pointer;
      }
    }
    .pageNumber{
      width: 25px;
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid gray;
      margin-left: 0.5%;
      margin-right: 0.5%;
      border-radius: 3px;
      &:hover{
        cursor: pointer;
      }
    }
`

export const EditBlock = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgb(0, 0, 0, 50%);
  z-index: 10;
  position: fixed;
  top: 0; 
  left: 0; 
  display: flex;
  justify-content: center;
  align-items: center;
  h1{
    color: black;
  }
`
export const TableInput = styled.div`
  background-color: white;
  width: 40%; 
  height: ${props => {
    if (props.className === "Type") return "60%";
    if (props.className === "TypeInform") return "40%;"
  }};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  h4{
    height: ${props => {
    if (props.className === "Type") return "15%";
    if (props.className === "TypeInform") return "30%;"
  }};
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }
`

export const TypeTableCancelAndSave = styled.div`
  display: flex;
  height: ${props => {
    if (props.className === "Type") return "20%";
    if (props.className === "TypeInform") return "35%";
  }};
  justify-content: space-around;
  align-items: center;
  button{
    width: 20%;
    height: 50%;
    border-radius: 10px;
    font-size: 1em;
    &:hover{
      cursor: pointer;
    }
  }
  .buttonCancel{
    color: white;
    background-color: gray;
  }
  .buttonSave{
    color: white;
    background-color: blue;
  }

  .buttonDelete {
    color: white;
    background-color: #f64e4e;
  }
`

export const EditLobbyInput = styled.div`
  height: 65%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  h5{
    color: black;
    font-weight: bold; 
  }
  .typeNameAndPrice, .maxTableandDeposit{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .inputElement{
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    input{
      height: 25%;
      border: 2px solid gray;
      border-radius: 10px;
      padding-left: 5%;
      font-size: 1.5em;
    }
  }
`
export const EditLobbyShift = styled.div`
  height: 17.5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h5{
    height: 40%;
    color: black;
    font-weight: bold; 
    display: flex;
    align-items: center;
  }
  .checkboxCombination{
    height: 60%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .checkbox{
      width: 30%;
      display: flex;
      justify-content: center;
      p{
        display: flex;
        align-items: center;
        font-size: 1.5em;
        color: black;
        font-weight: bold;
      }
      input{
        height: 30px;
        width: 30px;
        margin-right: 5%;
        border-radius: 10px;
        &:hover{
          cursor: pointer;
        }
      }
    }
  }
`

export const EditTypeInformInput = styled.div`
  height: 35%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  .inputBlock {
    height: 100%;
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 2%;
    h5{
      height: 50%;
      color: black; 
      font-weight: bold;
    }
  }
  input{
    height: 50%;
    border: 2px solid gray;
    border-radius: 10px;
    padding-left: 5%;
    font-size: 1.5em;
    color: black; 
  }
  select{
    padding-left: 5%;
    padding-right: 5%;
    height: 50%;
    border: 2px solid gray;
    border-radius: 10px;
    font-size: 1.15em;
    color: black; 
    option{
      color: black;
    }
  }
`