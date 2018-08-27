# Design Patterns

This contract uses a few key design patterns to try and avoid potential issues with the code: 

## Emergency Stop
The solidity contract has an emergency stop built in. This is only something the contract owner is allowed to use, but it allows for a stop if something does go wrong with the application to prevent further damage.

## Offloading Storage
Storage on the Etherum blockchain is very expensive. While this does store some data on the blockchain directly, as much as possible was moved off to IPFS to try and reduce storage costs. 

