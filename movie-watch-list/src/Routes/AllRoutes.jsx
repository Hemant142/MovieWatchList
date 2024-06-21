import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../Pages/HomePage'

import MovieDetailsPage from '../Pages/MovieDetailsPage'

export default function AllRoutes() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/movie/:id' element={<MovieDetailsPage/>}></Route>
    </Routes>
  )
}
