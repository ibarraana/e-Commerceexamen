import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AuthProvider from './contextAPI/AuthProvider'

import MainViewComponent from './components/main-view-component'

import './App.css'

function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainViewComponent />} />
        </Routes>        
      </AuthProvider>
    </Router>
  )
}

export default App
