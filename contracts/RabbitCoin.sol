// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Counters.sol";

contract RabbitCoin {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address public minter;
    string private constant _name = "RabbitCoin";
    string private constant _symbol = "RBT";

    uint256 private constant _totalSupply = 10 ** 18;
    uint8 private constant _decimals = 0;

    uint256 private constant _price = 100000 wei;

    mapping(address => uint256) public balances;

    event minted(address from, uint256 amount);

    function mint(uint256 amount_ ) public {
        require(msg.sender == minter, "Only owner allowed to mint");
        balances[minter] += amount_;
        emit minted(msg.sender, amount_);
    }

    struct LoanToken {
        uint256 tokenId;
        address payable borrower;
        uint256 principle;
        uint256 totalPayback;
        uint256 dueDate;
        uint8 status;
    }

    mapping(uint256 => LoanToken) private loans;
    mapping(uint256 => string) private tokenURIs;

    constructor() {
        minter = msg.sender;
        mint(_totalSupply);
    }


    // PURE ----------------------

    function name() public pure returns (string memory) {
        return _name;
    }

    function symbol() public pure returns (string memory) {
        return _symbol;
    }

    function totalSupply() public pure returns (uint256) {
       return _totalSupply;
    }

    function decimals() public pure returns (uint8) {
        return _decimals;
    }


    // READ ---------

    function balanceOf(address tokenOwner_) public view returns (uint256) {
        return balances[tokenOwner_];
    }

    function getCurrentBlock() public view returns (uint256) {
        return block.number;
    }

    function getTokenURI(uint256 tokenID) public view returns (string memory) {
        return tokenURIs[tokenID];
    }

    function getAllLoans() public view returns (LoanToken[] memory) {
        uint loanCount = _tokenIds.current();
        LoanToken[] memory loanList = new LoanToken[](loanCount);
        uint currentIndex = 0;
        uint currentId;
        for (uint i=0; i<loanCount; i++) {
            currentId = i+1;
            LoanToken storage currentItem = loans[currentId];
            loanList[currentIndex] = currentItem;
            currentIndex++;
        }
        return loanList;
    }

    function getLoansByUser() public view returns (LoanToken[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        uint currentId;

        for(uint i=0; i < totalItemCount; i++)
        {
            if(loans[i+1].borrower == msg.sender){
                itemCount += 1;
            }
        }

        LoanToken[] memory loanList = new LoanToken[](itemCount);
        for(uint i=0; i < totalItemCount; i++) {
            if(loans[i+1].borrower == msg.sender) {
                currentId = i+1;
                LoanToken storage currentItem = loans[currentId];
                loanList[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return loanList;
    }



    // WRITE --------

    error InsufficientBalance(uint256 requested, uint256 available);

    event Transactioned(address from, address to,  uint256 amount, uint8 transactionType, uint256 block);

    event Transfered(address from, address to, uint256 amount);

    function transfer(address receiver_, uint256 amount_) public returns (bool) {
        if(amount_ > balances[msg.sender]) {
            revert InsufficientBalance ({
                requested: amount_,
                available: balances[msg.sender]
            });
        }

        balances[msg.sender] -= amount_;
        balances[receiver_] += amount_;

        emit Transfered(msg.sender, receiver_, amount_);
        emit Transactioned(msg.s
        , to, amount, transactionType, block);

        return true;
    }


    event Deposited(address from, uint256 amount, uint256 price);

    function deposit(uint256 amount_) public payable returns (bool) {
        require(msg.value == _price * amount_, "Insufficient Ethereum");

        balances[msg.sender] += amount_;
        balances[minter] -= amount_;

        emit Deposited(msg.sender, amount_, msg.value);

        return true;
    }


    event Withdrew(address from, uint256 amount, uint256 price);

    function withdraw(uint amount_) public returns (bool) {

        if(amount_ > balances[msg.sender]) {
            revert InsufficientBalance ({
                requested: amount_,
                available: balances[msg.sender]
            });
        }

        balances[msg.sender] -= amount_;
        balances[minter] += amount_;

        payable(msg.sender).transfer(amount_ * _price);

        emit Withdrew(msg.sender, amount_, _price * amount_);
        
        return true;
    }


    event LoanRequested(address by, uint256 loanAmount, uint256 repayAmount, uint256 dueBlock);

    function requestLoan(string memory tokenURI, uint256 principle, uint256 totalPayback, uint256 duration) public returns (uint256) {
        require(totalPayback >= principle + (principle/10), "Total payback must be at least 10% more than borrowed principle");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        loans[newTokenId] = LoanToken (
            newTokenId,
            payable(msg.sender),
            principle,
            totalPayback,
            block.number + duration,
            1
        );

        tokenURIs[newTokenId] = tokenURI;

        emit LoanRequested(msg.sender, principle, totalPayback, block.number + duration);

        return newTokenId;
    }

}