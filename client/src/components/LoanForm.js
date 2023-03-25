import React, {useState, useContext} from 'react';
import { AccountContext } from '../AccountContext'
import { NFTStorage } from "nft.storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import HarmonyNFT from "../abi/HarmonyNFT.json";
// import { ethers } from 'ethers';
import RabbitCoinJSON from '../RabbitCoin.json'
const APIKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGFEQjA0NkVhMGY5YTA1ZmUxOTYwN2JjOTI3ODFjNDBhNkRmNURhOGIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3OTcyNTkxNjU0MywibmFtZSI6IlJhYmJpdCBmaW5hbmNlIn0.X2I1N3m8ULaDGw86LXKQMXVTVOcA7wtodCaQRjYC0Uc';
// const nftContractAddress = '<YOUR-NFT-SMART-CONTRACT-ADDRESS>';

const LoanForm =() => {

    const {account} = useContext(AccountContext)
    const [uploadedFile, setUploadedFile] = useState()
    const [loanDetails, setLoanDetails] = useState()
    const [principle, setPrinciple] = useState(0)
    const [totalRepay, setTotalRepay] = useState(0)
    const [duration, setDuration] = useState(0)

    const [errorMessage, setErrorMessage] = useState(null)
    const [imageView, setImageView] = useState()
    const [metaDataURL, setMetaDataURl] = useState()
    const [txURL, setTxURL] = useState()
    const [txStatus, setTxStatus] = useState()

    const handleFileUpload = (event) => {
        console.log("file is uploaded");
        setUploadedFile(event.target.files[0]);
        setTxStatus("");
        setImageView("");
        setMetaDataURl("");
        setTxURL("");
        setErrorMessage("")
    }

    const handleDetailsChange = event => {
        // 👇️ access textarea value
        setLoanDetails(event.target.value);
        console.log(event.target.value);
      };

    const uploadCollateralContent = async(inputFile, owner, details) =>{
        const nftStorage = new NFTStorage({token: APIKEY});
        console.log("upload: ", details)
        try {
            setTxStatus("Uploading NFT to IPFS & Filecoin via NFT.storage.");
            const metaData = await nftStorage.store({
                name: "collateral",
                description: "loan collateral details",
                owner: owner,
                details: details,
                image: inputFile
            });
            setMetaDataURl(getIPFSGatewayURL(metaData.url));
            return metaData;

        } catch (error) {
            setErrorMessage("Could not save Collateral document to Storage - Aborted request.");
            console.log(error)
            toast.error(errorMessage, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    const requestContract = async(metadata) =>{
        try {
            setTxStatus("Sending loan request to RabbitCoin smart-contract.");
            const ethers = require("ethers");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const connectedContract = new ethers.Contract(
                RabbitCoinJSON.address,
                RabbitCoinJSON.abi,
                provider.getSigner()
            );
            const weiPrinciple = ethers.utils.parseUnits(principle, 'ether')
            const weiTotalRepay = ethers.utils.parseUnits(totalRepay, 'ether')
            const loanToken = await connectedContract.requestLoan(metadata.url, weiPrinciple, weiTotalRepay, duration);
            return loanToken;
        } catch (error) {
            setErrorMessage("Failed to request loan from RabbitCoin.");
            console.log(error);
            toast.error(errorMessage, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    const getIPFSGatewayURL = (ipfsURL)=>{
        let urlArray = ipfsURL.split("/");
        let ipfsGateWayURL = `https://${urlArray[2]}.ipfs.dweb.link/${urlArray[3]}`;
        return ipfsGateWayURL;
    }

    const previewNFT = (metaData) =>{
        let imgViewString = getIPFSGatewayURL(metaData.data.image.pathname);;
        setImageView(imgViewString);
        setMetaDataURl(getIPFSGatewayURL(metaData.url));
        // setTxURL('https://explorer.pops.one/tx/'+ mintNFTTx.hash);
        setTxStatus("NFT is minted successfully!");
    }

    const mintNFTToken = async(event, uploadedFile) =>{
        event.preventDefault();
        setErrorMessage("")
        setTxStatus("");
        setImageView("");
        setMetaDataURl("");
        setTxURL("");
        //1. upload NFT content via NFT.storage
        const metaData = await uploadCollateralContent(uploadedFile, JSON.stringify(account), JSON.stringify(loanDetails));
        console.log("metaData: ", metaData)
        
        // //2. Mint a NFT token on Your Smart contract
        const loanToken = await requestContract(metaData);
        if (loanToken) {
            toast.success(txStatus , {
                position: toast.POSITION.TOP_CENTER
            });
        }
        console.log(loanToken)
        setErrorMessage("")
        setTxStatus("");
        setImageView("");
        setMetaDataURl("");
        setTxURL("");
    }

    return(
        <div className='Loan-form'>
            <ToastContainer/>
            <form>

                <p className="home-transaction-h1">Request new Loan</p>

                <p style={{marginBottom:'4px'}}>Loan Amount: </p>
                <input type="number" name="amount" onChange={(event)=>{setPrinciple(event.target.value)}}/>

                <p style={{marginBottom:'4px'}}>Total pay-off Amount: </p>
                <input type="number" name="payamount" onChange={(event)=>{setTotalRepay(event.target.value)}}/>
           
                <p style={{marginBottom:'4px'}}>Duration (in blocks): </p>
                <input type="number" name="duration" onChange={(event)=>{setDuration(event.target.value)}}/>
           
                <p style={{marginBottom:'4px'}}>Collateral details: </p>
                <textarea
                    value={loanDetails}
                    onChange={handleDetailsChange}
                    rows={10}
                    cols={40}
                />

                <input className='input-file' type="file" onChange={handleFileUpload}></input>
                <br/>
                <button className='fund-button' style={{marginTop:'24px', height:'48px'}} onClick={e=>mintNFTToken(e, uploadedFile)}>Request Loan</button>

            </form>

            {txStatus && <p>{txStatus}</p>}
            {imageView && <img className='NFTImg' src={imageView} alt="NFT preview"/>}
            {metaDataURL && <p><a href={metaDataURL}>Metadata on IPFS</a></p>}
            {txURL && <p><a href={txURL}>Loan request transaction</a></p>}
            {errorMessage}
        </div>
        
    );
}
export default LoanForm;