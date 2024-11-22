import { getFoods, checkInventoryForFood } from '../../api/food.api';
import { getServices } from '../../api/service.api';
import { useState, useRef, useEffect, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FaShoppingCart, FaRegTrashAlt } from 'react-icons/fa';
import {
  orderFood,
  orderService,
  getFoodsCart,
  getServicesCart,
  editFoodsOrder,
  editServicesOrder,
} from '../../api/wedding.api';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Modal from '../Modal';
import FoodServiceCard from './FoodServiceCard';
import beefImg from '../../assets/images/beef.png';
import balletImg from '../../assets/images/ballet.jpg';
import Wrapper from '../../assets/wrappers/Order/CardGroupWrapper';
import Loading from '../Loading';

const customStyle = {
  content: {
    width: '70vw',
    height: '87vh',
    left: '50%',
    top: '50%',
    padding: 0,
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,.5)',
  },
};

const PickFoodServiceModal = ({
  isOpen,
  type,
  setModalClose,
  setNextModalOpen,
  setServiceData,
  setFoodData,
  orderId,
  editOrder,
}) => {
  const [renderList, setRenderList] = useState([]);
  const cartRef = useRef(null);
  const [pickedItem, setPickedItem] = useState([]);
  const [showPickedItemList, setShowPickedItemList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const total = useMemo(
    () => pickedItem.reduce((acc, item) => acc + item.count * item.price, 0),
    [pickedItem]
  );

  const handleNextBtnClick = async () => {
    let itemTotalPrice;
    const handledList = pickedItem.map(({ id, count }) => ({
      id,
      count: count,
    }));
    try {
      if (type === 'food') {
        itemTotalPrice = await orderFood(orderId, handledList);
        setFoodData(itemTotalPrice.data.totalPrice);
      }
      if (type === 'service') {
        itemTotalPrice = await orderService(orderId, handledList);
        setServiceData(
          itemTotalPrice.data.totalPrice,
          itemTotalPrice.data.service.servicePrice
        );
      }
      setNextModalOpen();
    } catch (error) {
      toast.warning(error.message);
    }
  };

  const handleAddBtnClick = async (newItem) => {
    try {
      const foodId = newItem.id
      const upcomingCount = newItem.count
      type === 'food' && await checkInventoryForFood(foodId, upcomingCount)
      // If item existed in picked list, set new quantity
      toast.success(`${newItem.name} Added successfully!`);
      if (pickedItem.find((item) => item.id === newItem.id)) {
        const itemList = pickedItem.map((item) =>
          item.id === newItem.id ? newItem : item
        );
        return setPickedItem(itemList);
      }
      return setPickedItem([...pickedItem, newItem]);  
      
    } catch (error) {
      toast.warning(error.message);
    }
    
  };

  const handleTrashClick = (id) => {
    const newItemList = pickedItem.filter((item) => item.id !== id);
    setPickedItem(newItemList);
  };

  const handleOutsideClick = (e) => {
    if (cartRef.current && !cartRef.current.contains(e.target)) {
      setShowPickedItemList(false);
    }
  };

  const fetchData = async (type) => {
    try {
      const data = type === 'food' ? await getFoods() : await getServices();
      setRenderList(data.data);
      setIsLoading(false);
    } catch (error) {
      toast.warning(error.message);
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
        setPickedItem(fetchedItems);
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
        setPickedItem(fetchedItems);
      }
    } catch (error) {
      toast.warning(error.message);
    }
  };

  const handleSaveBtnClick = async (type) => {
    try {
      let result;
      if (type === 'food') {
        result = await editFoodsOrder(orderId, pickedItem);
        editOrder(
          result.data.foodPrice,
          result.data.remainPrice,
          result.data.totalPrice
        );
      }
      if (type === 'service') {
        result = await editServicesOrder(orderId, pickedItem);
        editOrder(
          result.data.servicePrice,
          result.data.remainPrice,
          result.data.totalPrice
        );
      }
      setModalClose();
    } catch (error) {
      toast.warning(error.message);
    }
  };

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

  useEffect(() => {
    fetchData(type);
    if (editOrder) fetchPickedItem(type);
  }, []);

  // Handle outside click event
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });

  return (
    <Modal
      isOpen={isOpen}
      setModalClose={setModalClose}
      customStyle={customStyle}
    >
       {/* <ToastContainer /> */}
      {isLoading ? (
        <Loading />
      ) : (
        <Wrapper>
          <div className="header">
            <h4>choose {type}</h4>
            <div
              className={
                showPickedItemList ? 'cart-wrapper' : 'cart-wrapper pointer'
              }
              ref={cartRef}
              onClick={() => {
                setShowPickedItemList(true);
              }}
            >
              {!showPickedItemList ? (
                <>
                  <FaShoppingCart className="icon" />
                  <span className="badge">{pickedItem.length}</span>
                </>
              ) : (
                <>
                  {/* Picked list */}
                  <div className="food-list">
                    <h6>{type} list</h6>
                    {pickedItem.length ? (
                      <>
                        <div className="food-container">
                          {pickedItem.map(({ id, count, name, price }) => (
                            <div className="food" key={id}>
                              <img
                                src={type === 'food' ? beefImg : balletImg}
                                alt={name}
                              />
                              <div className="col">
                                <span>{name}</span>
                                <div className="quantity-group">
                                  <FaMinus
                                    className="pointer"
                                    onClick={() =>
                                      handleItemAmountChange(
                                        id,
                                        (type = 'decrease')
                                      )
                                    }
                                  />
                                  <span className="quantity">{count}</span>
                                  <FaPlus
                                    className="pointer"
                                    onClick={() =>
                                      handleItemAmountChange(
                                        id,
                                        (type = 'increase')
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <span>{price * count}$</span>
                              <FaRegTrashAlt
                                className="trash"
                                onClick={() => handleTrashClick(id)}
                              />
                            </div>
                          ))}
                        </div>
                        <strong>total {total}$</strong>
                        {!editOrder ? (
                          <button className="btn" onClick={handleNextBtnClick}>
                            next:
                            {type === 'food' ? 'choose service' : 'payment'}
                          </button>
                        ) : (
                          <button
                            className="btn"
                            onClick={() => handleSaveBtnClick(type)}
                          >
                            Save
                          </button>
                        )}
                      </>
                    ) : (
                      <p>please choose some {type}s</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="container">
            {renderList.map(({ id, name, price, url, inventory }) =>{
              return(
                <FoodServiceCard
                  img={type === 'food' ? (url? url: beefImg) : (url ? url :balletImg)}
                  key={id}
                  id={id}
                  name={name}
                  price={price}
                  inventory={inventory}
                  handleAddBtnClick={handleAddBtnClick}
                />
              )
            } 
            )}
          </div>
        </Wrapper>
      )}
    </Modal>
  );
};
export default PickFoodServiceModal;
