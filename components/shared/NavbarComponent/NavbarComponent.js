import { useContext } from "react";
import { LoginContext } from "../../../contexts/loginContext"
import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, Container } from 'reactstrap';
// import { Link } from "react-router-dom";
import Link from 'next/link'
import styles from "./NavbarComponent.module.css"
const NavbarComponent = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const { login, IsLoggedIn, Token, ToggleLoginModal, logout } = useContext(LoginContext);

    // let Token = false;
    // let IsLoggedIn = false;




    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className={styles.navwrapper}>
            {
                !!Token && Token.admin &&
                <Container fluid className="d-flex justify-content-left" style={{ height: "50px", backgroundColor: "#26ADCB", paddingLeft: "0px" }}>
                    <div style={{ margin: "0px 0px", color: 'white', fontWeight: "bolder", display: "flex", alignItems: "center", backgroundColor: "black", padding: "10px" }}>

                        <div >ADMIN actions : </div>

                    </div>
                    <div style={{ margin: "0px 20px", color: 'white', fontWeight: "bold", display: "flex", alignItems: "center" }}>
                        <Link href="/ADMIN/CREATEPOST">
                            <a style={{ color: 'white' }}> <div >CREATE NEW POST</div></a>

                        </Link>
                    </div>
                    <div style={{ color: 'white', fontWeight: "bold", display: "flex", alignItems: "center" }}>
                        <Link href="/NEWS">
                            <a style={{ color: 'white' }}><div >DELETE POSTS</div></a>
                        </Link>
                    </div>
                </Container>
            }
            <Container className="d-flex justify-content-center">
                <div id="intro_text" className={"header_font" + " " + styles.intro_text}>
                    ZEWAILCITY
                    Alumni
                    Association
                </div>

            </Container>
            <Container fluid id="nav_bar_container" className={styles.nav_bar_container}>
                <Container>
                    <div>
                        <Navbar light expand="md">
                            <NavbarToggler onClick={toggle} />
                            <Collapse isOpen={isOpen} navbar  >
                                <Nav className={"mr-auto d-flex nav_list" + " " + styles.nav_list} navbar>
                                    <NavItem className={styles.nav_item}>
                                        <Link href="/">
                                            <a> <NavLink className={styles.nav_link}>Home</NavLink></a>
                                        </Link>
                                    </NavItem>
                                    <NavItem className={styles.nav_item}>
                                        <Link href="/ABOUTUS">
                                            <a><NavLink className={styles.nav_link} >about us</NavLink></a>
                                        </Link>
                                    </NavItem>
                                    <NavItem className={styles.nav_item}>
                                        <Link href="/NEWS">
                                            <a><NavLink className={styles.nav_link}>news</NavLink></a>
                                        </Link>
                                    </NavItem>
                                    <div style={{ flexGrow: "1" }}>

                                    </div>
                                    {!IsLoggedIn &&
                                        <>
                                            <NavItem className={styles.nav_item} style={{ borderRightStyle: "solid", borderRightWidth: ".5px", borderRightColor: "grey" }}>
                                                <Link href="/APPLICATION">
                                                    <a><NavLink className={styles.nav_link}>apply for membership</NavLink></a>
                                                </Link>
                                            </NavItem>
                                            <NavItem className={styles.nav_item}
                                                onClick={ToggleLoginModal}
                                                style={{ cursor: 'pointer' }}>
                                                <NavLink className={styles.nav_link}>Login</NavLink>
                                            </NavItem>
                                        </>
                                    }
                                    {IsLoggedIn &&
                                        <>
                                            <NavItem className={styles.nav_item}
                                                onClick={logout}
                                                style={{ cursor: 'pointer', borderRightStyle: "solid", borderRightWidth: ".5px", borderRightColor: "grey" }}>
                                                <NavLink className={styles.nav_link}>Logout</NavLink>
                                            </NavItem>
                                            <NavItem className={styles.nav_item}>
                                                <NavLink className={styles.nav_link}>
                                                    <img
                                                        style={{ width: "40px", height: "40", borderRadius: "100%", }}
                                                        src={Token.g_picture ? Token.g_picture : '/user.png'}
                                                        alt="logo" />
                                                </NavLink>

                                            </NavItem>


                                        </>
                                    }


                                </Nav>
                            </Collapse>
                        </Navbar>
                    </div>
                </Container>
            </Container>


        </div>

    );
}

export default NavbarComponent;