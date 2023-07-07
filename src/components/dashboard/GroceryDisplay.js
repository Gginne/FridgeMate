import React from "react";
import { Grid } from "@mantine/core";
import useFridge from "../../hooks/useFridge";
import FridgeItemCard from "./FridgeItemCard";

export default function GroceryDisplay() {
  const {fridge, error} = useFridge()
  
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
