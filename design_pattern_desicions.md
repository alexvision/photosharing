# Design Patterns

This contract uses a few key design patterns to try and avoid potential issues with the code: 

## Circuit Breaker/Emergency Stop
The solidity contract has an emergency stop built in. This is only something the contract owner is allowed to use, but it allows for a stop if something does go wrong with the application to prevent further damage.

## Restricted Access
There are methods in the solidity contract that restrict the access to just the owner (such as the circut breaker and methods on the Ownable contract).

## Offloading Storage
Storage on the Etherum blockchain is very expensive. While this does store some data on the blockchain directly, as much as possible was moved off to IPFS to try and reduce storage costs. 

## Fail Early and Loud
All the failure cases for any function call are either modifiers or things that happen at the first possible instance. They also throw exceptions. This helps cut down on unnesscary computation.


## Other Patterns
A number of other patters were considered, but didn't really fall into the scope of this codebase. For example, push payments would have been used, if we expected payments as part of this system.

