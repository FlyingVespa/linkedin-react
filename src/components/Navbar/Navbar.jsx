import { useState } from "react"
import { Container } from "react-bootstrap"
import { Link, withRouter } from "react-router-dom"

import "./Navbar.css"

const Navbar = ({ location }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const currentPath = location.pathname
  return (
    <nav className="fixed-top top-navbar d-flex border-bottom">
      <Container fluid="md" className="d-flex align-items-center">
        <Link to="/">
          <i className="fab fa-linkedin mr-2"></i>
        </Link>
        <div className="p-1 d-flex align-items-center rounded search-container-big">
          <div>
            <i className="fas fa-search mx-3"></i>
          </div>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.currentTarget.value.toLowerCase())}
          ></input>
        </div>
        <ul className="d-flex justify-content-end align-items-center w-100 h-100">
          <li className={currentPath === "/" ? "active" : ""}>
            <Link to="/feed">
              <i className="fas fa-home"></i>
              <span className="d-none d-md-block">Home</span>
            </Link>
          </li>
          <li className={currentPath === "/mynetwork" ? "active" : ""}>
            <Link to="/mynetwork">
              <i className="fas fa-user-friends"></i>
              <span className="d-none d-md-block">Network</span>
            </Link>
          </li>
          <li className={currentPath === "/jobs" ? "active" : ""}>
            <Link to="/jobs">
              <i className="fas fa-briefcase"></i>
              <span className="d-none d-md-block">Jobs</span>
            </Link>
          </li>
          <li className={currentPath === "/messaging" ? "active" : ""}>
            <Link to="/messaging">
              <i className="fas fa-comment-dots"></i>
              <span className="d-none d-md-block pr-1">Messaging</span>
            </Link>
          </li>
          <li className={currentPath === "/notifications" ? "active" : ""}>
            <Link to="/notifications">
              <i className="fas fa-bell"></i>
              <span className="d-none d-md-block pl-1">Notifications</span>
            </Link>
          </li>
          <li className={currentPath === "/profile/me" ? "active" : ""}>
            <Link to="/profile/me">
              <i className="fas fa-user-circle"></i>
              <span className="d-none d-md-block">Me</span>
            </Link>
          </li>
          <li className={"border-left d-none d-sm-flex" + currentPath === "/work" ? " active" : ""}>
            <Link to="/work">
              <i className="fas fa-th"></i>
              <span className="d-none d-md-block">Work</span>
            </Link>
          </li>
          <li id="premium" className="d-none d-lg-flex">
            <a href="https://www.linkedin.com/premium/products/" target="_blank" rel="noreferrer">
              <span className="text-center">Try Premium Free for 1 month</span>
            </a>
          </li>
        </ul>
      </Container>
    </nav>
  )
}

export default withRouter(Navbar)
