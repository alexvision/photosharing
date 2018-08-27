# Avoiding Common Attacks

## Logic Bugs/Recursion
All the key methods in the contract have unit test coverage to try and avoid logic bugs. And no recursive calls are made in this application (on the solidity side at least) to avoid any issues (such as reentrancy attacks) that may occur there.