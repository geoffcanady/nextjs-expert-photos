import styled from "styled-components";

export const StyledPhotoContainer = styled.div`
  align-self: center;
  /* margin-bottom: 24px; */
  padding-top: 32px;
  position: relative;
  width: 320px;
  z-index: 200;

  @media (min-width: 768px) {
    padding-top: 42px;
    width: 400px;
  }
`;

export const SinglePhotoContainer = styled.div`
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(0deg, #21262a 0%, #2b3135 95.56%);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25) inset;
  padding: 8px;
  width: 100%;
`;

export const SinglePhotoBg = styled.div`
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  overflow: hidden;
  position: relative;
  width: 100%;
`;
