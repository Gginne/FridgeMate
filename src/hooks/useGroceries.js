import { useState, useCallback, useEffect } from "react"
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export default function useGroceries(){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(null)

    const {currentUser} = useAuth()

    useEffect(() => {
        
    }, [])

    return {data, loading, err, fetchData}
}