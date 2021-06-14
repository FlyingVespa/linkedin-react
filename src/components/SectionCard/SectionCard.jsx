import { Row, Col } from "react-bootstrap"

import "./SectionCard.css"

const SectionCard = props => {
  return (
      <Col xs={12} md={9} className="section-card p-3">
        {props.children}
      </Col>
  )
}

export default SectionCard
