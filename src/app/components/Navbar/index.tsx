import styled from "styled-components";
import { IconIEPLogo } from "../Icons";
import IconHamburger from "../Icons/IconHamburger";

const StyledNavbar = styled.nav`
  background-color: #2b3135;
  display: flex;
  height: 40px;
  width: 100%;
`;

const StyledHomeButton = styled.div`
  align-items: center;
  background-color: #236cff;
  display: flex;
  justify-content: center;
  height: 40px;
  width: 40px;
`;

const StyledHamburgerButton = styled.div`
  align-items: center;
  border-right: solid 1px #5d686f;
  display: flex;
  justify-content: center;
  height: 40px;
  width: 40px;
`;

const BorderRight = styled.div`
  background-color: #3c4348;
  height: 40px;
  width: 1px;
`;

export default function Navbar() {
  return (
    <StyledNavbar>
      <StyledHomeButton>
        <IconIEPLogo />
      </StyledHomeButton>
      <StyledHamburgerButton>
        <IconHamburger />
      </StyledHamburgerButton>
      <BorderRight />
    </StyledNavbar>
  );
}
