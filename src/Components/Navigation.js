import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navigation() {
  return (
    <Navbar>
      <Container fluid>
        <Navbar.Brand href="#">Spotify Trivia</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Navigation;
