// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SilverCoin is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("SilverCoin", "SCO") {}

    function mint(uint256 amount) public {
        _mint(msg.sender, amount);
    }
}
// Factory: 0x006427E425EdC614ee3861Ea5Dd6e404FC35cea9
// Router: 0xA5416D286644e9bEf863b8F05de413388d4005d0
// coin: 0xdad6c1CCb145F6aE0063DC3000c18473879d8c48
// 1000000000000000000000000
// 1000000000000000000000
// 1718849648