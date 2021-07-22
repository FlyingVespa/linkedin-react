import React from "react"
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Avatar } from "@material-ui/core"
import banner from "./banner.jpg"
// import "../HomePage/SidebarLeft/SidebarLeft.css";
import "./network.css"
import { XLg } from "react-bootstrap-icons"

import { getProfiles } from "../assets/fetch"

const NetworkFeed = () => {
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    getProfiles(setProfiles)
  }, [])
  return (
    <div>
      <Container>
        <Row xs={4} className={{ display: "flex" }}>
          {profiles.map(profile => {
            return (
              <Col key={profile._id} style={{ padding: "10px" }}>
                <Card className="networkFeedCard">
                  <Image className="feedLeft-cover-img" src={banner} />
                  <XLg className="xCricleFill" />

                  <Avatar
                    src={profile.image}
                    style={{
                      width: "100px",
                      height: "100px",
                      display: "flex",
                      position: "absolute",
                      marginLeft: "60px",
                      marginTop: "30px",
                    }}
                  />
                  <Card.Body>
                    <Card.Title className="networkFeed" style={{ marginTop: "50px" }}>
                      <h2>{profile.name + " " + profile.surname || ""}</h2>
                    </Card.Title>
                    <Card.Text className="networkFeed">
                      <span>{profile.title}</span>
                    </Card.Text>
                    <Link to={`/profile/${profile._id}`} id="sidebar_person">
                      <Button className="networkFeedButton">Connect</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </div>
  )
}

export default NetworkFeed
