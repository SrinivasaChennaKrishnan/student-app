import React from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  Button,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.state = {
      dropdownOpen: false,
      splitButtonOpen: false
    };
  }

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleSplit() {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen
    });
  }

  render() {
    console.log("home page??????", this.props);
    let studentData = this.props.props.studentData
      ? this.props.props.studentData
      : [];
    const studentCard = studentData.map(items => (
      <Col lg="3" className="student-list">
        <Row>
          <Col lg="5">
            <img
              alt="student-pic"
              className="student-image-home"
              src="https://www.lakeportmetalcraft.com/wp-content/uploads/2018/10/user-placeholder.png"
            />
          </Col>
          <Col lg="7" className="pl0">
            <section className="student-details-home">
              <p className="student-details-p">
                <span classname="student-card-bold">Name:</span>
                {items.name}
              </p>
              <p className="student-details-p">
                <span classname="student-card-bold">Roll No:</span>
                {items.id}
              </p>
              <p className="student-details-p">
                <span classname="student-card-bold">Class:</span>
                {items.website}
              </p>
            </section>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="student-switch-icon-p">
              <img
                alt="switch-icon"
                className="switch-icon"
                src="https://p7.hiclipart.com/preview/898/313/288/silhouette-angle-monochrome-photography-fish-dolphin-refresh-thumbnail.jpg"
              />
            </p>
          </Col>
        </Row>
      </Col>
    ));
    return (
      <div>
        <Container>
          <h3>Home Page</h3>
        </Container>
        <Container className="home-container">
          <Row>
            <Col lg="6">
              <img
                className="user-icon-home"
                alt="student-list"
                src="https://cdn3.iconfinder.com/data/icons/flat-pro-user-management-set-3/32/server-user-512.png"
              />
              <span className="title-home">
                <span className="slist-font-blue-home">S</span>
                <span className="slist-font-grey-home">List</span>
              </span>
              <span className="label-count">1254 present today</span>
            </Col>
            <Col lg="6">
              <Col lg="6" />
              <Col lg="6" className="align-right">
                <span>
                  Welcome Admin! |{" "}
                  <a href="#" className="about-text">
                    About
                  </a>
                </span>
                <span>
                  <img
                    className="back-arrow"
                    alt="back"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZNFVzm23Ii_oJEp900SvUqJwJu8nrHTiiqHoAggaibUimCzOv"
                  />
                </span>
              </Col>
            </Col>
          </Row>
          <Row>
            <Col lg="6" className="search-bar">
              <InputGroup>
                <InputGroupButtonDropdown
                  addonType="prepend"
                  isOpen={this.state.splitButtonOpen}
                  toggle={this.toggleSplit}
                  className="filter-dropdown"
                >
                  <Button outline className="filter-by">
                    Filter by
                  </Button>
                  <DropdownToggle split outline className="filter-by" />
                  <DropdownMenu className="filter-drop-down">
                    <DropdownItem>Name</DropdownItem>
                    <DropdownItem>Class</DropdownItem>
                    <DropdownItem>Section</DropdownItem>
                  </DropdownMenu>
                </InputGroupButtonDropdown>
                <Input placeholder="" />
                <InputGroupAddon addonType="append">
                  <Button className="glyphicon glyphicon-search" />
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>
          <Row>{studentCard}</Row>
          <Row />
          <Row>
            <Col lg="4" />
            <Col lg="4" className="load-more-button">
              <button className="form-input-button-loadmore">Load More</button>
            </Col>
            <Col lg="4" />
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
