import React, { useState } from 'react'
import { Navbar, Stack, Text } from '@mantine/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPlus, faBowlFood, faRightFromBracket, faList} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/AuthContext"
import AddItemModal from "./../dashboard/AddItemModal";
export default function Sidebar() {
    const {logout} = useAuth()
    const [addItemOpen, setAddItemOpen] = useState(false)
  return (
    <Navbar width={{ base: 100 }} height='100%' p="lg" sx={{ backgroundColor: '#37c191'}}
    >
        <AddItemModal opened={addItemOpen} onClose={() => setAddItemOpen(false)}/>
        <Stack h='100%' justify="space-around">
          <Stack  align="center" spacing="xs">
            <FontAwesomeIcon color="white" icon={faHouse} size="2x" />
            <Text color="white">Home</Text>
          </Stack>
          <Stack align="center" spacing="xs" onClick={() => setAddItemOpen(true)}>
            <FontAwesomeIcon color="white" icon={faPlus} size="2x"/>
            <Text color="white">Add</Text>
          </Stack>
          <Stack align="center" spacing="xs">
            <FontAwesomeIcon color="white" icon={faList} size="2x" />
            <Text color="white">Lists</Text>
          </Stack>
          <Stack align="center" spacing="xs">
            <FontAwesomeIcon color="white" icon={faBowlFood} size="2x" />
            <Text color="white">Recipe</Text>
          </Stack>
          <Stack align="center" spacing="xs" onClick={logout}>
            <FontAwesomeIcon color="white" icon={faRightFromBracket} size="2x" />
            <Text color="white">Logout</Text>
          </Stack>

        </Stack>
      </Navbar>
  )
}
