import { Outlet, Link, useLocation } from "react-router-dom"
import styled from "styled-components"

const HeaderWrapper = styled.div`
  background-color: #f8f9fa;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 4rem;
  padding: 1.5rem 0;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`

const StyledLink = styled(Link)<{ $isActive: boolean }>`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #6246ea;
    color: #fff;
  }

  ${({ $isActive }) =>
    $isActive &&
    `
    background-color: #6246ea;
    color: #fff;
  `}

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`

const Main = styled.main`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

function Header() {
  const location = useLocation()

  return (
    <>
      <HeaderWrapper>
        <Nav>
          <StyledLink to="/" $isActive={location.pathname === "/"}>
            Home
          </StyledLink>
          <StyledLink to="/history" $isActive={location.pathname === "/history"}>
            History
          </StyledLink>
          <StyledLink to="/howitworks" $isActive={location.pathname === "/howitworks"}>
            How It Works
          </StyledLink>
        </Nav>
      </HeaderWrapper>
      <Main>
        <Outlet />
      </Main>
    </>
  )
}

export default Header

