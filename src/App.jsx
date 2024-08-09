import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Codeeditor from './components/codeeditor'
import { Box } from '@chakra-ui/react'

function App() {
  

  return (
    <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
    <Codeeditor />
  </Box>
  )
}

export default App
