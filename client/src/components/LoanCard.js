const LoanCard = (props) => {
    return (
        <div className="account-card">
            <p className="acc-num">Status: {props.digits}</p>
            <p className="acc-num">Loan amount: {props.digits}</p>
            <p className="acc-num">Total pay-off amount: {props.digits}</p>
            <p className="acc-num">Due block: {props.digits}</p>
        </div>
    )
}
export default LoanCard