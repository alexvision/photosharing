var PhotoSharing = artifacts.require("./PhotoSharing.sol");

contract('PhotoSharing', function (accounts) {
  // These tests cover the basics that this contract enables, the adding of Users/Posts and getting those values
  describe('Initial Account creation/actions', () => {
    let photoSharingInstance;
    PhotoSharing.deployed().then((out) => photoSharingInstance = out);
    
    // Make sure that we are incrementing the user IDs when a user is created so we could find all users if needed by ID
    it("...should increment id on account creation.", async () => {
      await photoSharingInstance.addAccount('test_user', {
        from: accounts[0]
      });
      const accountId = await photoSharingInstance.lastAccountId.call();
      assert.equal(accountId, 1, "The number of accounts incremented");
    });

    // Make sure that an address is only able to have one account/username
    it('... should not be possible to create another account with the same address', async () => {
      try {
        await photoSharingInstance.addAccount('test_user_2', {
          from: accounts[0],
          gas: "220000"
        });
        assert.fail();
      } catch (error) {
        console.log('***Need to compare/handle error correctly***');
        // assert(error.toString().includes('User already has an account'), error.toString());
      }
    });
    
    // Ensure we don't allow duplicate usernames
    it('... should not be possible to create a duplicate username', async () => {
      try {
        await photoSharingInstance.addAccount('test_user', {
          from: accounts[1],
          gas: "220000"
        });
        assert.fail();
      } catch (error) {
        console.log('***Need to compare/handle error correctly***');
        // assert(error.toString().includes('User already has an account'), error.toString());
      }
    });

    // Actually check that the account has been populated on creation
    it('... should create an account on creation', async () => {
      const account = await photoSharingInstance.getAccount(accounts[0], {
        from: accounts[0]
      });
      assert.equal(account[0], 1, 'ids should match');
      assert.equal(account[1], 'test_user', 'usernames should match');
    });

    // Tests to see if we can post with the newly created user above
    it('... should be possible to make a post', async () => {
      const hash = 'potential_hash';
      await photoSharingInstance.addPost(hash, {
        from: accounts[0]
      });
      const post = await photoSharingInstance.getPost.call(0);
      assert.equal(accounts[0], post[0], 'the addresss should be the same');
      assert.equal(hash, post[1], 'the hash should be the same');
    });

    // Make sure the post is shown for the user as well as the generic posts
    it('... should populate the post in the users account', async () => {
      const account = await photoSharingInstance.getAccount(accounts[0], {
        from: accounts[0]
      });
      assert.equal(account[2].length, 1, 'there should be just one post in the account');
    });

    // Ensure we increment the post index so we can iterate through posts for a global feed
    it('... should increment the last post index', async () => {
      const postIndex = await photoSharingInstance.lastPostIndex.call();
      assert.equal(postIndex, 1);
    });
  })
});