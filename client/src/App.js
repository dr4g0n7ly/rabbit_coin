import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AccountProvider } from './AccountContext'

import Sidebar from './components/Sidebar'
import Transactions from './components/Transactions';
import Loans from './components/Loans';

function App() {

  return (
    <AccountProvider>
      <BrowserRouter>
          <Sidebar/>
          <Routes>
          <Route path="/" element={<Transactions/>} />
          <Route path="/loan" element={<Loans/>} />
          </Routes>
      </BrowserRouter>
    </AccountProvider>
  );
}


export default App;
