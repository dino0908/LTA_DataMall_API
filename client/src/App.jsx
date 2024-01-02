import React from 'react'
import Landing from './Landing'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <div>
      <ChakraProvider>
        <Landing/>
      </ChakraProvider>
      
    </div>
  )
}

export default App