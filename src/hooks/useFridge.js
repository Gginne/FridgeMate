import { useState, useEffect } from "react"
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export default function useFridge(){
    const [fridge, setFridge] = useState([])

    //const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const {currentUser} = useAuth()

    useEffect(() => {
        const unsubscribeFridgeItems = db.fridgeitems
          .where("user", "==", currentUser.uid)
          .onSnapshot((snapshot) => {
            
            setFridge(snapshot.docs.map(db.formatDoc))
            setLoading(false)
          })
                  /*
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
            }).catch((error) => {
                console.log("Error retrieving grocery items:", error);
                setError(error)
              }).finally(() => {
                setLoading(false)
              })
        */

        setLoading(true)

        return () => {
          unsubscribeFridgeItems();
        };
      }, [currentUser]);

    return {fridge, loading}
}