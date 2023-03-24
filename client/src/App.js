import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AccountProvider } from './AccountContext'

import Sidebar from './components/Sidebar'

import './App.css';

function App() {

  return (
    <AccountProvider>
      <BrowserRouter>
        <div className='App'>
          <Sidebar/>
          <Routes>
          </Routes>
        </div>
      </BrowserRouter>
    </AccountProvider>
  );
}


export default App;
