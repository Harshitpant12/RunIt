import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'

const NavbarContainer = styled.div`
  height: ${({isFullScreen}) => isFullScreen ? '0' : '4.5rem'};
  background: radial-gradient(circle at top, #0f172a, #020617);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.5);
`

const NavbarContent = styled.button`
  background: transparent;
  border: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`

const Logo = styled.img`
  width: 60px;
`

const MainHeading = styled.h1`
  font-size: 2rem;
  font-weight: 400;
  color: #fff;

  span {
    color: #60a5fa;
    font-weight: 700;
  }
`

const Navbar = ({ isFullScreen }) => {
  const navigate = useNavigate()
  return (
    <NavbarContainer isFullScreen={isFullScreen}>
      <NavbarContent onClick={() => navigate('/')}>
        <Logo src={logo} />
        <MainHeading>
          <span>RunIt</span>
        </MainHeading>
      </NavbarContent>
    </NavbarContainer>
  )
}

export default Navbar
