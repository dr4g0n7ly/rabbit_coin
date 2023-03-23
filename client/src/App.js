import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AccountProvider } from './AccountContext'

import Navbar from './components/Navbar'
import Home from './components/Home'
import Upload from './components/Upload'

import './App.css';

function App() {

  return (
    <AccountProvider>
      <BrowserRouter>
        <div className='App'>
          <br/>
          <br/>
          <br/>
          <Navbar/>
          <Routes>
            <Route path="/home" element={<Home/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </AccountProvider>
  );
}


export default App;
