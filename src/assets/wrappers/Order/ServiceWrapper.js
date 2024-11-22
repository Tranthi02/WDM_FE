import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  padding: 2.3rem 4rem;
  height: 100%;
  h3 {
    text-align: center;
    font-weight: 600;
  }
  .container {
    margin-top: 2rem;
    width: 100%;
    height: 70%;
    border-radius: var(--border-radius);
    background-color: var(--white);
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  strong {
    position: absolute;
    bottom: 3rem;
    right: 6rem;
    text-transform: capitalize;
  }
`;
export default Wrapper;
