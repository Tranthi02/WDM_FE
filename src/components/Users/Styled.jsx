import styled from "styled-components"
import { AccountInformationTable } from "./AccountInformationTable";
import { PermissonAccountTable } from "./PermissonAccountTable";;

export const Checkbox = styled.input`
  outline: none;
  width: 25px;
  height: 25px;
  color: red;
  &:hover{
    cursor: pointer;
  }
`

export const UserBlock = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 2%;

  .blockTitle {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .blockTitle{
      .title{
        font-weight: 600;
      }
      .plus{
        height: 100%;
        display: flex;
        justify-content: left;
        align-items: center;
        margin-left: 10px;
        &:hover{
          cursor: pointer;
        }
        svg{
          height: 35px;
          width: 35px;
        }
      }
    }
  .TitleSearchCombination{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const StyledPermissionAccountTable = styled(PermissonAccountTable)`
 width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  border-collapse: separate; 
  border-spacing: 10px; 
  border-collapse: collapse;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 10px;
  overflow: hidden;
  thead {
    border-radius: 10px;  
  }
  thead th {
    position: sticky;
    top: 0;
    background-color: #1820F3;
    font-weight: bold;
    color: #f6f6f6;
  }
  tbody {
    display: block;
    max-height: 25vh;
    overflow-y: auto;
  }
  tr{
    height: 7vh;
  }
  th{
    width: auto;
    max-width: 20vw;
    text-align: center;
    font-size: 1.5em;
    color: #718ebf;

    &.empty {
      width: 3vw;
    }
  }
  td{
    width: auto;
    padding: 0 8px;
    max-width: 20vw;
    overflow: hidden;
    white-space: nowrap; 
    text-overflow: ellipsis;
    text-align: center;
    font-size: 1.25em;
  }

  tbody tr {
      display: table;
      width: 100%;
      table-layout: fixed; /* Optional: helps with column width consistency */
  }

  thead, tbody tr {
      display: table;
      width: 100%;
      table-layout: fixed; /* This makes sure all columns are of equal size */
  }
`;

export const StyledAccountInformationTable = styled(AccountInformationTable)`
  width: 100%;
  margin-top: 20px;
  border-collapse: separate; 
  border-spacing: 10px; 
  border-collapse: collapse;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 10px;
  overflow: hidden;
  thead {
    border-radius: 10px;  
  }
  thead th {
    position: sticky;
    top: 0;
    background-color: #1820F3;
    font-weight: bold;
    color: #f6f6f6;
  }
  tbody {
    display: block;
    max-height: 30vh;
    overflow-y: auto;
  }
  tr{
    height: 7vh;
  }
  th{
    width: auto;
    max-width: 20vw;
    text-align: center;
    font-size: 1.5em;
    color: #718ebf;

    &.empty {
      width: 3vw;
    }
  }
  td{
    width: auto;
    padding: 0 8px;
    max-width: 20vw;
    overflow: hidden;
    white-space: nowrap; 
    text-overflow: ellipsis;
    text-align: center;
    font-size: 1.25em;
  }

  tbody tr {
      display: table;
      width: 100%;
      table-layout: fixed; /* Optional: helps with column width consistency */
  }

  thead, tbody tr {
      display: table;
      width: 100%;
      table-layout: fixed; /* This makes sure all columns are of equal size */
  }

  .pencilIcon{
    width: 3vw;
    &:hover{
      cursor: pointer;
    }
  }
  .deleteIcon{
    width: 3vw;
    &:hover{
      cursor: pointer;
    }
  }
`;

export const InformationBlock = styled.div`
  display: ${props => props.display === "true" ? 'flex' : 'none'};
  z-index: 2;
  position: fixed;
  top: 0; 
  left: 10%; 
  height: 100vh;
  width: 90%;
  background-color: rgb(0, 0, 0, 50%);
  justify-content: center;
  align-items: center;
`;

export const InformationBoard = styled.div`
  width: 40%;
  height: 60%;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  justify-content: space-around;
  background-color: white;

h4{
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: end;
  font-weight: bold;
}

.boardInput{
  flex: 1;
  width: 100%;
  tr{
    .informationTitle{
     width : 35% ;
    }
  }
  td{
    p{
      height: 100%;
      display: flex;
      justify-content: end;
      align-items: center;
      font-size: 1.15em;
      font-weight: bold;


    }
    input{
      width: 65%;
      margin-left: 5% ;
      font-size: 1.15em;
      font-weight: bold;
      border-bottom: 1px black solid;
      
      &:disabled {
        border-bottom: none!important;
      }
    }
    select{
      margin-left: 5%;
      width: 65%;
      border-radius: 5px;
      font-size: 1.15em;
    }
  }
}

  .cancelSaveCombination{
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    button{
      width: 15%;
      height: 50%;
      border-radius: 12px;
      color: white;
      &:hover{
        cursor: pointer;
      }
    }
    .cancelButton{
      background-color: #e85f5f;
      margin-left: 2%;
    }
/*     .saveButton{
      background-color: ${(props) => (props.disabled ? 'gray' : 'blue')};
      margin-right: 2%;
    } */
  }
`;

export const SaveButton = styled.button`
      background-color: ${(props) => (props.disabled ? '#c4c4c4' : 'blue')};
      margin-right: 2%;
`

export const PermissionBlock = styled.div`
  display: ${(props) => props.display};
  z-index: 2;
  position: fixed;
  top: 0; 
  left: 10%; 
  height: 100vh;
  width: 90%;
  background-color: rgb(0, 0, 0, 50%);
  justify-content: center;
  align-items: center;
`

export const PermissionForm = styled.div`
  width: 40%;
  height: 30%;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  .formTitle{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30%;
    font-weight: bold;
  }
`
export const PermissionInput = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .inputTitle{
    display: flex;
    justify-content: end;
    align-items: center;
    width: 30%;
    font-size: 1.5em;
    font-weight: bold;
  }
  .input{
    width: 70%;
    display: flex;
    justify-content: start;
    align-items: center;
    padding-left: 3%;
    input{
      width: 80%;
      border-bottom: 1px gray solid;
      font-size: 1.5em;
      font-weight: bold;
    }
  }
`

export const PermissionCancelandSave = styled.div`
  display: flex;
  height: 40%;
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
`