import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { IoCloseSharp } from "react-icons/io5";
import { ModalContext } from "../../context/ModalContext";
import { PlaygroundContext } from "../../context/PlaygroundContext";

const ModalContainer = styled.div`
  background-color: #f9fafb;
  border-radius: 12px;
  width: 100%;
  max-width: 420px;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  color: #111827;
  font-size: 1.75rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input {
    height: 2rem;
    padding: 0.4rem 0.6rem;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    background: #fff;
    color: #111827;
    font-size: 0.95rem;

    &::placeholder {
      color: #6b7280;
    }

    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 1px #3b82f6;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const PrimaryButton = styled.button`
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  border: none;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EditFolder = () => {
  const { closeModal, isOpenModal } = useContext(ModalContext);
  const { editFolderTitle, folders } = useContext(PlaygroundContext);

  const folderId = isOpenModal.identifiers.folderId;
  const [folderTitle, setFolderTitle] = useState(folders[folderId].title);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const isValid = folderTitle.trim().length > 0;

  const handleUpdate = () => {
    if (!isValid) return;
    editFolderTitle(folderId, folderTitle.trim());
    closeModal();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUpdate();
    }
  };

  return (
    <ModalContainer>
      <Header>
        <Title>Edit Folder Title</Title>
        <CloseButton onClick={closeModal}>
          <IoCloseSharp color="#111827" size={24} />
        </CloseButton>
      </Header>

      <FieldsWrapper>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter Folder Title"
          value={folderTitle}
          onChange={(e) => setFolderTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </FieldsWrapper>

      <ButtonWrapper>
        <PrimaryButton onClick={handleUpdate} disabled={!isValid}>
          Update Title
        </PrimaryButton>
      </ButtonWrapper>
    </ModalContainer>
  );
};

export default EditFolder;
