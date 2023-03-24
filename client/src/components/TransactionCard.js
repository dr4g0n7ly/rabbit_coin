const TransactionCard = (props) => {
    return (
        <div className="trs-row">
            <div className="trs-el block-col">
                <p className="">{props.block}</p>
            </div>
            <div className="trs-el">
                <p className="">{props.address}</p>
            </div>
            <div className="trs-el">
                <p className="">{props.type}</p>
            </div>
            <div className="trs-el">
                <p className="">{props.amount}</p>
            </div>
        </div>
    )
}

export default TransactionCard