import React, { useEffect, useState } from "react";
import { Grid } from "@mantine/core";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import FridgeItemCard from "./FridgeItemCard";

export default function GroceryDisplay() {
  const { currentUser } = useAuth();
  const [fridge, setFridge] = useState([]);

  useEffect(() => {
    const unsubscribeFridgeItems = db.fridgeitems
      .where("user", "==", currentUser.uid)
      .onSnapshot((snapshot) => {
        const fetchedDataPromises = [];
        const fetchedData = [];
  
        snapshot.forEach((fridgeItemDoc) => {
          const fridgeItemData = fridgeItemDoc.data();
          const groceryItemId = fridgeItemData.item;
  
          const promise = db.groceryitems.doc(String(groceryItemId)).get();
          fetchedDataPromises.push(promise);
          fetchedData.push({
            ...fridgeItemData,
            id: fridgeItemDoc.id
          });
        });
  
        Promise.all(fetchedDataPromises)
          .then((groceryItemSnapshots) => {
            groceryItemSnapshots.forEach((groceryItemSnapshot, index) => {
              const groceryItemDoc = groceryItemSnapshot;
  
              if (groceryItemDoc.exists) {
                const groceryItemData = groceryItemDoc.data();
  
                fetchedData[index] = {
                  ...fetchedData[index],
                  ...groceryItemData
                };
              } else {
                console.log(`Grocery item not found for ID: ${fetchedData[index].item}`);
              }
            });
  
            setFridge(fetchedData);
          })
          .catch((error) => {
            console.log("Error retrieving grocery items:", error);
          });
      });
  
    return () => {
      unsubscribeFridgeItems();
    };
  }, [currentUser]);

  console.log(fridge)
  return (
    <div>
      <h2>My Fridge</h2>
      <Grid mt='1rem'>
        {fridge.map((item) => (
          <Grid.Col span={3}>
            <FridgeItemCard data={item} />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}
