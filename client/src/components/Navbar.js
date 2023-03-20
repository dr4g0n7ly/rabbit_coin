import { useState } from 'react'
import { ethers } from 'ethers';
import { Link } from 'react-router-dom'

import './styles.css'

const Navbar = ({ web3Handler, account }) => {
    if (account) {
        return (
            <div className="Navbar">
                <p className='Navbar-logo'>Rabbit$</p>
                <Link className='Navbar-signedin' onClick={web3Handler}>{account.slice(0, 5)+'...'}</Link>
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