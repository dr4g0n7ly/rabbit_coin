import { useState } from 'react'
import { ethers } from 'ethers'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AccountProvider } from './AccountContext'

import Navbar from './components/Navbar'
import Home from './components/Home'

import './App.css';

function App() {
  const [loading, setLoading] = useState(true)
  const [tokenContract, setTokenContract] = useState({})

  return (
    <AccountProvider>
      <BrowserRouter>
        <div className='App'>
          <br/>
          <br/>
          <br/>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </AccountProvider>
  );
}


export default App;
