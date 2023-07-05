import React from 'react'
import { Card, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPlus, faBowlFood, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/AuthContext"
export default function Sidebar() {
    const {logout} = useAuth()
  return (
    <Card className='sidebar' shadow="md" >
        
             
            <Link to="/"  className="sidebar-link" title="">
                <FontAwesomeIcon icon={faHouse} size="2x" />
                <span>Home</span>
            </Link>
    
      
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
