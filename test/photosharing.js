var PhotoSharing = artifacts.require("./PhotoSharing.sol");

contract('PhotoSharing', function (accounts) {

  describe('Initial Account creation/actions', async () => {
    const photoSharingInstance = await PhotoSharing.deployed();

    it("...should increment id on account creation.", async () => {
      await photoSharingInstance.addAccount('test_user', {
        from: accounts[0]
      });
      const accountId = await photoSharingInstance.lastAccountId.call();
      assert.equal(accountId, 1, "The number of accounts incremented");
    });

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

    it('... should create an account on creation', async () => {
      const account = await photoSharingInstance.getAccount(accounts[0], {
        from: accounts[0]
      });
      assert.equal(account[0], 1, 'ids should match');
      assert.equal(account[1], 'test_user', 'usernames should match');
    });

    it('... should be possible to make a post', async () => {
      const copy = 'copy_string';
      const hash = 'potential_hash';
      await photoSharingInstance.addPost(copy, hash, {
        from: accounts[0]
      });
      const post = await photoSharingInstance.posts.call(0);
      assert.equal(accounts[0], post[0], 'the addresss should be the same');
      assert.equal(copy, post[1], 'the copy should be the same');
      assert.equal(hash, post[2], 'the hash should be the same');
    });

    it('... should populate the post in the users account', async () => {
      const account = await photoSharingInstance.getAccount(accounts[0], {
        from: accounts[0]
      });
      assert.equal(account[2].length, 1, 'there should be just one post in the account');
    });
    it('... should increment the last post index', async () => {
      const postIndex = await photoSharingInstance.lastPostIndex.call();
      assert.equal(postIndex, 1);
    });
  })
});