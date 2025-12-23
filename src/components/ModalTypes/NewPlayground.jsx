import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Select from "react-select";
import { IoCloseSharp } from "react-icons/io5";
import { ModalContext } from "../../context/ModalContext";
import { PlaygroundContext } from "../../context/PlaygroundContext";

const ModalContainer = styled.div`
  background-color: #f9fafb;
  border-radius: 12px;
  width: 100%;
  max-width: 520px;
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

const NewPlayground = () => {
  const { isOpenModal, closeModal } = useContext(ModalContext);
  const { addPlayground } = useContext(PlaygroundContext);
  const { folderId } = isOpenModal.identifiers;

  const languageOptions = [
    { value: "cpp", label: "cpp" },
    { value: "java", label: "java" },
    { value: "javascript", label: "javascript" },
    { value: "python", label: "python" },
  ];

  const [cardTitle, setCardTitle] = useState("");
  const [language, setLanguage] = useState(languageOptions[0]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const isValid = cardTitle.trim().length > 0;

  const handleCreate = () => {
    if (!isValid) return;
    addPlayground(folderId, cardTitle.trim(), language.label);
    closeModal();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCreate();
    }
  };

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#fff",
      borderRadius: "8px",
      borderColor: "#d1d5db",
      minHeight: "2.5rem",
      fontSize: "0.95rem",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#111827",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "#111827",
      backgroundColor: state.isFocused ? "#e0e7ff" : "#fff",
      cursor: "pointer",
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  };

  return (
    <ModalContainer>
      <Header>
        <Title>Create New Playground</Title>
        <CloseButton onClick={closeModal}>
          <IoCloseSharp color="#111827" size={24} />
        </CloseButton>
      </Header>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter Playground title"
          value={cardTitle}
          onChange={(e) => setCardTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            height: "2rem",
            padding: "0.4rem 0.6rem",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            background: "#fff",
            color: "#111827",
            fontSize: "0.95rem",
          }}
        />
        <Select
          options={languageOptions}
          value={language}
          onChange={(selectedOption) => setLanguage(selectedOption)}
          styles={customSelectStyles}
          classNamePrefix="react-select"
          menuPortalTarget={document.body}
          menuPosition={"fixed"}
          closeMenuOnScroll={true}
        />
      </div>

      <ButtonWrapper>
        <PrimaryButton onClick={handleCreate} disabled={!isValid}>
          Create
        </PrimaryButton>
      </ButtonWrapper>
    </ModalContainer>
  );
};

export default NewPlayground;
