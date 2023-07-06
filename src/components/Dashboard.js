import React, { useState, useEffect }from "react";
import { Button } from '@mantine/core';
import AddItemModal from "./dashboard/AddItemModal";

export default function Dashboard() {
  const [addItemOpen, setAddItemOpen] = useState(false)

  return (

    <div className="">

    <AddItemModal opened={addItemOpen} onClose={() => setAddItemOpen(false)}/>
     <h2>My Fridge</h2>
     <Button onClick={() => setAddItemOpen(true)}>Add food item</Button>
     
    </div>
  );
}
