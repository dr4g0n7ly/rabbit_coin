// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RabbitCoin is ERC20 {
    constructor() ERC20("RabbitCoin", "RBT") {
        _mint(msg.sender, 10000000000 * 10 ** 18);
    }
}