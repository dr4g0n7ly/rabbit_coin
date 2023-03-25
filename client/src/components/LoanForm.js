import React, {useState, useContext} from 'react';
import { AccountContext } from '../AccountContext'
import { NFTStorage } from "nft.storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import HarmonyNFT from "../abi/HarmonyNFT.json";
// import { ethers } from 'ethers';
const APIKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGFEQjA0NkVhMGY5YTA1ZmUxOTYwN2JjOTI3ODFjNDBhNkRmNURhOGIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3OTcyNTkxNjU0MywibmFtZSI6IlJhYmJpdCBmaW5hbmNlIn0.X2I1N3m8ULaDGw86LXKQMXVTVOcA7wtodCaQRjYC0Uc';
// const nftContractAddress = '<YOUR-NFT-SMART-CONTRACT-ADDRESS>';

const LoanForm =() => {

    const {account} = useContext(AccountContext)
    const [errorMessage, setErrorMessage] = useState(null);
    const [uploadedFile, setUploadedFile] = useState();
    const [loanDetails, setLoanDetails] = useState();
    const [imageView, setImageView] = useState();
    const [metaDataURL, setMetaDataURl] = useState();
    const [txURL, setTxURL] = useState();
    const [txStatus, setTxStatus] = useState();

    const handleFileUpload = (event) => {
        console.log("file is uploaded");
        setUploadedFile(event.target.files[0]);
        setTxStatus("");
        setImageView("");
        setMetaDataURl("");
        setTxURL("");
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
        //1. upload NFT content via NFT.storage
        console.log("loan details: ", JSON.stringify(loanDetails))
        const metaData = await uploadCollateralContent(uploadedFile, JSON.stringify(account), JSON.stringify(loanDetails));
        console.log("metaData: ", metaData)
        
        // //2. Mint a NFT token on Your Smart contract
        // const mintNFTTx = await sendTxToHarmony(metaData);

        //3. preview the minted nft
        // previewNFT(metaData);
    }

    // const sendTxToHarmony = async(metadata) =>{
    //     try {
    //         setTxStatus("Sending mint transaction to Harmony Blockchain.");
    //         const provider = new ethers.providers.Web3Provider(window.ethereum);
    //         const connectedContract = new ethers.Contract(
    //             nftContractAddress,
    //             HarmonyNFT.abi,
    //             provider.getSigner()
    //         );
    //         const mintNFTTx = await connectedContract.mintItem(metadata.url);
    //         return mintNFTTx;
    //     } catch (error) {
    //         setErrorMessage("Failed to send tx to Harmony.");
    //         console.log(error);
    //     }
    // }

    return(
        <div className='Loan-form'>
            <ToastContainer/>
            <form>

                <p className="home-transaction-h1">Request new Loan</p>

                <p style={{marginBottom:'4px'}}>Collateral details: </p>
                <textarea
                    value={loanDetails}
                    onChange={handleDetailsChange}
                    rows={24}
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