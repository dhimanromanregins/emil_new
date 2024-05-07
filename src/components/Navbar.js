import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Button, Image } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";

export default function MyNavbar() {
  const [profileData, setProfileData] = useState(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://20.235.152.209/api/profiles/${userId}/?user_id=${userId}`);
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    if (userId) {
      fetchProfileData();
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/"); // Navigate to the login page
  };

  return (
    <>
      <section className="nav-bg">
        <Navbar className="container" expand="lg" collapseOnSelect>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between align-items-center">
            <Nav>
              <div className="d-flex">
                <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
              </div>
              <Nav.Link as={NavLink} to="/addgroups">AddGroup</Nav.Link>
              <NavDropdown title="Emails" id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} to="/emails">Email</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/bulk-email-sender">Send Bulk Email</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/group-email">Send Group Email</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="">  
              {userId ? (
                <>
                  {profileData && (
                    <Nav.Link as={NavLink} to="/profiles">
                    <Image src={`http://127.0.0.1:8000${profileData.profile_image}`} roundedCircle style={{ width: "50px", height: "50px", marginLeft: "10px" }} />
                  </Nav.Link>
                  )}
                  <Button variant="outline-danger ms-3 mt-2" style={{height:"50px"}}onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <>
                  <Nav.Link href="/">Login</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </section>
    </>
  );
}
