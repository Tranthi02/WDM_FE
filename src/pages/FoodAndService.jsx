import FSheader_Content from "../components/Foodandservice/FSheader";
import FContent from "../components/Foodandservice/FContent";
import SContent from "../components/Foodandservice/SContent";
import { useState, useRef } from 'react';
import FoodServiceProvider from "../context/food.context.jsx"

const FoodAndService = () => {
  const [getPage, setPage] = useState("1")

  const pageRef = useRef("food")

  return (
    <FoodServiceProvider>
      <FSheader_Content setPage={setPage} pageRef={pageRef} />
      {getPage === "1" && <FContent />}
      {getPage === "2" && <SContent />}
    </FoodServiceProvider>
  );
};
export default FoodAndService;
