import { useState, useEffect, useContext } from "react"
import { AccountContext } from '../AccountContext'
import LoanForm from "./LoanForm"
import LoanCard from "./LoanCard"

import RabbitCoinJSON from '../RabbitCoin.json'
import refresh from './public/icons/refresh.png'

const Loans = () => {

    const [currentBlock, setCurrentBlock] = useState()
    const [loanData, setLoanData] = useState([])
    const {account} = useContext(AccountContext)

    const getCurrentBlock = async () => {
        const ethers = require("ethers");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        let contract = new ethers.Contract(RabbitCoinJSON.address, RabbitCoinJSON.abi, signer)
 
        let block = await contract.getCurrentBlock()
        setCurrentBlock(parseInt(block._hex))
    }
  
    const getIPFSGatewayURL = (ipfsURL)=>{
      let urlArray = ipfsURL.split("/");
      let ipfsGateWayURL = `https://${urlArray[2]}.ipfs.dweb.link/${urlArray[3]}`;
      return ipfsGateWayURL;
    }
  
    // const previewNFT = ({data}) =>{
    //   console.log(data.data.image);
    //   let imgViewString = getIPFSGatewayURL(data.data.image.pathname);
    //   setImageView(imgViewString);
    // }
  
    async function getAllLoans() {
        const ethers = require("ethers");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const connectedContract = new ethers.Contract(
            RabbitCoinJSON.address,
            RabbitCoinJSON.abi,
            provider.getSigner()
        );
        let allLoans = await connectedContract.getAllLoans()
        const items = await Promise.all(allLoans.map(async i => {
            const tokenURI = await connectedContract.getTokenURI(i.tokenId);
            const metaDataURL = getIPFSGatewayURL(tokenURI)
            console.log("tokenURL", metaDataURL)
            console.log("i: ", i)

            let item = {
                tokenId: i.tokenId.toString(),
                borrower: i.borrower,
                status: i.status,
                loanAmount: ethers.utils.formatUnits(i.principle.toString(), 'ether'),
                payoffAmount: ethers.utils.formatUnits(i.totalPayback.toString(), 'ether'),
                dueBlock: i.dueDate.toString()
            }
            console.log(item)
            return item
        }))
        setLoanData(items);
    }
  
    useEffect(() => {
        getCurrentBlock()
        getAllLoans()
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
                <div className="loan-trs-heads">
                        <div className="main-trs-head block-col">
                            <p className="trs-head">Status</p>
                        </div>
                        <div className="main-trs-head">
                            <p className="trs-head">Loan Amount</p>
                        </div>
                        <div className="main-trs-head">
                            <p className="trs-head">Payable Amount</p>
                        </div>
                        <div className="main-trs-head">
                            <p className="trs-head">Due block</p>
                        </div>
                        <div className="main-trs-head">
                            <p className="trs-head" style={{textAlign:'center'}}>Actions</p>
                        </div>
                    </div>
                    <div className='trs-head-line'></div>

                    <div className="transaction-list">
                        {loanData.map((loan) => {
                            if (JSON.stringify(account).toLowerCase() === JSON.stringify(loan.borrower).toLowerCase()) {
                                return (
                                    <LoanCard key={loan.tokenId} status={loan.status} loanAmount={loan.loanAmount} payoffAmount={loan.payoffAmount} dueBlock={loan.dueBlock}/>
                                )
                            }
                        })}
                    </div>
            </div>
            <LoanForm/>
        </div>
    )
}

export default Loans