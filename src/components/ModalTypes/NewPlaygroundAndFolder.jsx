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

  label {
    font-size: 0.95rem;
    color: #374151;
    font-weight: 500;
  }
`;

const StyledSelect = styled(Select)`
  .react-select__control {
    background: #fff;
    border-radius: 8px;
    border-color: #d1d5db;
    min-height: 2.5rem;
    font-size: 0.95rem;
  }

  .react-select__single-value {
    color: #111827;
  }

  .react-select__option {
    color: #111827;
    background-color: #fff;

    &:hover {
      background-color: #e0e7ff;
    }
  }

  .react-select__menu {
    z-index: 9999;
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

const NewPlaygroundAndFolder = () => {
  const { closeModal } = useContext(ModalContext);
  const { addPlaygroundAndFolder } = useContext(PlaygroundContext);

  const languageOptions = [
    { value: "cpp", label: "cpp" },
    { value: "java", label: "java" },
    { value: "javascript", label: "javascript" },
    { value: "python", label: "python" },
  ];

  const [folderName, setFolderName] = useState("");
  const [playgroundName, setPlaygroundName] = useState("");
  const [language, setLanguage] = useState(languageOptions[0]);
  const folderRef = useRef(null);

  useEffect(() => {
    folderRef.current?.focus();
  }, []);

  const isValid = folderName.trim().length > 0 && playgroundName.trim().length > 0;

  const handleCreate = () => {
    if (!isValid) return;
    addPlaygroundAndFolder(folderName.trim(), playgroundName.trim(), language.label);
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
        <Title>Create New Folder & Playground</Title>
        <CloseButton onClick={closeModal}>
          <IoCloseSharp color="#111827" size={24} />
        </CloseButton>
      </Header>

      <FieldsWrapper>
        <label>Folder Name</label>
        <input
          ref={folderRef}
          type="text"
          placeholder="Enter Folder Name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <label>Playground Name</label>
        <input
          type="text"
          placeholder="Enter Playground Name"
          value={playgroundName}
          onChange={(e) => setPlaygroundName(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <StyledSelect
          options={languageOptions}
          value={language}
          onChange={(selectedOption) => setLanguage(selectedOption)}
          styles={customSelectStyles}
          classNamePrefix="react-select"
          menuPortalTarget={document.body}
          menuPosition={"fixed"}
          closeMenuOnScroll={true}
        />
      </FieldsWrapper>

      <ButtonWrapper>
        <PrimaryButton onClick={handleCreate} disabled={!isValid}>
          Create Playground
        </PrimaryButton>
      </ButtonWrapper>
    </ModalContainer>
  );
};

export default NewPlaygroundAndFolder;
