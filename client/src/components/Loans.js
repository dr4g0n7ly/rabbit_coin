import { useState, useEffect } from "react"
import LoanForm from "./LoanForm"
import LoanCard from "./LoanCard"

import RabbitCoinJSON from '../RabbitCoin.json'
import refresh from './public/icons/refresh.png'

const Loans = () => {

    const [currentBlock, setCurrentBlock] = useState()
    const [loans, setLoans] = useState([])

    const getCurrentBlock = async () => {
        const ethers = require("ethers");

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        let contract = new ethers.Contract(RabbitCoinJSON.address, RabbitCoinJSON.abi, signer)
 
        let block = await contract.getCurrentBlock()
        setCurrentBlock(parseInt(block._hex))
    }

    useEffect(() => {
        getCurrentBlock()
    }, [])

    return (
        <div className="Loans">
            <div className="Loan-page">
                <div className="loans-heading">
                    <p className="main-h1" style={{marginTop:'40px'}}>Loans</p>
                    <div className="block-info">
                        <div className="loans-heading">
                            <p className="main-balance-h1">current block</p>
                            <img src={refresh} className='refresh-logo' alt="refresh-icon" onClick={() => getCurrentBlock()}/>
                        </div>
                        <p className="block-NUM">{currentBlock}</p>
                    </div>
                </div>
                <div className="account-cards">
                    {loans.map((acc)=>{
                        return (
                        <LoanCard acc={acc} name={acc.name} digits={acc.digits} balance={acc.balance} id={acc.id}/>
                    );})}
                    <LoanCard digits={"3400"}/>
                    <LoanCard digits={"3400"}/>
                </div>
            </div>
            <LoanForm/>
        </div>
    )
}

export default Loans