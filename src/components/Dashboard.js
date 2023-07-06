import React, { useState, useEffect }from "react";
import { Button } from '@mantine/core';
import AddItemModal from "./dashboard/AddItemModal";
import useApi from "../hooks/useApi";

export default function Dashboard() {
  const [addItemOpen, setAddItemOpen] = useState(false)
  // const groceryReq = useApi('/food/ingredients/search')
  
  // useEffect(() => {
  //   groceryReq.fetchData({query: 'apple'})
  // }, [groceryReq.fetchData])


  return (

    <div className="">

    <AddItemModal opened={addItemOpen} onClose={() => setAddItemOpen(false)}/>
     <h2>My Fridge</h2>
     <Button onClick={() => setAddItemOpen(true)}>Add food item</Button>
     
    </div>
  );
}
