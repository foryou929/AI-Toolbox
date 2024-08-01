import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LipSync from './pages/LipSync';
import LivePortrait from './pages/LivePortrait';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/lip-sync' element={<LipSync />} />
        <Route path='/live-portrait' element={<LivePortrait />} />
      </Routes>
    </Router>
  )
}

export default App;
