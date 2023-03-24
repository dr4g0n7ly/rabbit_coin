const TransactionCard = (props) => {
    console.log("block: ", props.block)
    console.log("address: ", props.address)
    console.log("type: ", props.type)
    console.log("amount: ", props.amount)
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