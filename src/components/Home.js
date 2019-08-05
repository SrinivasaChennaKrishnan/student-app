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
    return (
      <div>
        <h3>Home Page</h3>
        <Container>
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
                    onClick={this.props.logout}
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
                    <DropdownItem>Id</DropdownItem>
                  </DropdownMenu>
                </InputGroupButtonDropdown>
                <Input placeholder="" />
                <InputGroupAddon addonType="append">
                  <Button className="glyphicon glyphicon-search" />
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
