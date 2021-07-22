import React, { Component } from "react";
import { Container, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import dotenv from "dotenv";
dotenv.config();

const ENDPOINT = process.env.REACT_APP_API_URL;
export default class Register extends Component {
  state = {
    name: "",
    surname: "",
    email: "",
    password: "",
    title: "",
    image: "",
    bio: "",
    area: "",
    loading: false,
    isError: false,
    errorMessage: "",
  };

  handleChange = (e) => {
    const value = e.target.value;
    const target = e.target.name;
    this.setState({ ...this.state, [target]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      this.setState({ loading: true });

      const resp = await fetch(`${ENDPOINT}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          name: this.state.name,
          surname: this.state.surname,
          area: this.state.area,
          username: this.state.username,
          title: this.state.title,
          bio: this.state.bio,
        }),
      });
      const data = await resp.json();
      console.log(data);
      if (resp.ok) {
        localStorage.setItem("token", data.token);
        this.setState({ loading: false });
        this.props.history.push("/profile/me");
      } else {
        console.log(data);
        this.setState({ isError: true, errorMessage: data.error });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col className="" xs={6}>
            <h1>Register</h1>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter name"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                      type="text"
                      name="surname"
                      placeholder="Enter surname"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Area</Form.Label>
                    <Form.Control
                      type="text"
                      name="area"
                      placeholder="Enter City Location"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Enter Unique Username"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="What is your job title?"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  type="text"
                  name="bio"
                  placeholder="Describe yourself and what you do"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Enter email"
                  onChange={this.handleChange}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
              </Form.Group>
              {this.state.loading && (
                <div className="text-center">
                  <Spinner animation="grow" />
                </div>
              )}
              {this.state.isError && (
                <p className="text-danger">{this.state.errorMessage}</p>
              )}
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
