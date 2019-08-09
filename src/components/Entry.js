import React from "react";
import "../styles.css";
import { connect } from "react-redux";
import { Container, Row, Col, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Redirect } from "react-router-dom";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toLoginPage: false
    };
  }

  switchLogin = () => {
    this.setState({ toLoginPage: true });
  };
  render() {
    if (this.state.toLoginPage) {
      return <Redirect to="/login" />;
    }
    return (
      <Container className="home-container-main">
        <Row>
          <Col>
            <h1>Login to Student details</h1>
          </Col>
        </Row>
        <Row>
          <Col lg="3" />
          <Col lg="6">
            <Button onClick={this.switchLogin} className="form-input-button">
              Click here to Login
            </Button>
          </Col>
          <Col lg="3" />
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  studentData: state.data
});
export default connect(
  mapStateToProps,
  null
)(Main);
