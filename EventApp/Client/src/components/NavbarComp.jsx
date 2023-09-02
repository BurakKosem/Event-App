import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { loginModalFunc, registerModalFunc } from '../redux/modalSlice';
import jwtDecode from 'jwt-decode'; 
import { useEffect, useState } from 'react';
import { exitUser, setIsLoggedIn } from '../redux/dataSlice';

const NavbarComp = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.data);
  const isLoggedIn = useSelector(state => state.data.isLoggedIn);
  const [isLogged, setIsLogged] = useState(false);
  const jwtToken = localStorage.getItem('jwtToken');
  
  
  let username = "";
  if(jwtToken){
    const decodedToken = jwtDecode(jwtToken);
    username = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
  }

  useEffect(() => {
    if (jwtToken) {
      dispatch(setIsLoggedIn(true))
      console.log(isLogged);
    } else {
      dispatch(setIsLoggedIn(false))
      console.log(isLogged);
    }
  }, [jwtToken]);


  return (
    <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect expand="lg" className="bg-body-tertiary py-3">
      <Container>
        <Row>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Nav className="me-auto">
            <Navbar.Brand href="/">EventApp</Navbar.Brand>
          </Nav>
        </Row>
        <Row>
          <Nav>
            {isLoggedIn ? ( 
            <>{username == "Admin" ? <Nav.Link href='/adminpanel'>Admin Panel</Nav.Link> :
            <Nav.Link href='/userprofile'>Profilim</Nav.Link>
            }
              
              <Nav.Link onClick={() => dispatch(exitUser())}>Çıkış Yap</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link onClick={() => dispatch(loginModalFunc())} >Giriş Yap</Nav.Link>
                <Nav.Link onClick={() => dispatch(registerModalFunc())}>Üye Ol</Nav.Link>
              </>
            )}

          </Nav>
        </Row>
      </Container>
    </Navbar>
  );
}

export default NavbarComp