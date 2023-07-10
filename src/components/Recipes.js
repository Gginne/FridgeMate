import React, { useEffect, useMemo } from "react";
import useApi from "../hooks/useApi";
import useFridge from "../hooks/useFridge";
import IngredientList from "./recipes/IngredientList";
import { Grid, Col, Loader } from "@mantine/core";
import RecipeCard from "./recipes/RecipeCard";

export default function Recipes() {
  const recipeRequest = useApi("/recipes/findByIngredients/");
  const recipeDetailRequest = useApi("/recipes/informationBulk/");
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

  useEffect(() => {
    if(recipeRequest.data){
      const ids = recipeRequest.data.map(rec => rec.id).join(",")
      recipeDetailRequest.fetchData({ids})
    } // eslint-disable-next-line
  }, [recipeDetailRequest.fetchData, recipeRequest.data])

  const recipes = useMemo(
    () => recipeDetailRequest.data ?? [], [recipeDetailRequest.data]
  )


  return (
    <div>
      <h3>Recipes</h3>
      <IngredientList options={ingredients} onSubmitIngredients={handleSearch}/>
      <Grid mt="10px">

        {(recipeRequest.loading || recipeDetailRequest.loading) && <Loader size="sm" />   }
        {(recipeDetailRequest.data && recipes.length === 0) && (
          <div style={{margin: "1rem", color: "lightgray" }}>
          <h3>No Recipes Found</h3>
      </div>
        )}

        {recipeDetailRequest.data &&  recipes.map(recipe => (
            <Col span={4}>
                <RecipeCard data={recipe} />
            </Col>  
        )) 
          }
       
    </Grid>
    </div>
  );
}
