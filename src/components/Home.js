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
      pageSize: 10,
      pageNum: 1,
      searchValue: "",
      filter: ""
    };
  }
  componentDidMount() {
    this.props.getStudentData();
  }

  toggleSplit = () => {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen
    });
  };

  switchPresence = (index, isAdmin) => {
    if (isAdmin) {
      let isPresent = this.state.isPresent;
      let searchMargin = document.getElementById("search").classList;
      if (isPresent.includes(index)) {
        for (var i = 0; i < isPresent.length; i++) {
          if (isPresent[i] === index) {
            isPresent.splice(i, 1);
          }
        }
      } else {
        isPresent.push(index);
      }
      this.setState({
        isPresent,
        message: "Status Changed!"
      });
      searchMargin.remove("home-margin");
      setTimeout(() => {
        this.setState({
          message: ""
        });
        searchMargin.add("home-margin");
      }, 10000);
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
      pageSize: prevState.pageSize + 10,
      pageNum: prevState.pageNum + 1
    }));
    this.props.getStudentData();
  };
  selectedFilter = event => {
    this.setState({
      filter: event.currentTarget.innerText,
      dropdownOpen: !this.state.dropdownOpen
    });
  };
  onInputChange = (event, studentData) => {
    this.setState({ searchValue: event.target.value });
    let searchTerm = this.state.searchValue;
    this.props.searchStudent(searchTerm, studentData);
  };

  filterResults = studentData => {
    this.props.searchStudent(this.state.searchValue, studentData);
  };

  handleData = (obj, n) => {
    return Object.keys(obj)
      .sort()
      .slice(0, n)
      .reduce(function(data, current) {
        data[current] = obj[current];
        return data;
      }, []);
  };

  render() {
    let homeProps = this.props;
    let homeState = this.state;
    let isAdmin = homeProps.user === "admin" ? true : false;
    let isLoading =
      (homeProps.stateData && homeProps.stateData.loading) || false;
    const toggleFunc = this.selectedFilter;
    let studObject = homeProps.props.studentData;
    let studentData = studObject ? studObject : [];
    studentData = this.handleData(studentData, homeState.pageSize);
    let isLoadMoreDisable =
      studObject && studObject.length === studentData.length;
    let filteredData = homeProps.filteredData;
    studentData =
      filteredData.length > 0 && homeState.searchValue !== ""
        ? filteredData
        : studentData;
    studentData =
      studentData &&
      studentData.map((item, index) => {
        var studArray = Object.assign({}, item);
        studArray.isPresent = homeState.isPresent.includes(index)
          ? true
          : false;
        return studArray;
      });
    const studentCard =
      studentData &&
      studentData.map((items, index) => (
        <Col
          lg="3"
          id={`student-card-${index}`}
          className={
            items.isPresent ? "student-list-blue" : "student-list-grey"
          }
        >
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

    if (homeState.logOut || !homeProps.user) {
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
                {homeState.isPresent.length} present today
              </span>
            </Col>
            <Col lg="6">
              <Col lg="6" />
              <Col lg="6" className="login-details-content">
                <span>
                  Welcome{" "}
                  {`${homeProps.user.substring(0, 5)} ${
                    homeProps.user.length > 5 ? "..." : ""
                  }`}{" "}
                  |{" "}
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
          {homeState.message !== "" && (
            <Row>
              <Col lg="12">
                <section className="message-home">
                  {homeState.message}{" "}
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
          <Row id="search" className="home-margin">
            <Col lg="6" className="search-bar">
              <InputGroup className="search-bar-home">
                <InputGroupButtonDropdown
                  addonType="prepend"
                  isOpen={homeState.splitButtonOpen}
                  toggle={this.toggleSplit}
                  className="filter-dropdown"
                >
                  <Button className="filter-by">Filter by</Button>
                  <DropdownToggle split className="filter-by" />
                  <DropdownMenu
                    value={homeState.filter}
                    className="filter-drop-down"
                  >
                    <DropdownItem
                      value="Name"
                      onClick={event => toggleFunc(event)}
                    >
                      Name
                    </DropdownItem>
                    <DropdownItem
                      value="RollNo"
                      onClick={event => toggleFunc(event)}
                    >
                      RollNo
                    </DropdownItem>
                    <DropdownItem
                      value="Class"
                      onClick={event => toggleFunc(event)}
                    >
                      Class
                    </DropdownItem>
                  </DropdownMenu>
                </InputGroupButtonDropdown>
                <Input
                  onChange={event => this.onInputChange(event, studentData)}
                  value={homeState.searchValue}
                  className="search-bar-home"
                  placeholder=""
                />
                <InputGroupAddon addonType="append">
                  <Button
                    onClick={studentData => this.filterResults(studentData)}
                    className="glyphicon glyphicon-search search-button"
                  />
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
          {isLoading && (
            <Row>
              <Col lg="12" className="loading-icon">
                <img
                  alt="loader"
                  src="https://salesoutcomes.com/wp-content/uploads/2019/03/reboot.gif"
                />
              </Col>
            </Row>
          )}
          {!isLoading && <Row>{studentCard}</Row>}
          {!isLoading && (
            <Row>
              <Col lg="4" />
              <Col lg="4" className="load-more-button">
                <Button
                  id="load-more"
                  onClick={this.handleLoadMore}
                  className="form-input-button-loadmore"
                  disabled={isLoadMoreDisable}
                >
                  Load More
                </Button>
              </Col>
              <Col lg="4" />
            </Row>
          )}
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getStudentData: getStudentData,
  logIn: logIn,
  searchStudent: searchStudent
};
const mapStateToProps = state => {
  const { userObject } = state;
  return {
    stateData: state,
    user: (userObject || {}).username || "",
    filteredData: state.filteredData || {}
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
