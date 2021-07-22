import { Row, Col } from "react-bootstrap"
import { useState, useEffect } from "react"
import { getPosts, getProfileById } from "../assets/fetch"
import FeedPostSection from "../FeedPostSection/FeedPostSection"
import AddToYourFeed from "./rightSidebar/AddToYourFeed"
import MostViewedCourses from "./rightSidebar/MostViewedCourses"
import FeedPageFooter from "./rightSidebar/FeedPageFooter"
import UserPostSection from "../SinglePost/UserPostSection"
import MyProfileCard from "./leftSidebar/MyProfileCard"
import CommunityCard from "./leftSidebar/CommunityCard"

const FeedPage = () => {
  const [posts, setPosts] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [wasUpdated, setWasUpdated] = useState(false)

  useEffect(() => {
    getProfileById("me", setCurrentUser)
  }, [])

  useEffect(() => {
    getPosts(setPosts)
    setWasUpdated(false)
  }, [wasUpdated])

  return (
    <Row>
      <Col xs={4} md={3} className="mt-2 px-1">
        <div className="section-card p-0">
          <MyProfileCard id="me" />
        </div>
        <div className="section-card p-3">
          <CommunityCard />
        </div>
      </Col>
      <Col xs={8} md={5} className="mt-2">
        <div className="section-card p-3">
          {/* We will need to get our profile data here and pass down to MostViewedCourses for the profile image */}
          <FeedPostSection onUpdate={() => setWasUpdated(true)} />
        </div>
        <UserPostSection currentUser={currentUser} posts={posts} onUpdate={() => setWasUpdated(true)} />
      </Col>
      <Col className="d-none d-md-block mt-2 px-1" md={4}>
        <div className="section-card p-3">
          <AddToYourFeed />
        </div>
        <div className="section-card p-3">
          <MostViewedCourses />
        </div>
        <div>
          <FeedPageFooter />
        </div>
      </Col>
    </Row>
  )
}

export default FeedPage
