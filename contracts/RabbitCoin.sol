// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract RabbitCoin {

    address public minter;
    string private constant _name = "RabbitCoin";
    string private constant _symbol = "RBT";

    uint256 private constant _totalSupply = 10000000000 * 10 ** 18;
    uint8 private constant _decimals = 18;

    uint256 private constant _price = 100000000000000 wei;

    mapping(address => uint256) public balances;

    event minted(address from, uint256 amount);

    function mint(uint256 amount_ ) public {
        require(msg.sender == minter, "Only owner allowed to mint");
        balances[minter] += amount_;
        emit minted(msg.sender, amount_);
    }

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


    // WRITE --------

    error InsufficientBalance(uint256 requested, uint256 available);

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

        return true;
    }

    function deposit(uint256 amount_) public payable returns (bool) {
        require(msg.value == _price * amount_, "Insufficient Ethereum");
        balances[msg.sender] += amount_;
        balances[minter] == amount_;
        return true;
    }

}