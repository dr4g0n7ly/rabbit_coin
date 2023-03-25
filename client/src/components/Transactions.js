import { useState, useEffect, useContext } from 'react'
import { AccountContext } from '../AccountContext'
import TransactionCard from './TransactionCard'
import RequestLogin from './RequestLogin'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RabbitCoinJSON from '../RabbitCoin.json'
const blockUrl = "https://api-goerli.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=T8SCBJ2NYE2Q4C2Q55E5JQZ3FYQYUEVUCZ"

const Transactions = () => {

    const [blockNumber, setBlockNumber] = useState()
    const [transactions, setTransactions] = useState([])

    const [balance, setBalance] = useState(0)
    const {account} = useContext(AccountContext)

    const [depositAmount, setDepositAmount] = useState(0)

    const [withdrawAmount, setWithdrawAmount] = useState(0)

    const [transferAmount, setTransferAmount] = useState(0)
    const [transferReciever, setTransferReciever] = useState('')

    const getBalance = async () => {
        const ethers = require("ethers");

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        let contract = new ethers.Contract(RabbitCoinJSON.address, RabbitCoinJSON.abi, signer)
 
        let bal = await contract.balanceOf(account)
        console.log("balance: "+ bal)
        setBalance(parseInt(bal._hex))
    }

    const getTransactions = async () => {
        const ethers = require("ethers")
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(RabbitCoinJSON.address, RabbitCoinJSON.abi, provider)

        // console.log(contract.filters)

        fetch(blockUrl)
        .then((response) => response.json())
        .then((data) => setBlockNumber(data.result))
        
        const filter = contract.filters.Transfered(null, null, null)
        const results = await contract.queryFilter(filter,blockNumber-7000,blockNumber)
        setTransactions(results)
    }

    useEffect(() => {
        getBalance()
    })

    useEffect(() => {
        getTransactions()
    }, [])

    const handleDepositSubmit = async (e) => {
        e.preventDefault()

        try {
            const ethers = require("ethers")
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            let contract = new ethers.Contract(RabbitCoinJSON.address, RabbitCoinJSON.abi, signer)

            const depositPriceString = depositAmount.toString() + "00000"
            const depositAmountString = depositAmount.toString()

            console.log("depositAmountString: " + depositAmountString)

            let depositComplete = await contract.deposit(depositAmountString, {value: depositPriceString})
            console.log("depositComplete: ", depositComplete)  
        } catch (err) {
            const error = err.message.substring(0, err.message.indexOf("["))
            toast.error(error, {
                position: toast.POSITION.TOP_CENTER
            });
        }
        
    }

    const handleWithdrawSubmit = async (e) => {
        e.preventDefault()
        const ethers = require("ethers")
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        let contract = new ethers.Contract(RabbitCoinJSON.address, RabbitCoinJSON.abi, signer)

        const withdrawAmountString = ethers.utils.parseUnits(withdrawAmount.toString(),18)

        let withdrawComplete = await contract.withdraw(withdrawAmountString, {gasLimit: 3e7})
        console.log("withdrawComplete: ", withdrawComplete)
    }

    const handleTransferSubmit = async (e) => {
        e.preventDefault()
        const ethers = require("ethers");
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        let contract = new ethers.Contract(RabbitCoinJSON.address, RabbitCoinJSON.abi, signer)

        const transferAmountString = transferAmount.toString() + "0000000"

        let transferComplete = await contract.transfer(transferReciever, transferAmountString)
        console.log("transferComplete: ", transferComplete)
    }

    if (account) {
        return (
            <div className="Transactions">
                <div className="Main">
                    <p className="main-h1">Transactions</p>
                    
                    <div className="main-stats">
                        <div className="main-stat-child">
                            <p className="stat-child-0">Last</p>
                            <p className="stat-child-0">30 days</p>
                        </div>
                        <div className="main-stat-child">
                            <p className="stat-child-1">TRANSACTIONS</p>
                            <p className="stat-child-2">30</p>
                        </div>
                        <div className="main-stat-child">
                            <p className="stat-child-1">TOTAL EXPENSES</p>
                            <p className="stat-child-2">4053 RBT</p>
                        </div>
                        <div className="main-stat-child">
                            <p className="stat-child-1">TOTAL INCOME</p>
                            <p className="stat-child-2">8908 RBT</p>
                        </div>
                    </div>
                    <div className="main-trs-heads">
                        <div className="main-trs-head block-col">
                            <p className="trs-head">Block</p>
                        </div>
                        <div className="main-trs-head">
                            <p className="trs-head">Address</p>
                        </div>
                        <div className="main-trs-head">
                            <p className="trs-head">Type</p>
                        </div>
                        <div className="main-trs-head">
                            <p className="trs-head">Amount</p>
                        </div>
                    </div>
                    <div className='trs-head-line'></div>

                    <div className="transaction-list">
                        {transactions.map((trs) => {
                            const key = trs.transactionHash
                            const blockNumber = trs.blockNumber
                            var address = null
                            var type = null
                            if (JSON.stringify(account).toLowerCase() === JSON.stringify(trs.args.from).toLowerCase()) {
                                address = JSON.stringify(trs.args.to)
                                type = "Transfer RBT"
                            } 
                            else if (JSON.stringify(account).toLowerCase() === JSON.stringify(trs.args.to).toLowerCase()) {
                                address = JSON.stringify(trs.args.from).toLowerCase()
                                type = "Recieve RBT"
                            }
                            const amount = Number(trs.args.amount._hex)/10000000
                 
                            if (address) {
                                console.log("yes")
                                return (
                                    <TransactionCard key={key} block={blockNumber} address={address} type={type} amount={amount}/>
                                )
                            }
                            else {
                                console.log("no")
                                return (
                                    <div/>
                                )
                            }
                        })}
                    </div>

                </div>
                <div className="Funds">
    
                    <p className='main-balance-h1'>BALANCE <span className='main-balance-output'>{balance}</span></p>

                    <ToastContainer />

                    <section>
                        <div className='fund-card' style={{marginTop:'-12px'}}>
                            <p className="home-transaction-h1">Deposit</p>
                            <form onSubmit={handleDepositSubmit}>
                                <label htmlFor='amount' className='fund-label'>enter amount:</label>
                                <br/>
                                <input 
                                    className='fund-input'
                                    id="deposit-amount" 
                                    type="number"
                                    onChange={(e) => setDepositAmount(e.target.value)}
                                    value = { depositAmount }
                                    required
                                    autoFocus
                                />
                                <button className='fund-button' >Deposit ETH</button>
                            </form>
                        </div>

                        <div className='fund-card'>
                            <p className="home-transaction-h1">Withdraw</p>
                            <form onSubmit={handleWithdrawSubmit}>
                                <label htmlFor='amount' className='fund-label'>enter amount:</label>
                                <br/>
                                <input 
                                    className='fund-input'
                                    id="withdraw-amount" 
                                    type="number"
                                    onChange={(e) => setWithdrawAmount(e.target.value)}
                                    value = { withdrawAmount }
                                    required
                                    autoFocus
                                />
                                <button className='fund-button'>Withdraw ETH</button>
                            </form>
                        </div>

                        <div className='fund-card' style={{border:'0px'}}>
                            <p className="home-transaction-h1">Transfer</p>
                            <form onSubmit={handleTransferSubmit}>
                                <label htmlFor='amount' className='fund-label'>enter amount:</label>
                                <br/>
                                <input 
                                    className='fund-input'
                                    id="transfer-amount" 
                                    type="number"
                                    onChange={(e) => setTransferAmount(e.target.value)}
                                    value = { transferAmount }
                                    required
                                    autoFocus
                                />
                                <label htmlFor='reciever' className='fund-label'>enter reciever address:</label>
                                <br/>
                                <input
                                    className='fund-input'
                                    id="transfer-reciever"
                                    type="text"
                                    onChange={(e) => setTransferReciever(e.target.value)}
                                    value = { transferReciever }
                                    required
                                    autoFocus
                                />  
                                <button className='fund-button'>Transfer RBT</button>
                            </form>
                        </div>

                    </section>

                </div>
            </div>
        )
    }
    else {
        return (
            <RequestLogin/>
        )
    }
}

export default Transactions