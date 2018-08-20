// Vendor
import React, { Component } from "react";
import { AccountData, ContractForm } from "drizzle-react-components";
import ipfsApi from "ipfs-api";
const ipfs = ipfsApi({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https"
});

// Internal
import parser from "../../util/parser";
import Post from './Post';

class Feed extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
      posts: []
    };
  }
  writeToIPFS = async () => {
    const doc = await Buffer.from(
      JSON.stringify({
        copy: "This is the text that should go down the bottom",
        image: this.state.image
      })
    );
    const res = await ipfs.add(doc);
    const [cid] = res;
    const getRes = await ipfs.get(cid.path);
    const [val] = getRes;
    const ipfsStoredVal = parser(val.content.toString());
    this.setState({ posts: [...this.state.posts, ipfsStoredVal] });
  };
  captureFile = event => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      const buffer = await Buffer.from(reader.result);
      this.setState({ image: buffer });
    };
  };

  async componentDidMount() {
    const [post] = await ipfs.get(
      "Qmax1tKJFWNLcyCD5NDUBKYqanoJp9M4tryeLpGrqLLKNV"
    );
    const parsed = parser(post.content.toString());
    this.setState({ posts: [...this.state.posts, parsed] });
    global.getRes = post;
    global.post = parsed;
  }
  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <h1>Feed</h1>
            <input type="file" onChange={this.captureFile} />
            <button onClick={this.writeToIPFS}>Write to IPFS</button>
            {this.state.posts.map(Post)}
            <br />
            <br />
          </div>

          <div className="pure-u-1-1">
            <h2>PhotoSharing</h2>
            <p>My own custom contract.</p>
            {/* <p><strong>Posts</strong>: <ContractData contract="PhotoSharing" method="posts" toUtf8 /></p> */}
            <ContractForm
              contract="PhotoSharing"
              method="addAccount"
              labels={["Username"]}
            />
            <ContractForm
              contract="PhotoSharing"
              method="addPost"
              labels={["Copy", "Hash"]}
            />
            <br />
            <br />
          </div>

          <div className="pure-u-1-1">
            <h2>Active Account</h2>
            <AccountData accountIndex="0" units="ether" precision="3" />
            <br />
            <br />
          </div>
        </div>
      </main>
    );
  }
}

export default Feed;
