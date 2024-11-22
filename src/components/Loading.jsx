import styled, { css } from 'styled-components';

const Loading = (p) => {
  const { minsize = '15px' } = p;
  return (
    <Container minsize={minsize}>
      <Layout />
      <div className="spinner-wrapper">
        <div className="spinner"></div>
      </div>
    </Container>
  );
};

export default Loading;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 100000;
  top: 0;
  .spinner-wrapper {
    z-index: 9999;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .spinner {
      display: inline-block;
      border: 4px solid white;
      border-radius: 50%;
      border-top: 4px solid #3d80ff;
      animation: spinner 1.5s linear infinite;
      ${(props) =>
        props.minsize &&
        css`
          min-width: ${props.minsize};
          min-height: ${props.minsize};
        `}
    }
    @keyframes spinner {
      to {
        transform: rotate(360deg);
      }
    }
  }
`;
