import { Row, Col } from "react-bootstrap";
import ActivitySection from "../ActivitySection/ActivitySection";
import AlsoViewed from "../AlsoViewedSection/AlsoViewedSection";
import HeroSection from "../HeroSection/HeroSection";
// import DashboardSection from "../DashboardSection/DashboardSection"
import AboutSection from "../AboutSection/AboutSection";
import FeaturedRow from "../Featured/FeaturedRow";
import EducationRow from "../Education/EducationRow";
import ExperienceRow from "../Experience/ExperienceRow";
import { useState, useEffect } from "react";
import { getExperiencesById, getPosts, getProfileById } from "../assets/fetch";

const ProfilePage = (props) => {
  const currentUserId = props.match.params.userId;
  const isMe = currentUserId === "60f575cb61fa7f2daa893e52";
  const [profileData, setProfileData] = useState({});
  const [experiences, setExperiences] = useState([]);
  const [posts, setPosts] = useState(null);
  const [isRefreshed, setIsRefreshed] = useState(false);

  useEffect(() => {
    getProfileById(currentUserId, setProfileData);
    getExperiencesById(currentUserId, setExperiences);
    getPosts(setPosts);
    setIsRefreshed(false);
  }, [isRefreshed, currentUserId]);

  const refresh = () => {
    setIsRefreshed(true);
  };

  return (
    <Row className="align-items-start">
      <Col className="mb-3 pb-1 mt-2" xs={12} md={9}>
        <div className="section-card">
          <HeroSection
            profileData={profileData}
            experiences={experiences}
            userId={currentUserId}
            isMe={isMe}
            onUpdate={refresh}
          />
        </div>
        <div className="section-card p-3">
          <AboutSection
            profileData={profileData}
            isMe={isMe}
            onUpdate={refresh}
          />
        </div>
        <div className="section-card p-3">
          <FeaturedRow isMe={isMe} />
        </div>
        <div className="section-card p-3">
          <ActivitySection userPosts={posts} currentUserId={currentUserId} />
        </div>
        <div className="section-card p-3">
          <ExperienceRow
            experiencesData={experiences}
            onUpdate={refresh}
            isMe={isMe}
          />
        </div>
        <div className="section-card p-3">
          <EducationRow isMe={isMe} />
        </div>
      </Col>
      <Col className="d-none d-md-block my-2 px-1" md={3}>
        <div className="section-card p-3">
          <AlsoViewed />
        </div>
      </Col>
    </Row>
  );
};

export default ProfilePage;
