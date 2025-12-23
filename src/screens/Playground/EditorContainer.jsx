import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { BiImport, BiExport } from 'react-icons/bi';
import CodeEditor from './CodeEditor';
import { ModalContext } from '../../context/ModalContext';
import { languageMap } from '../../context/PlaygroundContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: radial-gradient(circle at top, #0f172a, #020617);
  border-radius: 14px;
  padding: 1rem;
  gap: 1rem;
  height: ${({ isFullScreen }) => (isFullScreen ? '100vh' : 'auto')};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const HeaderLeft = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 600;

  span {
    color: #60a5fa;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1.2rem;
  border-radius: 999px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  color: #fff;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.3rem;

  &:hover {
    filter: brightness(1.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const FileInputLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  color: #fff;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  padding: 0.5rem 1.2rem;
  border-radius: 999px;
  transition: all 0.2s ease;

  input {
    display: none;
  }

  &:hover {
    filter: brightness(1.2);
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  color: #fff;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  appearance: none;
  padding-right: 2rem;
  &:focus {
    outline: none;
  }
`;

const SelectArrow = styled.span`
  position: absolute;
  right: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #fff;
  font-size: 0.8rem;
`;

const Option = styled.option`
  background-color: #020617;
  color: #fff;
`;

const EditorWrapper = styled.div`
  flex-grow: 1;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.1);
  overflow-y: auto;
  overflow-x: hidden;
  max-height: ${({ isFullScreen }) => (isFullScreen ? 'calc(100vh - 180px)' : '400px')};

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #020617;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #2563eb;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #3b82f6;
  }

  .cm-content {
    white-space: pre-wrap !important;
    word-break: break-word;
  }
`;

const BottomButtons = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

const BottomLeft = styled.div``;

const BottomRight = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const EditorContainer = ({
  title,
  currentLanguage,
  setCurrentLanguage,
  currentCode,
  setCurrentCode,
  folderId,
  playgroundId,
  saveCode,
  runCode,
  getFile,
  isFullScreen,
  setIsFullScreen
}) => {
  const { openModal } = useContext(ModalContext);

  const themeOptions = [
    { value: 'githubDark', label: 'githubDark' },
    { value: 'githubLight', label: 'githubLight' },
    { value: 'bespin', label: 'bespin' },
    { value: 'duotoneDark', label: 'duotoneDark' },
    { value: 'duotoneLight', label: 'duotoneLight' },
    { value: 'dracula', label: 'dracula' },
    { value: 'xcodeDark', label: 'xcodeDark' },
    { value: 'xcodeLight', label: 'xcodeLight' },
    { value: 'vscodeDark', label: 'vscodeDark' },
    { value: 'vscodeLight', label: 'vscodeLight' },
    { value: 'okaidia', label: 'okaidia' },
  ];

  const languageOptions = [
    { value: 'cpp', label: 'cpp' },
    { value: 'javascript', label: 'javascript' },
    { value: 'java', label: 'java' },
    { value: 'python', label: 'python' },
  ];

  const [currentTheme, setCurrentTheme] = useState(themeOptions[0]);
  const [language, setLanguage] = useState(() => {
    const found = languageOptions.find(opt => opt.value === currentLanguage);
    return found || languageOptions[0];
  });

  const handleThemeChange = (e) => {
    const selected = themeOptions.find(opt => opt.value === e.target.value);
    setCurrentTheme(selected);
  };

  const handleLanguageChange = (e) => {
    const selected = languageOptions.find(opt => opt.value === e.target.value);
    setLanguage(selected);
    setCurrentLanguage(selected.value);
    setCurrentCode(languageMap[selected.value].defaultCode);
  };

  const exportCode = () => {
    const blob = new Blob([currentCode], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title || "code"}.txt`;
    link.click();
  };

  return (
    <Container isFullScreen={isFullScreen}>
      <Header>
        <HeaderLeft>
          <Title>{title}</Title>
          <Button onClick={saveCode}>Save</Button>
          <Button onClick={() => setIsFullScreen(!isFullScreen)}>
            {isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </Button>
        </HeaderLeft>

        <HeaderRight>
          <SelectWrapper>
            <Select value={language.value} onChange={handleLanguageChange}>
              {languageOptions.map(opt => <Option key={opt.value} value={opt.value}>{opt.label}</Option>)}
            </Select>
            <SelectArrow>▼</SelectArrow>
          </SelectWrapper>

          <SelectWrapper>
            <Select value={currentTheme.value} onChange={handleThemeChange}>
              {themeOptions.map(opt => <Option key={opt.value} value={opt.value}>{opt.label}</Option>)}
            </Select>
            <SelectArrow>▼</SelectArrow>
          </SelectWrapper>
        </HeaderRight>
      </Header>

      <EditorWrapper isFullScreen={isFullScreen}>
        <CodeEditor
          currentLanguage={currentLanguage}
          currentTheme={currentTheme.value}
          currentCode={currentCode}
          setCurrentCode={setCurrentCode}
        />
      </EditorWrapper>

      <BottomButtons>
        <BottomLeft>
          <Button onClick={runCode}>Run Code</Button>
        </BottomLeft>

        <BottomRight>
          <FileInputLabel>
            <input type="file" onChange={(e) => getFile(e, setCurrentCode)} />
            <BiImport /> Import Code
          </FileInputLabel>
          <Button onClick={exportCode}>
            <BiExport /> Export Code
          </Button>
        </BottomRight>
      </BottomButtons>
    </Container>
  );
};

export default EditorContainer;
