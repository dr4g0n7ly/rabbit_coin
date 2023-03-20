import { useState } from 'react'
import { ethers } from 'ethers';
import { Link } from 'react-router-dom'

const Navbar = ({ web3Handler, account }) => {
    if (account) {
        return (
            <div className="Navbar">
                <h2 className='Navbar-logo'>Rabbit$</h2>
                <Link className='Navbar-signedin' onClick={web3Handler}>{account.slice(0, 5)+'...'}</Link>
            </div>
        )
    }

    return (
        <div className="Navbar">
            <h2 className='Navbar-logo'>Rabbit$</h2>
            <Link className='Navbar-signin' onClick={web3Handler}>Connect wallet</Link>
        </div>
    )
}

export default Navbar