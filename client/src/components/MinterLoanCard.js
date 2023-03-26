const MinterLoanCard = (props) => {
    console.log("mint")
    if (props.status == 1) {
        return (
            <div className="loan-row-mint">
                <div className="loan-el block-col">
                    <p className="">{props.borrower}</p>
                </div>
                <div className="loan-el block-col">
                    <p className="">requested</p>
                </div>
                <div className="loan-el">
                    <p className="">{props.loanAmount} Eth</p>
                </div>
                <div className="loan-el">
                    <p className="">{props.payoffAmount} Eth</p>
                </div>
                <div className="loan-el">
                    <p className="">{props.dueBlock}</p>
                </div>
                <button className="loan-el-button">Accept Loan</button>
            </div>
        )
    } else if (props.status == 2) {
        return (
            <div className="loan-row">
                <div className="loan-el block-col">
                    <p className="">{props.borrower}</p>
                </div>
                <div className="loan-el block-col">
                    <p className="">accepted</p>
                </div>
                <div className="loan-el">
                    <p className="">{props.loanAmount} Eth</p>
                </div>
                <div className="loan-el">
                    <p className="">{props.payoffAmount} Eth</p>
                </div>
                <div className="loan-el">
                    <p className="">{props.dueBlock}</p>
                </div>
                <div className="loan-el" style={{textAlign:'center'}}>
                    <p className="">-</p>
                </div>
            </div>
        )
    } else if (props.status == 3) {
        return (
            <div className="loan-row">
                <div className="loan-el block-col">
                    <p className="">paid</p>
                </div>
                <div className="loan-el">
                    <p className="">{props.loanAmount} Eth</p>
                </div>
                <div className="loan-el">
                    <p className="">{props.payoffAmount} Eth</p>
                </div>
                <div className="loan-el">
                    <p className="">{props.dueBlock}</p>
                </div>
                <div className="loan-el" style={{textAlign:'center'}}>
                    <p className="">-</p>
                </div>
            </div>
        )
    } else if (props.status == 4) {
        return (
            <div className="loan-row">
                <div className="loan-el block-col">
                    <p className="">Defaulted</p>
                </div>
                <div className="loan-el">
                    <p className="">{props.loanAmount} Eth</p>
                </div>
                <div className="loan-el">
                    <p className="">{props.payoffAmount} Eth</p>
                </div>
                <div className="loan-el">
                    <p className="">{props.dueBlock}</p>
                </div>
                <button className="loan-el-button">Accept Loan</button>
            </div>
        )
    } else if (props.status == 5) {
        return (
            <div className="loan-row">
                <div className="loan-el block-col">
                    <p className="">Cancelled</p>
                </div>
                <div className="loan-el">
                    <p className="">{props.loanAmount} Eth</p>
                </div>
                <div className="loan-el">
                    <p className="">{props.payoffAmount} Eth</p>
                </div>
                <div className="loan-el">
                    <p className="">{props.dueBlock}</p>
                </div>
                <div className="loan-el" style={{textAlign:'center'}}>
                    <p className="">-</p>
                </div>
            </div>
        )
    }
}
export default MinterLoanCard