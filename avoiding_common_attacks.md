# Avoiding Common Attacks

## Logic Bugs/Recursion
All the key methods in the contract have unit test coverage to try and avoid logic bugs. And no recursive calls are made in this application (on the solidity side at least) to avoid any issues (such as reentrancy attacks) that may occur there.

## Integer Arithmatic Overflow/Underflow
This should not be a critical concern for this application due to the minimal operations that are occuring. Additionally `uint` values are used (which are aliases for `uint256`) when large numbers are needed. These may eventually overflow, but if that happens then there are probably more performance concerns with the application that would happen before then!

## Poison Data
This application is very strict with the `require` statements that it has on each method. This should help mitigate some of the attacks by only allowing specific data.

## Exposed Functions
All the functions listed are exposed in the PhotoSharing contract outside of the stopping function. this was an intentional choice

## Malicious Admins
Given the lack of fund in this contract, this wasn't considered a huge risk, so the simplicity of a single admin made more sense.

## Tx Origin and Gas Limits
No references to `tx.origin` are made in this dapp, and there is no itteration over arrays as part of the contract to try and avoid hitting gas limits.