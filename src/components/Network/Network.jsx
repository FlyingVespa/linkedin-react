import React from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import banner from "./banner.jpg";
// import "../HomePage/SidebarLeft/SidebarLeft.css";
import "./network.css";
import { XLg } from "react-bootstrap-icons";
import { Nav } from "react-bootstrap";
import dotenv from "dotenv";
dotenv.config();
const NetworkFeed = () => {
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM1MzExZDcwNDBkZjAwMTU4NWM4MDIiLCJpYXQiOjE2MjY3NzE4OTQsImV4cCI6MTYyNzk4MTQ5NH0.qQBwLrP9YhLV6i04gO7-VYpUyY0fHe9U1J9cfptWNi4";

  const [profiles, setProfiles] = useState([]);
  const getProfile = async () => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/profile/",
        {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      let profiles = await response.json();
      console.log(profiles);

      setProfiles(profiles.slice(1).slice(40));
      console.log("Profiles", profiles);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("BEER");

    getProfile();
  }, []);
  return (
    <div>
      <Container>
        <Row xs={4} className={{ display: "flex" }}>
          {profiles.map((profile) => {
            return (
              <Col style={{ padding: "10px" }}>
                <Card className="networkFeedCard">
                  <Image className="feedLeft-cover-img" src={banner} />
                  <XLg className="xCricleFill" />

                  <Avatar
                    variant="top"
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
                    <Card.Title
                      className="networkFeed"
                      style={{ marginTop: "50px" }}
                    >
                      <h2>{profile.name + " " + profile.surname || ""}</h2>
                    </Card.Title>
                    <Card.Text className="networkFeed">
                      <p>{profile.title}</p>
                    </Card.Text>
                    <Nav.Link
                      href={`/profile/${profile._id}`}
                      id="sidebar_person"
                    >
                      <Button className="networkFeedButton">Connect</Button>
                    </Nav.Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default NetworkFeed;
