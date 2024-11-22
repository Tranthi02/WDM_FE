import { getFoods, checkInventoryForFood } from '../../../api/food.api';
import { getServices } from '../../../api/service.api';
import { useState, useRef, useEffect, useMemo, Suspense } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FaShoppingCart, FaRegTrashAlt } from 'react-icons/fa';
import {
  orderFood,
  orderService,
  getFoodsCart,
  getServicesCart,
  editFoodsOrder,
  editServicesOrder,
  getFoodsOrder,
  getServicesOrder,
} from '../../../api/wedding.api';
import { FaPlus, FaMinus } from 'react-icons/fa';
import FoodServiceCard from '../FoodServiceCard';
import beefImg from '../../../assets/images/beef.png';
import balletImg from '../../../assets/images/ballet.jpg';
import Wrapper from '../../../assets/wrappers/Order/CardGroupWrapper';
import Loading from '../../Loading';
import styled from 'styled-components';
import { PiForkKnifeBold, PiGuitarDuotone } from 'react-icons/pi';
import { formatVND } from '../../../utils';
import { Button } from 'antd';
import { RxCross2 } from "react-icons/rx";

const PickFoodService = (p) => {

  const {
    orderId,
    restrictedMode
    
  } = p
  const [Menu, setMenu] = useState("food")

  const [dataRenderList, setDataRenderList] = useState([]);
  const cartRef = useRef(null);
  const [pickedFoods, setPickedFoods] = useState([]);
  const [pickedServices, setPickedServices] = useState([]);
  const [showPickedItemList, setShowPickedItemList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const foodTotal = useMemo(
    () => pickedFoods.reduce((acc, item) => acc + item.count * item.price, 0),
    [pickedFoods]
  );
  const serviceTotal = useMemo(
    () => pickedServices.reduce((acc, item) => acc + item.count * item.price, 0),
    [pickedServices]
  );
  const [page, setPage] = useState("food")


  const handleAddBtnClick = async (newItem) => {
    try {
      const foodId = newItem.id
      const upcomingCount = newItem.count
      Menu === 'food' && await checkInventoryForFood(foodId, upcomingCount)
      // If item existed in picked list, set new quantity
      let isRemove = false
      if(upcomingCount === 0){
        isRemove = true
      } 

      // toast.success(`${newItem.name} ${msg}`);

      // update Cart
      let newCartList = []
      const existItemInCart = Menu === 'food'
        ? pickedFoods.find((item) => item.id === newItem.id)
        : pickedServices.find((item) => item.id === newItem.id)

      if (existItemInCart) { // Modify existed item
        if(Menu === "food") {
          newCartList = isRemove 
            ? pickedFoods.filter((item) => item.id !== existItemInCart.id)
            : pickedFoods.map((item) => item.id === newItem.id ? newItem : item);
  
          setPickedFoods(newCartList);
        }
        else {
          newCartList = isRemove 
            ? pickedServices.filter((item) => item.id !== existItemInCart.id)
            : pickedServices.map((item) => item.id === newItem.id ? newItem : item);

          setPickedServices(newCartList);
        }
      }
      else { // Add new item
        if(Menu === "food") {
          newCartList=[...pickedFoods, newItem]
          setPickedFoods(newCartList);  
        }
        else {
          newCartList=[...pickedServices, newItem]
          setPickedServices(newCartList);  
        }
      }

      // update food list
      setDataRenderList(prev => {
        const index = prev.findIndex(food => food.id === newItem.id);
        if (index >= 0) {
          const updatedList = [...prev];
          updatedList[index] = {
            ...updatedList[index],
            quantity: newItem.count
          };
          return updatedList;
        }
        return prev;
      });

    } catch (error) {
      toast.warning(error.message);
    }
    
  };

  const handleOutsideClick = (e) => {
    if (cartRef.current && !cartRef.current.contains(e.target)) {
      setShowPickedItemList(false);
    }
  };

  const fetchData = async (Menu) => {
    try {
      setIsLoading(true);
      const data = Menu === 'food' ? await getFoodsOrder(orderId) : await getServicesOrder(orderId);
      setDataRenderList(data.data);
      setIsLoading(false);
    } catch (error) {
      toast.warning(error.message);
      setIsLoading(false)
    }
  };

  const fetchPickedItem = async (type) => {
    try {
      let fetchedItems;
      if (type === 'food') {
        fetchedItems = await getFoodsCart(orderId);
        // handle array key name
        fetchedItems = fetchedItems.data.map(
          ({ food_id, food_name, food_price, count }) => ({
            id: food_id,
            name: food_name,
            price: food_price,
            count,
          })
        );
        setPickedFoods(fetchedItems);
      }
      if (type === 'service') {
        fetchedItems = await getServicesCart(orderId);
        // handle array key
        fetchedItems = fetchedItems.data.map(
          ({ service_id, service_name, service_price, count }) => ({
            id: service_id,
            name: service_name,
            price: service_price,
            count,
          })
        );
        setPickedServices(fetchedItems);
      }
    } catch (error) {
      toast.warning(error.message);
    }
  };

  const handleSaveBtnClick = async () => {
    try {

      if(Menu ==="food" ) {
        await editFoodsOrder(orderId, formatDataUpdateFood(pickedFoods)),
        toast.success("Foods update success !")
        setMenu("service")
        setPage("service")
        setShowPickedItemList(false)
      } else {
        await editServicesOrder(orderId, formatDataUpdateFood(pickedServices))
        toast.success("Services update success !")
        setShowPickedItemList(false)
      }

      
    } catch (error) {
      toast.warning(error.message);
    }
  };

  const formatDataUpdateFood = (dataRenderList) => {
    const result = dataRenderList.map(food => {
      return {
        id: food.id,
        count: food.count
      }
    })
    return result
  }

  useEffect(() => {
    fetchData(Menu);
    fetchPickedItem("food");
    fetchPickedItem("service");
  }, [Menu]);

  // Handle outside click event
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });

  useEffect(() => {
    setMenu(page)
  }, [page]);


  if (isLoading) {
    return <Loading/>; // Show loading spinner or fallback UI
  }

  return (
    <>
        <Suspense fallback={<Loading/>}>
          <Wrapper>
            <div className="header">
              <FSheaderContainer setPage={setPage} page={page} SeachBox={false} handleSaveBtnClick={handleSaveBtnClick} />
              <div
                className={showPickedItemList ? 'cart-wrapper' : 'cart-wrapper pointer'}
                ref={cartRef}
                onClick={() => {
                  setShowPickedItemList(true);
                }}
              >
                {
                !restrictedMode && (!showPickedItemList ? (
                  <>
                    <FaShoppingCart className="icon" />
                    <span className="badge">{Menu === 'food' ? pickedFoods.length : pickedServices.length}</span>
                  </>
                )
                : <Cart
                      Menu={Menu}
                      pickedItem={Menu ==="food" ? pickedFoods: pickedServices}
                      total={Menu ==="food" ? foodTotal: serviceTotal}
                      setPickedItem={Menu ==="food" ? setPickedFoods: setPickedServices}
                      orderId={orderId}
                      handleSaveBtnClick={handleSaveBtnClick}
                  />)}
              </div>
            </div>
            <div className="container">
              {dataRenderList.map(({ id, name, price, url, inventory, quantity }) => {
                if(restrictedMode && quantity === 0) return null 
                return (
                  <FoodServiceCard
                    img={Menu === 'food' ? (url ? url : beefImg) : (url ? url : balletImg)}
                    key={id}
                    id={id}
                    name={name}
                    price={price}
                    quantity={quantity}
                    inventory={inventory}
                    handleAddBtnClick={handleAddBtnClick}
                    restrictedMode={restrictedMode}
                  />
                );
              })}
            </div>
            <div className="total">
              <div className="info">
                <span className="title">Food Total: </span>
                <span className="value">{formatVND(foodTotal)} </span>
              </div>
              <div className="info">
                <span className="title">Service Total: </span>
                <span className="value">{formatVND(serviceTotal)} </span>
              </div>
              <div className="info">
                <span className="title">Total: </span>
                <span className="value">{formatVND(foodTotal + serviceTotal)} </span>
              </div>
            </div>
          </Wrapper>
        </Suspense>
    </>)
};



