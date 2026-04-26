import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { Collapse, NavbarToggler, Container } from "reactstrap";
// import { Link } from "react-router-dom";
import Link from "next/link";
import styles from "./NavbarComponent.module.css";
const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { IsLoggedIn, ToggleLoginModal, actions, state } =
    useContext(AuthContext);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={styles.navwrapper}>
      {!!state.user && state.user.admin && (
        <Container
          fluid
          className="d-flex justify-content-left"
          style={{
            height: "50px",
            backgroundColor: "#26ADCB",
            paddingLeft: "0px",
          }}
        >
          <div
            style={{
              margin: "0px 0px",
              color: "white",
              fontWeight: "bolder",
              display: "flex",
              alignItems: "center",
              backgroundColor: "black",
              padding: "10px",
            }}
          >
            <div>ADMIN actions : </div>
          </div>
          <div
            style={{
              margin: "0px 20px",
              color: "white",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link href="/ADMIN/CREATEPOST" style={{ color: "white" }}>
              <div>CREATE NEW POST</div>
            </Link>
          </div>
          <div
            style={{
              color: "white",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link href="/NEWS" style={{ color: "white" }}>
              <div>DELETE POSTS</div>
            </Link>
          </div>
        </Container>
      )}
      <Container className="d-flex justify-content-center">
        <div
          id="intro_text"
          className={"header_font" + " " + styles.intro_text}
        >
          ZEWAILCITY Alumni Association
        </div>
      </Container>
      <Container
        fluid
        id="nav_bar_container"
        className={styles.nav_bar_container}
      >
        <Container>
          <div>
            <Navbar light expand="md">
              <NavbarToggler onClick={toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav
                  className={"mr-auto d-flex nav_list" + " " + styles.nav_list}
                  navbar
                >
                  <NavItem className={styles.nav_item}>
                    <Link href="/" style={{ textDecoration: "none" }}>
                      <div className={styles.nav_link}>Home</div>
                    </Link>
                  </NavItem>
                  <NavItem className={styles.nav_item}>
                    <Link href="/ABOUTUS" style={{ textDecoration: "none" }}>
                      <div className={styles.nav_link}>about us</div>
                    </Link>
                  </NavItem>
                  <NavItem className={styles.nav_item}>
                    <Link href="/NEWS" style={{ textDecoration: "none" }}>
                      <div className={styles.nav_link}>news</div>
                    </Link>
                  </NavItem>
                  <NavItem className={styles.nav_item}>
                    <Link href="/alumni" style={{ textDecoration: "none" }}>
                      <div className={styles.nav_link}>Alumni</div>
                    </Link>
                  </NavItem>
                  <div style={{ flexGrow: "1" }}></div>
                  {!IsLoggedIn && (
                    <>
                      <NavItem
                        className={styles.nav_item}
                        style={{
                          borderRightStyle: "solid",
                          borderRightWidth: ".5px",
                          borderRightColor: "grey",
                        }}
                      >
                        <Link
                          href="/APPLICATION"
                          style={{ textDecoration: "none" }}
                        >
                          <div className={styles.nav_link}>
                            apply for membership
                          </div>
                        </Link>
                      </NavItem>
                      <NavItem
                        className={styles.nav_item}
                        onClick={ToggleLoginModal}
                        style={{ cursor: "pointer" }}
                      >
                        <div className={styles.nav_link}>Login</div>
                      </NavItem>
                    </>
                  )}
                  {IsLoggedIn && (
                    <>
                      <NavItem
                        className={styles.nav_item}
                        onClick={actions.logout}
                        style={{
                          cursor: "pointer",
                          borderRightStyle: "solid",
                          borderRightWidth: ".5px",
                          borderRightColor: "grey",
                        }}
                      >
                        <div className={styles.nav_link}>Logout</div>
                      </NavItem>
                      <NavItem className={styles.nav_item}>
                        <UncontrolledDropdown
                          // isOpen={this.state.dropdownOpen}
                          // toggle={this.toggle}
                          style={{ cursor: "pointer" }}
                        >
                          <DropdownToggle
                            tag="span"
                            // onClick={this.toggle}
                            data-toggle="dropdown"
                            // aria-expanded={this.state.dropdownOpen}
                          >
                            <div className={styles.nav_link}>
                              <img
                                referrerpolicy="no-referrer"
                                style={{
                                  width: "40px",
                                  height: "40",
                                  borderRadius: "100%",
                                }}
                                src={
                                  state.user.g_picture
                                    ? state.user.g_picture
                                    : "/user.png"
                                }
                                alt="logo"
                              />
                            </div>
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem>
                              {" "}
                              <Link
                                href="/CHANGEPROFILE"
                                style={{
                                  textDecoration: "none",
                                  color: "grey",
                                }}
                              >
                                <div>Edit your profile</div>
                              </Link>
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </NavItem>
                    </>
                  )}
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default NavbarComponent;
