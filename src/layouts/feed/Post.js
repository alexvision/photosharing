// Vendor
import React from "react";

const Post = (props, index) => (
  <section key={index}>
    <img src={props.image} style={{ maxHeight: 500, maxWidth: 500 }} />
    <div>{props.copy}</div>
  </section>
);
export default Post;