const FSheaderContainer = (p) => {
  const { setPage, page, handleSaveBtnClick } = p

  return (
      <FSheader>
          <div className="left">
              <button onClick={() => {setPage("food")}} className={`food ${page === "food" ? "active":  ""}`}><PiForkKnifeBold /> FOOD</button>
              <button onClick={() => {setPage("service")}} className={`service ${page === "service" ? "active":  ""}`}><PiGuitarDuotone /> SERVICE</button>
          </div>
          {/* <div className="right">
          <Button type="primary" onClick={handleSaveBtnClick} >Save</Button>
          </div> */}
      </FSheader>
  )
}

const FSheader = styled.div`
    height: 100%;
    /* padding-right: 4rem; */
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    .left {
        // border: 1px solid red;
        display: flex;
        width: 300px;
        height: 100%;
        align-items: end;
        // column-gap: 2rem;
        button {
            // background-color: var(--grey-100);
            width: 10rem;
            font-size: larger;
            height: 100%;
            border: 2px solid var(--grey-300);
            border-top-right-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            .icon {
              font-size: 1.3em;
            }
            &:hover{
                border-color: var(--primary);
                color: var(--primary);
                box-shadow: var(--shadow-3);
            }
          }
        .service{
          border-top-left-radius: 20px;
        }
        .food, .service {

          &.active {
            border-color: var(--primary); 
            color: var(--primary);
          }
        }
      }
    .right{
      form {
        display: flex;
        align-items: center;
        padding: 1rem;
        border-radius: 999px;
        background-color: var(--grey-100);
        border: 1px solid transparent;
        // border: 1px solid red;
        width: 18rem;
        transition: border-color 0.25s;
      }
      form:focus-within {
        border-color: var(--primary);
        .icon {
          color: var(--primary);
        }
      }
      .icon {
        color: var(--grey-300);
        margin: 0 0.5rem;
        transition: color 0.5s;
      }
      input {
        text-transform: capitalize;
      }
      input::placeholder {
        color: var(--grey-400);
        font-weight: 500;
      }
    }
    

`
export default PickFoodService;
const Cart = (p) => {
  const { Menu, pickedItem, total, setPickedItem, orderId, handleSaveBtnClick } = p

  const handleItemAmountChange = (id, type) => {
    const newList = pickedItem.map((item) => {
      if (item.id === id) {
        if (type === 'increase') return { ...item, count: item.count + 1 };
        if (type === 'decrease')
          return item.count - 1 <= 0
            ? null
            : { ...item, count: item.count - 1 };
      }
      return item;
    });
    const removedNullList = newList.filter((item) => item !== null);
    setPickedItem(removedNullList);
  };

  const handleTrashClick = (id) => {
    const newItemList = pickedItem.filter((item) => item.id !== id);
    setPickedItem(newItemList);
  };


  const formatDataUpdateFood = (dataRenderList) => {
    const result = dataRenderList.map(food => {
      return {
        id: food.id,
        count: food.count
      }
    })

    return result
  }

  return (
    <>
      {/* Picked list */}
      <div className="food-list">
        <h6>{Menu} list</h6>
        {pickedItem && pickedItem.length > 0 ? (
          <>
            <div className="food-container">
              {pickedItem.map(({ id, count, name, price }) => (
                <div className="food" key={id}>
                  <img
                    src={Menu === 'food' ? beefImg : balletImg}
                    alt={name}
                  />
                  <div className="col">
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent:"space-between",
                        gap: "5px"
                    }}>
                      <span>{name}</span>
                      <span> ({count})</span>
                     </div>
                    {/* <div className="quantity-group">
                      <FaMinus
                        className="pointer"
                        onClick={() => handleItemAmountChange(id, 'decrease')}
                      />
                      <span className="quantity">{count}</span>
                      <FaPlus
                        className="pointer"
                        onClick={() => handleItemAmountChange(id, 'increase')}
                      />
                    </div> */}
                  </div>
                  <span>{formatVND(price * count)}</span>
                  <FaRegTrashAlt
                    className="trash"
                    onClick={() => handleTrashClick(id)}
                  />
                </div>
              ))}
            </div>
            <strong>total {formatVND(total)}</strong>
              <button
                className="btn"
                onClick={() => handleSaveBtnClick()}
              >
                Save
              </button>
          </>
        ) : (
          <p>please choose some {Menu}s</p>
        )}
      </div>
    </>
  )
}