import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import useGetModules from './modules';
import { Button } from 'react-bootstrap';

function Header() {
  const navigate = useNavigate();
  console.log(localStorage.getItem("token"));
  function handleBrandClick(){
    if(localStorage.getItem("token"))
        navigate("/dashboard");
    else  
      navigate("/");
  }
  function handleClick(e) {
    const path = e.target.getAttribute('data-path'); 
    navigate("/" + path);
  }
  function handleClickSO(e){
    localStorage.setItem("token","");
    localStorage.setItem("role","");
    
    navigate("/");
  }
  const modules=useGetModules();
  if(localStorage.getItem("token")){
    
    return (
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand onClick={handleBrandClick} style={{cursor:'pointer'}}>Petrol Pump Management System</Navbar.Brand>
          {localStorage.getItem("token") && (
            <div className="justify-content-end">
          <Nav className="me-auto">
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            {modules.map((box) => (
              <NavDropdown.Item data-path={box.title} onClick={handleClick}>
                {box.title}
              </NavDropdown.Item>
              
            ))}
              
              <NavDropdown.Divider />
            </NavDropdown>
            <Button onClick={handleClickSO}>Sign_out</Button>
          </Nav>
          </div>
          )}
        </Container>
      </Navbar>
    ); 
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Petrol Pump Management System</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
