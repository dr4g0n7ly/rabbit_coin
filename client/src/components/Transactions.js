import { useState, useEffect, useContext } from 'react'
import { AccountContext } from '../AccountContext'
import TransactionCard from './TransactionCard'

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
        setBalance(parseInt(bal._hex)/10000000)
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
        const ethers = require("ethers")
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        let contract = new ethers.Contract(RabbitCoinJSON.address, RabbitCoinJSON.abi, signer)

        const depositPriceString = depositAmount.toString() + "000000000000" + "0000000"
        const depositAmountString = depositAmount.toString() + "0000000"

        let depositComplete = await contract.deposit(depositAmountString, {value: depositPriceString})
        console.log("depositComplete: ", depositComplete)
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
                            <p className="stat-child-2">30 days</p>
                        </div>
                        <div className="main-stat-child">
                            <p className="stat-child-1">TOTAL EXPENSES</p>
                            <p className="stat-child-2">6843909 RBT</p>
                        </div>
                        <div className="main-stat-child">
                            <p className="stat-child-1">TOTAL INCOME</p>
                            <p className="stat-child-2">8939390 RBT</p>
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
                    <p>Balance</p>
                    <p>{balance}</p>

                    <br/>
                    <br/>

                    <section>

                        <p className="home-transaction-h1">Deposit</p>
                        <br/>
                        <form onSubmit={handleDepositSubmit}>

                            <label htmlFor='amount' className='label'>Enter amount:</label>
                            <input 
                                id="deposit-amount" 
                                type="number"
                                onChange={(e) => setDepositAmount(e.target.value)}
                                value = { depositAmount }
                                required
                                autoFocus
                            />

                            <button>Deposit ETH</button>

                        </form>

                        <br/>
                        <br/>

                        <p className="home-transaction-h1">Withdraw</p>
                        <br/>
                        <form onSubmit={handleWithdrawSubmit}>

                            <label htmlFor='amount' className='label'>Enter amount:</label>
                            <input 
                                id="withdraw-amount" 
                                type="number"
                                onChange={(e) => setWithdrawAmount(e.target.value)}
                                value = { withdrawAmount }
                                required
                                autoFocus
                            />

                            <button>Withdraw ETH</button>

                        </form>

                        <br/>
                        <br/>

                        <p className="home-transaction-h1">Transfer</p>
                        <br/>
                        <form onSubmit={handleTransferSubmit}>

                            <label htmlFor='amount' className='label'>Enter amount:</label>
                            <input 
                                id="transfer-amount" 
                                type="number"
                                onChange={(e) => setTransferAmount(e.target.value)}
                                value = { transferAmount }
                                required
                                autoFocus
                            />

                            <label htmlFor='reciever' className='label'>Enter reciever address:</label>
                            <input
                                id="transfer-reciever"
                                type="text"
                                onChange={(e) => setTransferReciever(e.target.value)}
                                value = { transferReciever }
                                required
                                autoFocus
                            />  

                            <button>Transfer RBT</button>

                        </form>

                    </section>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>PLEASE CONNECT ACCOUNT</h1>
            </div>
        )
    }
}

export default Transactions