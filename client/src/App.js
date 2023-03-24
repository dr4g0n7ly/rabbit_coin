import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AccountProvider } from './AccountContext'

import Sidebar from './components/Sidebar'

function App() {

  return (
    <AccountProvider>
      <BrowserRouter>
          <Sidebar/>
            <Routes>
          </Routes>
      </BrowserRouter>
    </AccountProvider>
  );
}


export default App;
