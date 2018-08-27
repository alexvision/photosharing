// Vendor
import React, { Component } from "react";
import PropTypes from "prop-types";

// Internal
import { getFromIPFS, pushToIPFS } from "../../util/ipfs";
import Post from "./Post";

class Feed extends Component {
  constructor(props, context) {
    super();
    this.contract = context.drizzle.contracts.PhotoSharing;
    this.state = {
      copy: "",
      image: null,
      posting: false,
      posts: []
    };
  }
  // This would be ideal to batch, but drizzle doesn't seem to support batching
  getPosts = async startIndex => {
    const { methods } = this.contract;
    let posts = [];
    try {
      const lastPost =
        startIndex || Number(await methods.lastPostIndex().call()) - 1;
      const fetches = [];
      for (let i = lastPost; i > 0 && fetches.length < 10; i--) {
        const val = methods.getPost(i).call();
        fetches.push(val);
      }
      const rawPosts = await Promise.all(fetches);
      for (let i = 0; i < rawPosts.length; i++) {
        posts.push(await getFromIPFS(rawPosts[i][1]));
      }
    } catch (e) {
      console.log(e);
    }
    this.setState({ posts: [...this.state.posts, ...posts] });
  };

  makePost = async event => {
    event.preventDefault();
    this.setState({ posting: true });
    const doc = await Buffer.from(
      JSON.stringify({
        copy: this.state.copy,
        image: this.state.image
      })
    );
    const hash = await pushToIPFS(doc);
    this.contract.methods.addPost(hash).send();
    const post = await getFromIPFS(hash);
    this.setState({
      copy: "",
      posting: false,
      posts: [post, ...this.state.posts]
    });
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

  handleCopyChange = event => {
    this.setState({ copy: event.target.value });
  };

  async componentDidMount() {
    this.getPosts();
  }

  render() {
    const { copy, image, posting } = this.state;
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <h1>Image Feed</h1>
            <h3>Upload pictures and add some details about it</h3>
            {posting ? (
              "Sending Post Now, it may take a while (up to several minutes for large images)"
            ) : (
              <form onSubmit={this.makePost}>
                <input type="file" onChange={this.captureFile} required />
                <div>
                  <input
                    type="text"
                    placeholder="Say something"
                    value={copy}
                    onChange={this.handleCopyChange}
                  />
                </div>
                <input type="submit" value="Write to IPFS" />
              </form>
            )}
            <br />
            <br />
            {this.state.posts.map(Post)}
          </div>
        </div>
      </main>
    );
  }
}

Feed.contextTypes = {
  drizzle: PropTypes.object
};

export default Feed;
