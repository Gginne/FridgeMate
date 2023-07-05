import React from 'react'
import { Center } from '@mantine/core';
export default function CenteredContainer({children}) {
  return (
    <Center  
    mt='xl' 
      >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        {children}
    </div>
    </Center>
    // className="d-flex mt-5 justify-content-center"
  )
}
