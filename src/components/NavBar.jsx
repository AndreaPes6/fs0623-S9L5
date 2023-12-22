import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';

import immagine from './assets/netflix_logo.png';

function MyNavbar() {
  return (
    <Navbar expand="lg" className="bg-dark navbar-dark">
      <Container fluid>
        <Navbar.Brand href="#" className="ms-auto">
          <Image src={immagine} fluid style={{ maxWidth: '5em'}} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll"/>
        <Navbar.Collapse id="navbarScroll" className="justify-content-between"> 
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1" className="text-light">Home</Nav.Link>
            <Nav.Link href="#action2" className="text-light">TV shows</Nav.Link>
            <Nav.Link href="#action2" className="text-light">Movies</Nav.Link>
            <Nav.Link href="#action2" className="text-light">Recently added</Nav.Link>
            <Nav.Link href="#action2" className="text-light">My list</Nav.Link>
          </Nav>
          <Form className="d-flex align-items-center">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-info" className="text-light">Search</Button>
            <FontAwesomeIcon icon={faBell} className="text-light mx-2" />
            <FontAwesomeIcon icon={faUser} className="text-light mx-2" />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
