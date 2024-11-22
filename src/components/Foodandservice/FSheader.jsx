import React, { useEffect, useState, useContext } from "react";
import { useRef } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { PiForkKnifeBold, PiGuitarDuotone } from "react-icons/pi";
import useDebounce from "../../hook/useDebounce";
import { findFoodByName } from "../../api/food.api";
import { findServiceByName } from "../../api/service.api";
import { FoodServiceContext } from "../../context/food.context.jsx"


const FSheader_Content = (p) => {
    const { setPage, pageRef, SeachBox=true } = p

    return (
        <div className="fsheader">
            <div className="left">
                <button onClick={() => {setPage("1"); pageRef.current = "food" }} className={`food ${pageRef.current === "food" ? "active":  ""}`}><PiForkKnifeBold /> FOOD</button>
                <button onClick={() => {setPage("2"); pageRef.current = "service"}} className={`service ${pageRef.current === "service" ? "active":  ""}`}><PiGuitarDuotone /> SERVICE</button>
            </div>
            {SeachBox && <div className="right">
                <SearchBox page={pageRef.current}/>
            </div>}
        </div>
    )
}

const SearchBox = (p) => {
    const { page } =p

    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 500); // Debounce the query input by 500 milliseconds
  
    const { setFoodSearchList, setServiceSearchList } = useContext(FoodServiceContext)

    useEffect(() => {        
        const fetchFood = async () => {
            const res = await findFoodByName(query)
            setFoodSearchList(res.data)
        }
        
        const fetchService = async () => {
            const res = await findServiceByName(query)
            setServiceSearchList(res.data)
        }

        if(query !== '') {
            page === 'food'
            ? fetchFood() 
            : fetchService()
        }else {
            cleanSearch()
        }

      }, [debouncedQuery]);

      const cleanSearch = () => {
        setFoodSearchList([])
        setServiceSearchList([])
        setQuery("")
      }
    
      useEffect(() => {
        cleanSearch()
      }, [page]);

    return (
        <form>
            <FaMagnifyingGlass className="icon" />
            <input type="text" placeholder="search" value={query} onChange={(e) => setQuery(e.target.value)}/>
        </form>
    )
}
export default FSheader_Content