import { useState } from 'react'
import { ethers } from 'ethers';
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AccountContext } from '../AccountContext'

import RabbitCoinJSON from '../RabbitCoin.json'

import './styles.css'

const Navbar = () => {

    const {account, setAccount} = useContext(AccountContext)

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
  
    } 
  
    const loadContracts = async (signer) => {
  
        const contract = new ethers.Contract(RabbitCoinJSON.address, RabbitCoinJSON.abi, signer)
        console.log("rabbit coin :", contract)

    }

    if (account) {
        return (
            <div className="Navbar">
                <p className='Navbar-logo'>Rabbit$</p>
                <Link className='Navbar-signedin number' onClick={web3Handler}>{account.slice(0, 5)+'...'}</Link>
            </div>
        )
    }

    return (
        <div className="Navbar">
            <p className='Navbar-logo'>Rabbit$</p>
            <Link className='Navbar-signin' onClick={web3Handler}>Connect wallet</Link>
        </div>
    )
}

export default Navbar