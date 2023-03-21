import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { AccountContext } from '../AccountContext'
import RabbitCoinJSON from '../RabbitCoin.json'

const Home = () => {

    const [balance, setBalance] = useState(0)
    const {account} = useContext(AccountContext)

    const getBalance = async () => {
        const ethers = require("ethers");

        console.log("home account", JSON.stringify(account))

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        let contract = new ethers.Contract(RabbitCoinJSON.address, RabbitCoinJSON.abi, signer)
 
        let bal = await contract.balanceOf(account)
        console.log(bal)
        setBalance(parseInt(bal._hex)/10**18)
    }

    useEffect(() => {
        getBalance()
    },[account])

    return (
        <div className="Home">
            <p className="h1">Balance</p>
            <p>{balance}</p>

            <br/>

            <p className="h1">Transfer</p>
            <form>
                
            </form>

        </div>
    )
}

export default Home