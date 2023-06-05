// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract random2 is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("Random2", "RMD2") {}

    function mint(uint256 amount) public {
        _mint(msg.sender, amount);
    }
}

// 1000000000000000000000000
// 100000000000000000000
// 1718849648