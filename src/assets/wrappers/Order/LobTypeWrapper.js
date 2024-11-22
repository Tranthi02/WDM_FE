import styled from 'styled-components';

const Wrapper = styled.div`
  h4 {
    margin-bottom: 3rem;
    text-transform: capitalize;
    text-align: center;
    font-weight: 600;
  }
  .container {
    margin-top: 2rem;
    position: relative;
    width: 100%;
    height: 36.5rem;
    border-radius: var(--border-radius);
    background-color: var(--white);
    padding: 0 2rem 3.8rem 2rem;
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .container::-webkit-scrollbar {
    display: none;
  }
`;

export default Wrapper;
