import { ethers } from 'ethers';
import { Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { AccountContext } from '../AccountContext'

import './styles.css'
import rflogo from '../components/public/icons/rabbit-finance.png'
import trsicon from '../components/public/icons/transaction.png'
import lnsicon from '../components/public/icons/loan.png'
import stsicon from '../components/public/icons/statistics.png'
import usricon from '../components/public/icons/user.png'

import RabbitCoinJSON from '../RabbitCoin.json'

const Sidebar = () => {
    const {account, setAccount} = useContext(AccountContext)

    useEffect(() => {      
        const getAccounts = async () => {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'})
            console.log(accounts)
            setAccount(accounts[0]);
        }

        getAccounts()

        return () => {
            console.log("account: ",account)
        }
    });

    const web3Handler = async () => {

        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if(chainId !== '0x5') {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x5' }],
            })
        }  
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
  
        loadContracts(signer)
  
    } 
  
    const loadContracts = async (signer) => {
  
        const contract = new ethers.Contract(RabbitCoinJSON.address, RabbitCoinJSON.abi, signer)
        console.log("rabbit coin :", contract)

    }

    const Login = () => {
        if (account) {
            return (
                <div className='side-user'>
                    <img className='side-user-img' src={usricon} alt='user icon'/>
                    <p>{account.slice(0,5)}...{account.slice(account.length-3)}</p>
                </div>
            )
        } else {
            return (
                <div className='no-login'>
                    <button className='side-user-button' onClick={web3Handler}>Connect wallet</button>
                </div>
            )
        }
    }

    return (
        <div className="Sidebar">
            <div className='sidebar-logo'>
                <img className='sidebar-logo-img' src={rflogo}/>
                <p className='sidebar-logo-text'>Rabbit$</p>
            </div>

            <div className='side-links'>
                <Link className='side-link' to="/">
                    <img className='side-link-img' src={trsicon} alt='transaction icon'/>
                    <p className='side-link-text'>Transactions</p>
                </Link>
                <Link className='side-link' to="/loan">
                    <img className='side-link-img' src={lnsicon} alt='loan icon'/>
                    <p className='side-link-text'>Loans</p>
                </Link>
                <Link className='side-link' id='side-link-3'>
                    <img className='side-link-img' src={stsicon} alt='statistics icon'/>
                    <p className='side-link-text'>Token statistics</p>
                </Link>
            </div>

            <div className='side-login'>
                <Login/>
            </div>
        </div>
    )
}

export default Sidebar