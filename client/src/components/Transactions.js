const Transactions = () => {
    return (
        <div className="Transactions">
            <div className="Main">
                <p className="main-h1">Transactions</p>
                <div className="main-stats">
                    <div className="main-stat-child">
                        <p className="stat-child-0">Last</p>
                        <p className="stat-child-0">30 days</p>
                    </div>
                    <div className="main-stat-child">
                        <p className="stat-child-1">TRANSACTIONS</p>
                        <p className="stat-child-2">30 days</p>
                    </div>
                    <div className="main-stat-child">
                        <p className="stat-child-1">TOTAL EXPENSES</p>
                        <p className="stat-child-2">6843909 RBT</p>
                    </div>
                    <div className="main-stat-child">
                        <p className="stat-child-1">TOTAL INCOME</p>
                        <p className="stat-child-2">8939390 RBT</p>
                    </div>
                </div>
                <div className="main-trs-heads">
                    <div className="main-trs-head block-col">
                        <p className="trs-head">Block</p>
                    </div>
                    <div className="main-trs-head">
                        <p className="trs-head">Address</p>
                    </div>
                    <div className="main-trs-head">
                        <p className="trs-head">Type</p>
                    </div>
                    <div className="main-trs-head">
                        <p className="trs-head">Amount</p>
                    </div>
                </div>
                <div className="transaction-list">
                    <div className="trs-row">
                        <div className="trs-el block-col">
                            <p className="">Block</p>
                        </div>
                        <div className="trs-el">
                            <p className="">Address</p>
                        </div>
                        <div className="trs-el">
                            <p className="">Type</p>
                        </div>
                        <div className="trs-el">
                            <p className="">Amount</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Funds">Deposit</div>
        </div>
    )
}

export default Transactions