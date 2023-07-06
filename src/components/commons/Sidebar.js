import React, { useState } from 'react'
import { Card, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPlus, faBowlFood, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/AuthContext"
import AddItemModal from "./../dashboard/AddItemModal";
export default function Sidebar() {
    const {logout} = useAuth()
    const [addItemOpen, setAddItemOpen] = useState(false)
  return (
    <Card className='sidebar' shadow="md" >
             
            <Link to="/"  className="sidebar-link" title="">
                <FontAwesomeIcon icon={faHouse} size="2x" />
                <span>Home</span>
            </Link>

            <div className="sidebar-link" >
            <AddItemModal opened={addItemOpen} onClose={() => setAddItemOpen(false)}/>
                <FontAwesomeIcon icon={faPlus} size="2x" onClick={() => setAddItemOpen(true)}/>
                <span>Add</span>
            </div>

            <Link to="/"  className="sidebar-link" title="">
                <FontAwesomeIcon icon={faBowlFood} size="2x" />
                <span>Recipe</span>
            </Link>
            <Link to="/"  className="sidebar-link" title="" onClick={logout}>
                <FontAwesomeIcon icon={faRightFromBracket} size="2x" />
                <span>Logout</span>
            </Link>
    
       
     </Card>
  )
}
