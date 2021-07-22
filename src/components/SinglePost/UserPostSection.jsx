import React from "react"
import SinglePost from "./SinglePost"
import "./singlepost.css"

const UserPostSection = ({ posts, onUpdate, currentUser }) => {
  return (
    <section className="user-posts-section">
      {posts
        // .slice(posts.length - 20)
        .reverse()
        .map(post => {
          return <SinglePost key={post._id} postInfo={post} userData={post.userId} currentUser={currentUser} onUpdate={onUpdate} />
        })}
    </section>
  )
}

export default UserPostSection
