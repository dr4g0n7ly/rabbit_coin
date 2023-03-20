import { useState } from 'react'
import { ethers } from 'ethers'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import RabbitCoinJSON from './RabbitCoin.json'
import './App.css';

function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [tokenContract, setTokenContract] = useState({})

  const web3Handler = async () => {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if(chainId !== '0x5') {
          await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x5' }],
          })
      }  
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'})
      setAccount(accounts[0]);
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()

      loadContracts(signer)

      console.log(account)

  } 

  const loadContracts = async (signer) => {

      const contract = new ethers.Contract(RabbitCoinJSON.address, RabbitCoinJSON.abi, signer)
      setTokenContract(contract)

      console.log("rabbit coin :", contract)
      setLoading(false)
  }

  return (
    <BrowserRouter>
      <div className='App'>
        <br/>
        <br/>
        <br/>
        hi
        <Navbar web3Handler={web3Handler} account={account}/>
        {/* { loading ? (
          < Landing />
        ):(
          <Routes>
            <Route path="/" element={<Home tokenContract={tokenContract}/>} account={account}/>
          </Routes>
        )} */}
      </div>
    </BrowserRouter>
  );
}


export default App;
