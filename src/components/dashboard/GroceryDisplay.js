import React, { useMemo, useState } from "react";
import { Grid, Group, TextInput, Select, Loader } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useFridge from "../../hooks/useFridge";
import { getDaysDiff } from "../../utils/helpers";
import FridgeItemCard from "./FridgeItemCard";

export default function GroceryDisplay() {
  const { loading, fridge } = useFridge();
  const [filter, setFilter] = useState("");
  const [foodState, setFoodState] = useState("all");

  const filteredFridge = useMemo(
    () =>
      fridge.filter((item) => {
        let cond = filter === "" || item.name.includes(filter);
        const daysDiff = getDaysDiff(item.exp);
        switch (foodState) {
          case "Fresh Items":
            return cond && daysDiff > 3;
          case "Near Expired Items":
            return cond && daysDiff <= 3 && daysDiff >= 0;
          case "Expired Items":
            return cond && daysDiff < 0;
          default:
            return cond;
        }
      }),

    [filter, fridge, foodState]
  );

  return (
    <div>
      <Group position="apart">
        <h3>My Fridge</h3>
        <Group>
          <Select
            placeholder="Filter by state"
            data={[
              { value: "all", label: "All Items" },
              { value: "fresh", label: "Fresh Items" },
              { value: "near", label: "Near Expired Items" },
              { value: "expired", label: "Expired Items" },
            ]}
            onSearchChange={setFoodState}
            defaultValue={"all"}
            searchValue={foodState}
          />
          <TextInput
            icon={
              <FontAwesomeIcon icon={faSearch} size="1.1rem" stroke={1.5} />
            }
            radius="xl"
            size="md"
            placeholder="Search on fridge"
            rightSectionWidth={42}
            onChange={(e) => setFilter(e.target.value)}
          />
        </Group>
      </Group>

      <Grid mt="1rem">
        {!loading && filteredFridge.length > 0 ? (
          filteredFridge.map((item) => (
            <Grid.Col span={3}>
              <FridgeItemCard data={item} />
            </Grid.Col>
          ))
        ) : (
          <div style={{margin: "1rem", color: "lightgray" }}>
              {loading ? <Loader size="sm" />  : <h3>No Items Found</h3>}
              
          </div>
        )}
      </Grid>
    </div>
  );
}
