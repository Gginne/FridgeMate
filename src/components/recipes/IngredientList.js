import React, { useState } from "react";
import { Paper, MultiSelect, Button, Stack } from "@mantine/core";

import { Avatar, Group, Text } from "@mantine/core";
import { forwardRef } from "react";

const SelectItem = forwardRef(({ image, label, exp, ...others }, ref) => {

  return (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={"https://spoonacular.com/cdn/ingredients_100x100/" + image}/>

        <div>
          <Text>{label}</Text>
          <Text size="xs" color="dimmed">
            Expires: {new Date(exp.seconds * 1000).toLocaleDateString()}
          </Text>
        </div>
      </Group>
    </div>
  );
});

export default function IngredientList({ options, onSubmitIngredients }) {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleSelectChange = (values) => {
    setSelectedValues(values);
  };

  const handleSelectIngredients = () => {
    onSubmitIngredients(selectedValues)
  }

  return (
    <Paper style={{ maxWidth: "800px" }} mt="1rem" padding="md">
      <Group>
        <MultiSelect
          data={options}
          value={selectedValues}
          searchable
          nothingFound="No Items in Fridge"
          onChange={handleSelectChange}
          placeholder="Select ingredients from fridge"
          itemComponent={SelectItem}
        />

        <Stack justify="flex-end">
          <Button type="submit" onClick={handleSelectIngredients}>Search Recipe</Button>
        </Stack>
      </Group>
    </Paper>
  );
}
