import styled from 'styled-components';

const Wrapper = styled.aside`
  position: relative;
  background-color: var(--white);
  height: var(--section-height);
  padding: 0 1.5rem;
  border-right: 1px solid var(--grey-200);
  header {
    height: var(--header-height);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .nav-links {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    row-gap: 1.8rem;
  }
  .nav-link {
    padding: 0.5rem 0;
    position: relative;
    display: flex;
    align-items: center;
    text-transform: capitalize;
    font-size: 1em;
    font-weight: 500;
    color: #b1b1b1;
    .icon {
      font-size: 1.1em;
      color: #000;
      margin-right: 1rem;
    }
    transition: all 0.2s ease;
  }
  .nav-link:hover {
    color: var(--primary);
    opacity: 0.6;
    .icon {
      color: var(--primary);
    }
  }
  .role {
    position: absolute;
    padding: 16px;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    .icon {
      font-size: 1.5em;
    }
    .text {
      margin-top: 0.3rem;
      display: block;
      text-transform: capitalize;
      font-size: 0.9em;
      font-weight: 500;
    }
  }
  .active {
    color: var(--primary);
    .icon {
      color: var(--primary);
    }
  }
`;

export default Wrapper;
