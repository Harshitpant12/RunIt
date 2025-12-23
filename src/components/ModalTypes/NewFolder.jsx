import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IoCloseSharp } from "react-icons/io5";
import { ModalContext } from "../../context/ModalContext";
import { PlaygroundContext } from "../../context/PlaygroundContext";

const ModalContainer = styled.div`
  background-color: #f9fafb;
  border-radius: 12px;
  width: 100%;
  max-width: 480px;
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

const InputWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 0.6rem 0.9rem;
  border-radius: 8px;
  background: #fff;
  border: 1px solid #d1d5db;
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
`;

const PrimaryButton = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NewFolder = () => {
  const { closeModal } = useContext(ModalContext);
  const { addFolder } = useContext(PlaygroundContext);
  const [folderTitle, setFolderTitle] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const isValid = folderTitle.trim().length > 0;

  const handleCreate = () => {
    if (!isValid) return;
    addFolder(folderTitle.trim());
    closeModal();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCreate();
    }
  };

  return (
    <ModalContainer>
      <Header>
        <Title>Create New Folder</Title>
        <CloseButton onClick={closeModal}>
          <IoCloseSharp color="#111827" size={24} />
        </CloseButton>
      </Header>

      <InputWrapper>
        <StyledInput
          ref={inputRef}
          type="text"
          placeholder="e.g. DSA Practice"
          value={folderTitle}
          onChange={(e) => setFolderTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <PrimaryButton onClick={handleCreate} disabled={!isValid}>
          Create
        </PrimaryButton>
      </InputWrapper>
    </ModalContainer>
  );
};

export default NewFolder;
