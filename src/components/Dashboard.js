import React, { useEffect } from "react";
import useApi from "../hooks/useApi";

export default function Dashboard() {

  const groceryReq = useApi('/food/ingredients/search')
  
  useEffect(() => {
    groceryReq.fetchData({query: 'apple'})
  }, [groceryReq.fetchData])

  return (

    <div className="">

    
     <h2>My Fridge</h2>
     
    </div>
  );
}
