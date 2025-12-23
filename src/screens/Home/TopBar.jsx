import React, { useContext } from "react";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import { ModalContext } from "../../context/ModalContext";

const Bar = styled.div`
  height: 64px;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  img {
    width: 36px;
  }

  span {
    font-weight: 700;
    font-size: 1.1rem;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const PrimaryBtn = styled.button`
  padding: 0.45rem 1.1rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const TopBar = () => {
  const { openModal } = useContext(ModalContext);

  return (
    <Bar>
      <Brand>
        <img src={logo} alt="Runit" />
        <span>Runit</span>
      </Brand>

      <Actions>
        <PrimaryBtn
          onClick={() =>
            openModal({
              show: true,
              modalType: 3,
              identifiers: { folderId: "", cardId: "" },
            })
          }
        >
          + Playground
        </PrimaryBtn>
      </Actions>
    </Bar>
  );
};

export default TopBar;
