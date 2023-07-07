import React from "react";
import { Grid } from "@mantine/core";
import useFridge from "../../hooks/useFridge";
import FridgeItemCard from "./FridgeItemCard";

export default function GroceryDisplay() {
  const {fridge} = useFridge()
  
  return (
    <div>
      <h3>My Fridge</h3>
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
