import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Shimmer from './components/Shimmer'
import './App.css'

const Home = lazy(() => import('./pages/Home'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const SellPage = lazy(() => import('./pages/SellPage'))
const ProductDetail = lazy(() => import('./components/ProductDetail'))

function App() {

  return (
    <>
    <Suspense fallback={<Shimmer/>}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sell' element={<SellPage />} />
        <Route path='/product/:productId' element={<ProductDetail />} />
      </Routes>
      </Suspense>
    </>
  )
}

export default App
