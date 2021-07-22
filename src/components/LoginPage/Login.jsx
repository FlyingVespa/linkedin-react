import React, { Component } from "react"
import { Col, Container, Row, Form, Button, Spinner } from "react-bootstrap"
import { withRouter } from "react-router-dom"
import { loginUser } from "../assets/fetch"
class Login extends Component {
  state = {
    email: "",
    password: "",
    loading: false,
    isError: false,
    errorMessage: "",
  }

  handleChange = e => {
    const value = e.target.value
    const target = e.target.name
    this.setState({ ...this.state, [target]: value })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      this.setState({ loading: true })
      const result = await loginUser(this.state)
      console.log(result)
      // const resp = await fetch(`${ENDPOINT}/user`);
      // console.log(resp);
      // const data = await resp.json();
      if (result === true) {
        this.setState({ loading: false })
        this.props.history.push("/feed")
      } else {
        this.setState({ isError: true, errorMessage: result })
        this.setState({ loading: false })
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col className="" xs={6}>
            <h1>Login</h1>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.handleChange} />
                <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChange} />
              </Form.Group>
              {this.state.loading && (
                <div className="text-center">
                  <Spinner animation="grow" />
                </div>
              )}
              {this.state.isError && <p className="text-danger">{this.state.errorMessage}</p>}

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withRouter(Login)
