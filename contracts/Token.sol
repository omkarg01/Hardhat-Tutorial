// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.9.0;

import "hardhat/console.sol";

contract Token {
    // declare name, symbol, totalSupply, owner, balances (shows balances to corresponding addressess)
    string public name = "Hardhat Token";
    string public symbol = "HHT";

    address public owner;
    uint public totalSupply = 10000;

    mapping(address => uint) balances;

    // define a constructor which sets the owner and that owner will have the inital totalSupply balances
    constructor() {
        owner = msg.sender;
        balances[msg.sender] = totalSupply;
    }

    // define a function (transfer), it sends eth to specify address and amount to sent
    function transfer(address to, uint amount) public {
        console.log(
            "**Sender is sending %s tokens to %s address**",
            amount,
            to
        );

        // check the sender has enough balance tokens
        require(balances[msg.sender] >= amount, "Not enough tokens");

        // deduct the amount of sender
        balances[msg.sender] -= amount;

        // increase the amount of recipient
        balances[to] += amount;
    }

    // define a func balanceOf, which returns the balance of specify address
    function balanceOf(address _address) public view returns (uint) {
        return balances[_address];
    }
}
