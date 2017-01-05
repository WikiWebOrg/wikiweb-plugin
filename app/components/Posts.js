import React, { PropTypes } from 'react'

const Posts = ({posts}) => (
  <ul>
    {posts.map((post, i) =>
      <li key={i}>{post}</li>
    )}
  </ul>
)

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Posts