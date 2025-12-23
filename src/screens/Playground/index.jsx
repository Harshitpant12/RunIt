import React, { useContext, useState } from 'react'
import EditorContainer from './EditorContainer'
import InputConsole from './InputConsole'
import OutputConsole from './OutputConsole'
import Navbar from './Navbar'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { languageMap, PlaygroundContext } from '../../context/PlaygroundContext'
import { ModalContext } from '../../context/ModalContext'
import Modal from '../../components/Modal'
import { Buffer } from 'buffer'
import axios from 'axios'

const PlaygroundWrapper = styled.div`
  min-height: 100vh;
  background: radial-gradient(circle at top, #0f172a, #020617);
  color: #fff;
  display: flex;
  flex-direction: column;
`

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: ${({ isFullScreen }) => isFullScreen ? '1fr' : '2fr 1fr'};
  gap: 1rem;
  padding: 1rem;
  min-height: ${({ isFullScreen }) => isFullScreen ? 'calc(100vh - 4.5rem)' : 'calc(100vh - 4.5rem)'};

  @media (max-width: 768px){
    grid-template-columns: 1fr;
  }
`

const Consoles = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 1rem;
`

// Headings
const HeaderTitle = styled.h1`
  color: #fff;
  span {
    color: #60a5fa;
  }
`

// Buttons
const GradientButton = styled.button`
  padding: 0.45rem 1.1rem;
  border-radius: 999px;
  background: linear-gradient(135deg,#2563eb,#3b82f6);
  color: #fff;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;

  &:hover {
    filter: brightness(1.1);
  }
`

const Playground = () => {
  const { folderId, playgroundId } = useParams()
  const { folders, savePlayground } = useContext(PlaygroundContext)
  const { isOpenModal, openModal, closeModal } = useContext(ModalContext)
  const { title, language, code } = folders[folderId].playgrounds[playgroundId]

  const [currentLanguage, setCurrentLanguage] = useState(language)
  const [currentCode, setCurrentCode] = useState(code)
  const [currentInput, setCurrentInput] = useState('')
  const [currentOutput, setCurrentOutput] = useState('')
  const [isFullScreen, setIsFullScreen] = useState(false)

  const saveCode = () => savePlayground(folderId, playgroundId, currentCode, currentLanguage)
  const encode = (str) => Buffer.from(str, "binary").toString("base64")
  const decode = (str) => Buffer.from(str, 'base64').toString()

  const postSubmission = async (language_id, source_code, stdin) => {
    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'b4e5c5a05fmsh9adf6ec091523f8p165338jsncc58f31c26e1',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      data: JSON.stringify({ language_id, source_code, stdin })
    }
    const res = await axios.request(options)
    return res.data.token
  }

  const getOutput = async (token) => {
    const options = {
      method: 'GET',
      url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'X-RapidAPI-Key': '3ed7a75b44mshc9e28568fe0317bp17b5b2jsn6d89943165d8',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      }
    }
    const res = await axios.request(options)
    if (res.data.status_id <= 2) return await getOutput(token)
    return res.data
  }

  const runCode = async () => {
    openModal({ show: true, modalType: 6, identifiers: { folderId: "", cardId: "" } })
    const language_id = languageMap[currentLanguage].id
    const source_code = encode(currentCode)
    const stdin = encode(currentInput)
    const token = await postSubmission(language_id, source_code, stdin)
    const res = await getOutput(token)
    const status_name = res.status.description
    const decoded_output = decode(res.stdout ? res.stdout : '')
    const decoded_compile_output = decode(res.compile_output ? res.compile_output : '')
    const decoded_error = decode(res.stderr ? res.stderr : '')

    let final_output = ''
    if (res.status_id !== 3) final_output = decoded_compile_output || decoded_error
    else final_output = decoded_output

    setCurrentOutput(status_name + "\n\n" + final_output)
    closeModal()
  }

  const getFile = (e, setState) => {
    const input = e.target
    if (input.files && input.files.length > 0) placeFileContent(input.files[0], setState)
  }

  const placeFileContent = (file, setState) => {
    readFileContent(file)
      .then(content => setState(content))
      .catch(error => console.log(error))
  }

  const readFileContent = (file) => {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
      reader.onload = (event) => resolve(event.target.result)
      reader.onerror = (error) => reject(error)
      reader.readAsText(file)
    })
  }

  return (
    <PlaygroundWrapper>
      <Navbar isFullScreen={isFullScreen} />

      <MainContainer isFullScreen={isFullScreen}>
        <EditorContainer
          title={title}
          currentLanguage={currentLanguage}
          setCurrentLanguage={setCurrentLanguage}
          currentCode={currentCode}
          setCurrentCode={setCurrentCode}
          folderId={folderId}
          playgroundId={playgroundId}
          saveCode={saveCode}
          runCode={runCode}
          getFile={getFile}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
          GradientButton={GradientButton} // Pass the styled button if EditorContainer uses it
        />

        <Consoles>
          <InputConsole
            currentInput={currentInput}
            setCurrentInput={setCurrentInput}
            getFile={getFile}
          />
          <OutputConsole
            currentOutput={currentOutput}
          />
        </Consoles>
      </MainContainer>

      {isOpenModal.show && <Modal />}
    </PlaygroundWrapper>
  )
}

export default Playground
