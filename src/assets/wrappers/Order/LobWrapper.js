import styled from 'styled-components';

const Wrapper = styled.div`
  h4 {
    margin-top: 2rem;
    text-transform: capitalize;
    text-align: center;
    font-weight: 600;
  }
  .container {
    padding: 2rem 3rem 3rem 3rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
  .card {
    position: relative;
    padding: 1rem;
    cursor: pointer;
    border-radius: 8px;
    box-shadow: 0px 2px 8px 0px rgba(78, 78, 78, 0.2);
    -webkit-box-shadow: 0px 2px 8px 0px rgba(78, 78, 78, 0.2);
    -moz-box-shadow: 0px 2px 8px 0px rgba(78, 78, 78, 0.2);
  }
  .lob-img {
    display: block;
    width: 100%;
    height: 11rem;
    object-fit: cover;
    border-radius: 4px;
  }
  h5 {
    margin-top: 1rem;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
  }
  .shift-wrapper {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .shift {
    font-size: 0.75rem;
    text-transform: capitalize;
  }
  .busy {
    color: var(--red-dark);
  }
  .choose-shift {
    position: absolute;
    right: 0;
    bottom: 50%;
    translate: 0 50%;
    border-radius: 6px;
    width: max-content;
    height: max-content;
    background-color: var(--white);
    box-shadow: 0px 2px 12px 0px rgba(78, 78, 78, 0.9);
    -webkit-box-shadow: 0px 2px 12px 0px rgba(78, 78, 78, 0.9);
    -moz-box-shadow: 0px 2px 12px 0px rgba(78, 78, 78, 0.9);
    text-transform: capitalize;
    text-align: center;
    h6 {
      font-size: 1rem;
      padding: 0.5rem 1rem;
    }
    .shift {
      display: block;
      font-size: 0.8rem;
      padding: 0.8rem;
      color: var(--black);
      border-radius: 6px;
      background-color: var(--white);
      transition: 0.2s ease;
    }
    .shift:hover {
      color: var(--white);
      background-color: var(--primary);
    }
  }
`;

export default Wrapper;
