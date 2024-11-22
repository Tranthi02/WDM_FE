import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.8rem;
  .title {
    font-weight: 600;
    margin-right: 1rem;
    text-transform: capitalize;
  }
  .open-modal {
    display: inline-flex;
    align-items: center;
    column-gap: 0.5rem;
    color: var(--grey-400);
    text-decoration: underline;
    cursor: pointer;
  }
  .red {
    color: var(--red-dark);
  }
  .strong {
    font-weight: 700;
  }
`;
export default Wrapper;
