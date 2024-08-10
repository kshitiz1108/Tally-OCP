import { useState } from 'react'
import { Navigate, Route, Router, Routes, useLocation } from "react-router-dom"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Codeeditor from './components/codeeditor'
import { Box } from '@chakra-ui/react'
import HomePage from './pages/HomePage'
import AllContests from './pages/AllContests'
import ContestPage from './pages/ContestPage'
import CodePlayground from './pages/CodePlayground'
import Login from './pages/Login'
import Register from './pages/Register'
import AddProblem from './pages/AddProblem'
import AllProblem from './pages/AllProblem'
import ProblemPage from './pages/ProblemPage'
import CreateContest from './pages/CreateContest'

function App() {
  

  return (
    <Box position={'relative'}>
    <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/add-problem' element={<AddProblem/>}/>
    <Route path='/all-problem' element={<AllProblem/>}/>
    <Route path='/problem/:problemid' element={<ProblemPage/>}/>
    <Route path='/create-contest' element={<CreateContest/>}/>
    <Route path='/all-contests' element={<AllContests/>}/>
    <Route path='/contest/:contestId' element={<ContestPage/>}/>
    <Route path='/code-playground' element={<CodePlayground/>}/>
    </Routes>
  </Box>
  )
}

export default App
