import styled from 'styled-components';

const Wrapper = styled.header`
  height: var(--header-height);
  padding: 0 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--white);
  border-bottom: 1px solid var(--grey-200);
  .backBtn{
    width: 8%;
    display: flex;
    justify-content: center;
    align-items: center;
    svg{
      width: 35px;
      height: 35px;
    }
    .canClickIcon{
      &:hover{
        cursor: pointer;
      }
    }
  }
  h1 {
    width: 100%;
    display: flex;
    justify-content: start;
    font-size: 1.4rem;
    font-weight: 700;
  }
  .right-container {
    display: flex;
    align-items: center;
    column-gap: 2rem;
  }

  .next-action {
    display: flex;
    align-items: center;
    column-gap: 1rem;
    .title {
      font-weight: 700;
      text-wrap: nowrap;
      font-size: 1.4rem;
    }
  }
  button {
    background-color: var(--grey-100);
    width: 3rem;
    height: 3rem;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .icon {
      font-size: 1.3em;
    }
  }
`;
export default Wrapper;
