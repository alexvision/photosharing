pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

/** @title Photo sharing. */
contract PhotoSharing is Ownable {
    uint public lastAccountId = 0;
    uint public lastPostIndex = 0;
    bool public isStopped = false;

    mapping (address => Account) accounts;
    mapping (string => address) accountNames;
    mapping (uint => address) accountIds;
    Post[] public posts;
    
    struct Post {
        address poster;
        string contentHash;
    }
    struct Account {
        uint id;
        string username;
        uint[] userPosts;
    }
    
    event NewUser(address indexed _from, string _username);
    event NewPost(address indexed _from, uint _value);
    
    /** @dev This modifier checks to see if an account has been registered with this contract
      * @param _accountAddress the address of the account to check
      */
    modifier accountExists (address _accountAddress) {
        require(accounts[_accountAddress].id > 0, "Account does not exist");
        _;
    }

    /** @dev This modifier checks to see if a username for an account has been registered with this contract
      * @param _username the username string to check
      */
    modifier usernameDoesNotExist (string _username) {
        require(
            accounts[accountNames[_username]].id == 0,
            "Username already taken"
        );
        _;
    }
    
    /** @dev This modifier checks to see if a the contract is stopped, and won't run it if it is
      */
    modifier notStopped() {
        require(!isStopped, "Contract is stopped");
        _;
    }

    /** @dev This function allows us to toggle the emergency stop of the contract on and off (only for the owner)
      * @param _direction the direction that the stop/start should be set
      */
    function setEmergencyStop(bool _direction) public onlyOwner() {
        isStopped = _direction;
    }
    
    /** @dev This function creates an account in the contract
      * @param _username the name the user would like to use for their account
      */
    function addAccount(string _username)
        public
        notStopped()
        usernameDoesNotExist(_username)
    {
        require(accounts[msg.sender].id == 0, "User already has an account");
        uint[] memory userPosts;
        lastAccountId++;
        accounts[msg.sender] = Account(lastAccountId, _username, userPosts);
        accountNames[_username] = msg.sender;
        accountIds[lastAccountId] = msg.sender;
        emit NewUser(msg.sender, _username);
    }
    
    /** @dev This function creates a post and adds it to the global posts storage and a reference on the user
      * @param _imageHash the hash/path of the IPFS file of the post to store
      * @return post the index of the newly created post
      */
    function addPost(string _imageHash) public notStopped() returns (uint) {
        uint post = posts.push(Post(msg.sender, _imageHash));
        accounts[msg.sender].userPosts.push(post);
        lastPostIndex = post;
        
        emit NewPost(msg.sender, post);
        return post;
    }
    
    /** @dev This function returns the values off a given account struct
      * @param _id the address of the account to find
      * @return id the id of the account
      * @return username the username of the account
      * @return userPosts the posts of the account
      */
    function getAccount(address _id)
        public
        view
        accountExists(_id)
        returns (uint, string, uint[])
    {
        return (
            accounts[_id].id,
            accounts[_id].username,
            accounts[_id].userPosts
        );
    }
    
    /** @dev This function returns the values off a given post struct
      * @param _id the index of the post to return
      * @return poster the address of the account that created the post
      * @return contentHash the IPFS path/hash for the post
      */
    function getPost(uint _id) public view returns (address, string) {
        return (posts[_id].poster, posts[_id].contentHash);
    }
}