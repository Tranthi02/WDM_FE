import { useEffect } from 'react';
import { getFoods, deleteFood } from './api/food.api';
import { createService } from './api/service.api';
import { getUsers } from './api/user.api';


const Test = () => {

  const func = () => {
    const id = "a7S8d9F0g1H2j3K4l5n";
    const data = {
      "name": "dance 3",
        "price": 2004,
        "status": true,
        "inventory": 100
    }
    
    getUsers(data).then(res => {
      console.log(res)
    });
  }

  return (
    <button onClick={func}>hello</button>

  );
};

export default Test;
