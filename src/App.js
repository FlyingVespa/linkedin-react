import "./App.css"

import { Container } from "react-bootstrap"
import { Route } from "react-router-dom"

import Navbar from "./components/Navbar/Navbar"
import ProfilePage from "./components/ProfilePage/ProfilePage"
import Footer from "./components/Footer/Footer"
import FeedPage from "./components/FeedPage/FeedPage"
import PostPage from "./components/PostPage/PostPage"
import Notifications from "./components/Notifications/Notifications"
import Landing from "./components/LoginPage/Landing"
import Login from "./components/LoginPage/Login"
import Register from "./components/LoginPage/Register"
import NetworkFeed from "./components/Network/Network"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Container fluid className="pt-5 main">
        <Route path="/feed" exact component={FeedPage} />
        <Route path="/" exact component={Landing} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/mynetwork" exact component={NetworkFeed} />
        <Route
          path="/post/:postId"
          render={routeProps => (
            <>
              <PostPage {...routeProps} />
              <Footer />
            </>
          )}
        ></Route>

        <Route
          path="/profile/:userId"
          render={routeProps => (
            <>
              <ProfilePage {...routeProps} />
              <Footer />
            </>
          )}
        ></Route>

        <Route
          path="/notifications"
          render={routeProps => (
            <>
              <Notifications {...routeProps} />
            </>
          )}
        ></Route>
      </Container>
    </div>
  )
}

export default App
