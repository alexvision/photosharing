pragma solidity ^0.4.24;


contract PhotoSharing {
    uint public lastAccountId = 0;
    uint public lastPostIndex = 0;
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
    
    modifier accountExists (address _accountAddress) {
        require(accounts[_accountAddress].id > 0, "Account does not exist");
        _;
    }
    modifier usernameDoesNotExist (string _username) {
        require(accounts[accountNames[_username]].id == 0, "Username already taken");
        _;
    }
    
    function addAccount(string _username)
        public
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
    
    function addPost(string _imageHash)
        public
        returns (uint)
    {
        uint post = posts.push(Post(msg.sender, _imageHash));
        accounts[msg.sender].userPosts.push(post);
        lastPostIndex = post;
        
        emit NewPost(msg.sender, post);
        return post;
    }
    
    function getAccount(address _id)
        public
        view
        accountExists(_id)
        returns (uint, string, uint[])
    {
        return (accounts[_id].id, accounts[_id].username, accounts[_id].userPosts);
    }
    
    function getPost(uint _id)
        public
        view
        returns (address, string)
    {
        return (posts[_id].poster, posts[_id].contentHash);
    }
}