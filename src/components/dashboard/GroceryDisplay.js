import React, { useEffect, useState } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
export default function GroceryDisplay() {
  const { currentUser } = useAuth();
  const [groceries, setGroceries] = useState([]);

  useEffect(() => {
    const unsubscribeFridgeItems = db.fridgeitems
      .where("user", "==", currentUser.uid)
      .onSnapshot((fridgeItemsSnapshot) => {
        const fetchedData = [];

        fridgeItemsSnapshot.forEach((fridgeItemDoc) => {
          const fridgeItemData = fridgeItemDoc.data();
          const groceryItemId = fridgeItemData.item;

          db.groceryitems.doc(String(groceryItemId)).get()
            .then((groceryItemDoc) => {
              if (groceryItemDoc.exists) {
                const groceryItemData = groceryItemDoc.data();

                fetchedData.push({
                  ...fridgeItemData,
                  ...groceryItemData,
                });
                
                setGroceries(fetchedData);
                
              } else {
                console.log(`Grocery item not found for ID: ${groceryItemId}`);
              }
            })
            .catch((error) => {
              console.log("Error retrieving grocery item:", error);
            });
        });
      });

    return () => {
      unsubscribeFridgeItems();
    };

  }, [currentUser]);

  console.log(groceries)

  return (
    <div>
      <h2>My Fridge</h2>
    </div>
  );
}
