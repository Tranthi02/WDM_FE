import { createContext, useState, useEffect } from "react";
import { getFoods, deleteFood } from "../api/food.api.js";
import { getServices, deleteService } from "../api/service.api.js";

export const FoodServiceContext = createContext(null);

const FoodServiceProvider = (p) => {
  const { children } = p;
  const [foods, setFoods] = useState([]);
  const [foodSearchList, setFoodSearchList] = useState([])

  const [services, setServices] = useState([]);
  const [serviceSearchList, setServiceSearchList] = useState([])

  useEffect(() => {
    Promise.all([getFoodData(), getServiceData()])
  }, []);

  const getFoodData = async() => {
    try {
      const foodData = await getFoods()
      setFoods(foodData.data)
    } catch (error) {
      alert(error.message)
    }
  }

  const getServiceData = async() => {
    try {
      const serviceData = await getServices()
      setServices(serviceData.data)
    } catch (error) {
      console.log(error);
    }
  }

  const foodOption = {
    updateFoodListItemById: (foodId, foodData) => {
      const newList = foods.map(item => {
          // Check if the current item's id matches the foodId
          if (item.id === foodId) {
              return {...item, ...foodData};
          }
          // If it doesn't match, return the item unchanged
          return item;
      });
  
      // Return the updated list to update the state
  
      setFoods(newList);
    },
    UpdateFoodListWithNewData: (foodData) => {
      const newList = [foodData, ...foods]
      setFoods(newList);
    },
    delete: async (id) => {
      const updatedFoodLists = foods.filter((food) => food.id !== id);
      setFoods(updatedFoodLists);
      await deleteFood(id)
    }
  }

  const serviceOption = {
    updateServiceListItemById: (serviceId, serviceData) => {
      const newList = services.map(item => {
          // Check if the current item's id matches the serviceId
          if (item.id === serviceId) {
              return {...item, ...serviceData};
          }
          // If it doesn't match, return the item unchanged
          return item;
      });

      // Return the updated list to update the state

      setServices(newList);
    },
    UpdateServiceListWithNewData: (serviceData) => {
        const newList = [serviceData, ...services]
        setServices(newList);
    },
    delete: async (id) => {
      const updatedServiceLists = services.filter((service) => service.id !== id);
      setServices(updatedServiceLists);
      await deleteService(id)
    }
  }


  const value = {
    foods,
    foodSearchList, setFoodSearchList, 
    foodOption,
    services,
    serviceSearchList, setServiceSearchList,
    serviceOption
  }
  return <FoodServiceContext.Provider value={value}>{children}</FoodServiceContext.Provider>;
};

export default FoodServiceProvider;