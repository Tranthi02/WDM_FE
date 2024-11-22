import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
  .top {
    background-color: var(--green-dark);
    display: flex;
    justify-content: center;
    align-items: center;
    .icon-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 4rem;
      height: 4rem;
      border-radius: 999px;
      border: 4px solid var(--white);
      .icon {
        color: var(--white);
        font-size: 2rem;
      }
    }
  }
  .bottom {
    text-transform: capitalize;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: 1.5rem;
    strong {
      color: var(--green-dark);
      font-size: 1.9rem;
    }
    .btn {
      padding: 0.8rem 2.2rem;
      background-color: transparent;
      color: var(--black);
      border: 1px solid var(--grey-600);
    }
  }
`;
export default Wrapper;
