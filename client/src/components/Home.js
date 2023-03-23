import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { AccountContext } from '../AccountContext'
import RabbitCoinJSON from '../RabbitCoin.json'

const Home = () => {

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
        console.log(bal)
        setBalance(parseInt(bal._hex)/10**18)
    }

    useEffect(() => {
        getBalance()
    })

    const handleDepositSubmit = async (e) => {
        e.preventDefault()
        const ethers = require("ethers")
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        let contract = new ethers.Contract(RabbitCoinJSON.address, RabbitCoinJSON.abi, signer)

        const depositAmountString = depositAmount.toString() + "000000000000000000"

        let depositComplete = await contract.deposit(depositAmountString)
        console.log("depositComplete: ", depositComplete)
    }

    const handleWithdrawSubmit = async (e) => {
        e.preventDefault()
        const ethers = require("ethers")
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        let contract = new ethers.Contract(RabbitCoinJSON.address, RabbitCoinJSON.abi, signer)

        const withdrawAmountString = withdrawAmount.toString() + "000000000000000000"

        let withdrawComplete = await contract.withdraw(withdrawAmountString)
        console.log("withdrawComplete: ", withdrawComplete)
    }

    const handleTransferSubmit = async (e) => {
        e.preventDefault()
        const ethers = require("ethers");
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        let contract = new ethers.Contract(RabbitCoinJSON.address, RabbitCoinJSON.abi, signer)

        const transferAmountString = transferAmount.toString() + "000000000000000000"

        let transferComplete = await contract.transfer(transferReciever, transferAmountString)
        console.log("transferComplete: ", transferComplete)

    }

    return (
        <div className="Home">

            {/* purple 1 */}
            <div className='bg-circle' id='bg-circle-purple'/>

            {/* blue 1 */}
            <div className='bg-circle' id='bg-circle-blue'/>

            {/* yellow 1 */}
            <div className='bg-circle' id='bg-circle-yellow'/>


            <section className='home-myaccount-section'>
                <p className="home-transaction-h1">My Account</p>
                <br/>
                <div className='my-account-container'>
                    <div>
                        <p>balance</p>
                        <p className='number'>{balance} RBT</p>
                    </div>
                    <div>
                        <p>Account address</p>
                        <p className='number'>{account}</p>
                    </div>
                </div>
            </section>

            <br/>
            <br/>

            <section className='home-transaction-section'>

                <div className='home-transaction-card'>
                    <p className="home-transaction-h1">Deposit</p>
                    <br/>
                    <form onSubmit={handleDepositSubmit}>
                        <label htmlFor='amount' className='label'>Enter amount:</label>
                        <br/>
                        <input 
                            id="deposit-amount" 
                            type="number"
                            onChange={(e) => setDepositAmount(e.target.value)}
                            value = { depositAmount }
                            required
                            autoFocus
                        />
                        <br/>
                        <button>Deposit RBT</button>
                    </form>
                </div>

                <div className='home-transaction-card'>
                    <p className="home-transaction-h1">Withdraw</p>
                    <br/>
                    <form onSubmit={handleWithdrawSubmit}>
                        <label htmlFor='amount' className='label'>Enter amount:</label>
                        <br/>
                        <input 
                            id="withdraw-amount" 
                            type="number"
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            value = { withdrawAmount }
                            required
                            autoFocus
                        />
                        <br/>
                        <button>Withdraw RBT</button>
                    </form>
                </div>
                
                <div className='home-transaction-card'>
                    <p className="home-transaction-h1">Transfer</p>
                    <br/>
                    <form onSubmit={handleTransferSubmit}>
                        <label htmlFor='amount' className='label'>Enter amount:</label>
                        <br/>
                        <input 
                            id="transfer-amount" 
                            type="number"
                            onChange={(e) => setTransferAmount(e.target.value)}
                            value = { transferAmount }
                            required
                            autoFocus
                        />
                        <br/>
                        <label htmlFor='reciever' className='label'>Enter reciever address:</label>
                        <br/>
                        <input
                            id="transfer-reciever"
                            type="text"
                            onChange={(e) => setTransferReciever(e.target.value)}
                            value = { transferReciever }
                            required
                            autoFocus
                        />  
                        <br/>
                        <button>Transfer RBT</button>
                    </form>
                </div>

            </section>

        </div>
    )
}

export default Home