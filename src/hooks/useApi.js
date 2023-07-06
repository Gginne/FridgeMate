import { useState, useCallback } from "react"
import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com', // Replace with your API base URL
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
  });

export default function useApi(endpoint){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(null)

    const fetchData = useCallback(async (params) => {
        console.log(params)
        try{
            setLoading(true)

            console.log(endpoint)
            const response = await apiClient.get(endpoint, {params})
            console.log(response)

            setData(response.data)  
        } catch(err) {
            console.log(err)
            setErr(err)
        } finally {
            setLoading(false)
        }
        

    }, [endpoint])

    return {data, loading, err, fetchData}
}