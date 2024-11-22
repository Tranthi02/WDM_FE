import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  height: 100%;
  width: 100%;
  padding: 0 20px;
  position: relative;
  h4 {
    text-transform: capitalize;
    font-weight: 600;
  }
  .pointer {
    cursor: pointer;
  }
  .header {
    justify-content: space-between;
    display: flex;
    height: 5%;
    align-items: center;

    .cart-wrapper {
      z-index: 999;
      top: 100px;
      position: absolute;
      top: 0;
      right: 0;

      .food-list {
        text-transform: capitalize;
        padding: 10px;
        border-radius: 6px;
        background-color: var(--white);
        box-shadow: 0px 4px 31px -5px rgba(0, 0, 0, 0.75);
        -webkit-box-shadow: 0px 4px 31px -5px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 4px 31px -5px rgba(0, 0, 0, 0.75);
        h6 {
          font-size: 1rem;
          text-transform: capitalize;
          margin-bottom: 0.7rem;
        }
        img {
          display: block;
          width: 3rem;
          height: 3rem;
          object-fit: cover;
          border-radius: 4px;
        }

        .food-container {
          height: 450px;
          overflow-y: scroll;
        }
        .food {
          margin-top: 1rem;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          column-gap: 2rem;
          font-size: 0.9rem;
          .col {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            row-gap: 0.5rem;
            flex: 1;
            .quantity-group {
              display: flex;

              svg {
                user-select: none !important;
              }

              .quantity {
                border: 1px solid var(--grey-300);
                padding: 0.1rem 0.25rem;
              }
            }
          }
          .trash {
            color: var(--red-dark);
          }
        }
        strong {
          display: block;
          margin-top: 1.2rem;
        }
        .btn {
          margin-top: 1rem;
        }
      }
    }
    .icon {
      font-size: 1.2rem;
      color: var(--primary);
    }
    .badge {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: -0.5rem;
      right: -1rem;
      background-color: var(--white);
      width: 1.5rem;
      height: 1rem;
      border-radius: 3px;
      font-size: 0.7rem;
      box-shadow: 0px 4px 31px -5px rgba(0, 0, 0, 0.75);
      -webkit-box-shadow: 0px 4px 31px -5px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 0px 4px 31px -5px rgba(0, 0, 0, 0.75);
    }
  }
  .container {
    overflow-y: scroll;
    max-height: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 10px;
    padding: 10px;
  }
  .total {
    margin-top: 20px;
    border-top: 1px solid #e3dede;
    .info {
      margin-top: 20px;
      text-align: right;
      .title {
        font-weight: 600;
      }
      .value {
      }
    }
  }
  .card {
    z-index: 1;
    position: relative;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    max-width: 32%;
    flex-grow: 1;
    .content {
      display: flex;
      flex-direction: column;
      min-height: 100px;
      h5 {
        flex: 1;
      }
    }
    .inventory {
      margin-top: 1rem;
      font-size: 0.9rem;
    }
  }
  .lob-img {
    z-index: 1;
    display: block;
    width: 100%;
    height: 11rem;
    object-fit: cover;
    border-radius: 4px;
  }
  h5 {
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: 600;
  }
  .price {
    font-size: 0.9rem;
    margin-top: 0.3rem;
  }

  .action-wrapper {
  }

  .quantity-group {
    margin-top: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 1rem;

    .quantity {
      width: 30px;
      border: 1px solid #b5b5b5;
      overflow: hidden;
      border-radius: 4px;
    }
    svg {
      user-select: none;
      font-size: 1.35rem;
      background-color: #5c5c5c;
      border-radius: 4px;
      color: white;
      padding: 5.8px 6px;
      transition: all 0.2s linear;
    }
    .icon {
      cursor: pointer;
    }
    .disable {
      color: #ffffff;
      cursor: default;
      background-color: #d5d5d5;
    }
  }
  .btn-group {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 1rem;
    margin-top: 0.7rem;
    .btn {
      font-size: 0.8rem;
      padding: 0.5rem 1rem;
      background-color: var(--black);
      user-select: none;
    }
    .reset {
      color: var(--grey-500);
      user-select: none;
      background-color: var(--grey-300);
    }
  }
`;
export default Wrapper;
