import React, { useMemo } from "react";
import useApi from "../hooks/useApi";
import useFridge from "../hooks/useFridge";
import IngredientList from "./recipes/IngredientList";
import { Grid, Col } from "@mantine/core";
import RecipeCard from "./recipes/RecipeCard";

export default function Recipes() {
  const recipeRequest = useApi("/recipes/findByIngredients/");
  const { fridge } = useFridge();


  const handleSearch = (ingredients) => {
    const ingredientQuery = ingredients.join(",");
    recipeRequest.fetchData({ingredients: ingredientQuery})
    console.log(ingredientQuery)
  }

  const ingredients = useMemo(
    () =>
    fridge.map((item) => ({
        label: item.name,
        image: item.image,
        value: item.name,
        exp: item.exp
      })),
    [fridge]
  );

  

  const recipes = useMemo(
    () => recipeRequest.data ?? [], [recipeRequest.data]
  )

  console.log(recipes)

  return (
    <div>
      <h3>Recipes</h3>
      <IngredientList options={ingredients} onSubmitIngredients={handleSearch}/>
      <Grid mt="10px">
        {recipes.map(recipe => (
            <Col span={4}>
                <RecipeCard data={recipe} />
            </Col>  
        ))}
    </Grid>
    </div>
  );
}
