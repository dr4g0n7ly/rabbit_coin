import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { AccountContext } from '../AccountContext'
import RabbitCoinJSON from '../RabbitCoin.json'

const Home = () => {

    const [balance, setBalance] = useState(0)
    const {account} = useContext(AccountContext)

    const [depositAmount, setDepositAmount] = useState(0)

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

        let depositComplete = await contract.transfer(depositAmountString)
        console.log("depositComplete: ", depositComplete)
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



    
    // const animatePaths = () => {
    //     let path = document.querySelector('path')
    //     let pathLength = path.getTotalLength()
    
    //     path.style.strokeDasharray = pathLength + ' ' + pathLength
    //     path.style.strokeDashoffset = pathLength
    
    //     window.addEventListener('scroll', () => {
    //         var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    //         var drawLength = pathLength * scrollPercentage
    //         path.style.strokeDashoffset = pathLength - drawLength
    //     })
    // }

    return (
        <div className="Home">

            <div className='bg-circle' style={{
                top: "400px",
                right: "100px",
                height: "40vw",
                width: "50vw",
                backgroundImage: "radial-gradient(#E2CCFF 8%, transparent 70%)"
            }}/>

            <div className='bg-circle' style={{
                top: "0px",
                left: "0px",
                height: "600px",
                width: "400px",
                backgroundImage: "radial-gradient(#D8DEF9 8%, transparent 70%)"
            }}/>

            <div className='bg-circle' style={{
                top: "500px",
                left: "500px",
                height: "400px",
                width: "500px",
                backgroundImage: "radial-gradient(#F0E2C7 8%, transparent 70%)"
            }}/>

            <section>
                <p className="home-balance-h1">Balance</p>
                <p>{balance} RBT</p>
            </section>

            <br/>
            <br/>

            <section>

                <p className="home-transaction-h1">Deposit</p>
                <br/>
                <form onSubmit={handleDepositSubmit}>

                    <label htmlFor='amount' className='label'>Enter amount:</label>
                    <input 
                        id="transfer-amount" 
                        type="number"
                        onChange={(e) => setTransferAmount(e.target.value)}
                        value = { transferAmount }
                        required
                        autoFocus
                    />

                    <button>Deposit RBT</button>

                </form>

                <br/>
                <br/>

                <p className="home-transaction-h1">Withdraw</p>
                <br/>
                <form onSubmit={handleDepositSubmit}>

                    <label htmlFor='amount' className='label'>Enter amount:</label>
                    <input 
                        id="transfer-amount" 
                        type="number"
                        onChange={(e) => setTransferAmount(e.target.value)}
                        value = { transferAmount }
                        required
                        autoFocus
                    />

                    <button>Withdraw RBT</button>

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

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

            <section>
                <svg width="90%" height="auto" viewBox="0 0 1329 600" fill="none" xmlns="http://www.w3.org/2000/svg">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <path d="M1 0V117.5H142.5V289.5M142.5 289.5V518.5H720.5V599.5M142.5 289.5H292" stroke="#FF009E" stroke-width="1.5" />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <path d="M1144 288H1267V443V476.5M1267 476.5V486.5M1267 476.5L1214 503.5M1267 486.5V494.5L1200 530M1267 486.5L1318.5 513" stroke="#FF009E" stroke-width="1.5" />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <path stroke="#FF009E" stroke-width="1.5" d="M1205 505a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <path stroke="#FF009E" stroke-width="1.5" d="M1191 532a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <path stroke="#FF009E" stroke-width="1.5" d="M1318 516a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                </svg>
            </section>

        </div>
    )
}

export default Home