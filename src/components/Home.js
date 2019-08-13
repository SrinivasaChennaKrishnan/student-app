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
import { getStudentData, searchStudent, logIn } from "../actions/logInActions";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      splitButtonOpen: false,
      isPresent: [],
      message: "",
      logOut: false,
      pageSize: 20,
      searchValue: "",
      filter: ""
    };
  }
  componentDidMount() {
    this.props.getStudentData(this.state.pageSize);
  }

  toggleDropDown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  toggleSplit = () => {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen
    });
  };

  switchPresence = (index, isAdmin) => {
    if (isAdmin) {
      let isPresent = this.state.isPresent;
      let getId = `student-card-${index}`;
      let studentCard = document.getElementById(getId).classList;
      if (isPresent.includes(index)) {
        isPresent.pop(index);
        studentCard.remove("student-list-blue");
      } else {
        isPresent.push(index);
        studentCard.add("student-list-blue");
      }
      this.setState({
        isPresent,
        message: "Status Changed!"
      });
    }
  };

  closeMessage = () => {
    this.setState({
      message: ""
    });
  };
  logOutFromHome = () => {
    this.setState({ logOut: true });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      pageSize: prevState.pageSize + 20
    }));
    this.props.getStudentData(this.state.pageSize);
  };
  selectedFilter = event => {
    this.setState({ filter: event.target.textContent });
  };
  onInputChange = event => {
    this.setState({ searchValue: event.target.value });
    searchStudent(this.state.searchValue);
  };

  render() {
    let isAdmin = this.props.user === "admin" ? true : false;
    let studentData = this.props.props.studentData
      ? this.props.props.studentData
      : [];
    const studentCard =
      studentData &&
      studentData.map((items, index) => (
        <Col lg="3" id={`student-card-${index}`} className="student-list-grey">
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
                  {items.index}
                </p>
                <p className="student-details-p">
                  <span classname="student-card-bold">Class:</span>
                  {items.company}
                </p>
              </section>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="student-switch-icon-p">
                <img
                  alt="switch-icon"
                  className={isAdmin ? "switch-icon" : "switch-icon-disabled"}
                  onClick={this.switchPresence.bind(this, index, isAdmin)}
                  src="https://p7.hiclipart.com/preview/898/313/288/silhouette-angle-monochrome-photography-fish-dolphin-refresh-thumbnail.jpg"
                />
              </p>
            </Col>
          </Row>
        </Col>
      ));

    if (this.state.logOut || !this.props.user) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
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
              <span className="label-count">
                {this.state.isPresent.length} present today
              </span>
            </Col>
            <Col lg="6">
              <Col lg="6" />
              <Col lg="6" className="login-details-content">
                <span>
                  Welcome {this.props.user.substring(0, 5) + "..."} |{" "}
                  <Link className="about-text" to="/about">
                    About
                  </Link>
                </span>
                <span>
                  <img
                    className="back-arrow"
                    onClick={this.logOutFromHome}
                    alt="back"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZNFVzm23Ii_oJEp900SvUqJwJu8nrHTiiqHoAggaibUimCzOv"
                  />
                </span>
              </Col>
            </Col>
          </Row>
          {this.state.message !== "" && (
            <Row>
              <Col lg="12">
                <section className="message-home">
                  {this.state.message}{" "}
                  <span>
                    <img
                      alt="close"
                      className="icon-close"
                      onClick={this.closeMessage}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtxfU96sEkIlztdlExKGNBC_VzPajxKElxhWbLbZc1oyF1P0rKqQ"
                    />
                  </span>
                </section>
              </Col>
            </Row>
          )}
          <Row>
            <Col lg="6" className="search-bar">
              <InputGroup className="search-bar-home">
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
                  <DropdownMenu
                    value={this.state.filter}
                    className="filter-drop-down"
                  >
                    <DropdownItem>
                      <span
                        value="Name"
                        onClick={event => this.selectedFilter(event)}
                      >
                        Name
                      </span>
                    </DropdownItem>
                    <DropdownItem>
                      <span
                        value="RollNo"
                        onClick={event => this.selectedFilter(event)}
                      >
                        RollNo
                      </span>
                    </DropdownItem>
                    <DropdownItem>
                      <span
                        value="Class"
                        onClick={event => this.selectedFilter(event)}
                      >
                        Class
                      </span>
                    </DropdownItem>
                  </DropdownMenu>
                </InputGroupButtonDropdown>
                <Input
                  onChange={event => this.onInputChange(event)}
                  value={this.state.searchValue}
                  className="search-bar-home"
                  placeholder=""
                />
                <InputGroupAddon addonType="append">
                  <Button className="glyphicon glyphicon-search" />
                </InputGroupAddon>
              </InputGroup>
            </Col>
            <Col lg="6" className="search-bar-info">
              <p className="attendance-info-absent">
                <span className="icon-absent">__</span>
                Absent
              </p>
              <p className="attendance-info-present">
                <span className="icon-present">__</span>
                Present
              </p>
            </Col>
          </Row>
          <Row>{studentCard}</Row>
          <Row />
          <Row>
            <Col lg="4" />
            <Col lg="4" className="load-more-button">
              <Button
                onClick={this.handleLoadMore}
                className="form-input-button-loadmore"
              >
                Load More
              </Button>
            </Col>
            <Col lg="4" />
          </Row>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getStudentData: getStudentData,
  logIn: logIn
};
const mapStateToProps = state => {
  const { userObject } = state;
  return { stateData: state, user: (userObject || {}).username };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
