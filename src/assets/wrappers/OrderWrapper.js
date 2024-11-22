import styled from 'styled-components';

const Wrapper = styled.section`
  height: var(--section-height);
  main {
    position: relative;
    height: calc(var(--section-height) - var(--header-height));
    padding: 2.5rem;
  }
  .container {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius);
    background-color: var(--white);
    padding: 1.8rem 2rem;
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .container::-webkit-scrollbar {
    display: none;
  }
  .empty {
    font-size: 2.5rem;
  }
`;
export default Wrapper;
