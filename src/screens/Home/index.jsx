import React, { useContext } from "react";
import styled from "styled-components";
import TopBar from "./TopBar";
import Dashboard from "./Dashboard";
import Modal from "../../components/Modal";
import { ModalContext } from "../../context/ModalContext";

const Page = styled.div`
  min-height: 100vh;
  background: radial-gradient(circle at top, #0f172a, #020617);
  color: #e5e7eb;
`;

const Home = () => {
  const { isOpenModal } = useContext(ModalContext);

  return (
    <Page>
      <TopBar />
      <Dashboard />
      {isOpenModal.show && <Modal />}
    </Page>
  );
};

export default Home;
