import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Cover from './pages/Cover'
import Carta from './pages/Carta'
import Dedicatoria from './pages/Dedicatoria'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Cover />} />
        <Route path="/carta" element={<Carta />} />
        <Route path="/dedicatoria" element={<Dedicatoria />} />
      </Routes>
    </Layout>
  )
}
