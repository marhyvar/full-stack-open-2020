import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, updateBlog, user, removeBlog }) => {

  return (
      <div>
        {blogs.map(blog =>
            <Blog 
              key={ blog.id }
              blog={ blog }
              updateBlog={updateBlog}
              user={ user }
              removeBlog={ removeBlog }
              />
        )}
      </div>
  )
}

export default BlogList