import React, { useState, useEffect } from "react";
import logic from "../../logic/index";
import CardBundle from "../../components/CardBundle";
import Card from "../../components/Card";

function Landing({handleProductDetail}) {
  const [ranSelection, setRandomSelection] = useState(null)
  
  useEffect(() =>{
    handleRetrieveByRandom()
  },[])

  const handleRetrieveByRandom = async () => {
      const randomSelection = await logic.retrieveRandomSelection()
      setRandomSelection(randomSelection)
  };

  return (
    <>
      {ranSelection && <CardBundle ranSelection={ranSelection} handleProductDetail={handleProductDetail}/>}
      {ranSelection && <CardBundle ranSelection={ranSelection} handleProductDetail={handleProductDetail}/>}
      {ranSelection && <CardBundle ranSelection={ranSelection} handleProductDetail={handleProductDetail}/>}

    </>
  );
}
export default Landing;
