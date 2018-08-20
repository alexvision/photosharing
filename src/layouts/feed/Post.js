import React from 'react';

const Post = (props, index) => {
  // console.log(props, index);
  return (
    <section key={index}>
      <img src={props.image} style={{ height: 250, width: 250 }} />
      <div>{props.copy}</div>
    </section>
  );
};
export default Post;
