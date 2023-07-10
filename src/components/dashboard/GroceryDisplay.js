import React, { useMemo, useState } from "react";
import { Grid, Group, TextInput  } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch} from "@fortawesome/free-solid-svg-icons";
import useFridge from "../../hooks/useFridge";
import FridgeItemCard from "./FridgeItemCard";

export default function GroceryDisplay() {
  const {fridge} = useFridge()
  const [filter, setFilter] = useState('')

  const filteredFridge = useMemo(() => {
    return filter === '' ? fridge : (
      fridge.filter(item => item.name.includes(filter))
    )
  }, [filter, fridge])
  
  return (
    <div>
      <Group position="apart">
        <h3>My Fridge</h3>
        <TextInput
          icon={<FontAwesomeIcon icon={faSearch} size="1.1rem" stroke={1.5} />}
          radius="xl"
          size="md"
          placeholder="Search on fridge"
          rightSectionWidth={42}
          onChange={(e) => setFilter(e.target.value)}
        />
      </Group>
      
      <Grid mt='1rem'>
        {filteredFridge.map((item) => (
          <Grid.Col span={3}>
            <FridgeItemCard data={item} />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}
