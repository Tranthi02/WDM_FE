import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  h4 {
    text-align: center;
    font-size: 1.8rem;
    font-weight: 600;
  }
  .rows {
    margin-top: 2rem;
  }
  .text-input-wrapper {
    width: max-content;
    margin: 0 auto;
  }
  .text-input-wrapper ~ .text-input-wrapper {
    margin-top: 1rem;
  }
  .btn {
    font-size: 1rem;
    padding: 0.7rem 2.7rem;
    margin-top: 2rem;
  }
`;

export default Wrapper;
