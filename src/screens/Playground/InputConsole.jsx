import React from 'react'
import styled from 'styled-components'
import { BiImport } from 'react-icons/bi'

export const Console = styled.div`
  background: rgba(255, 255, 255, 0.04);
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
`

export const Header = styled.div`
  background: #0f172a;
  height: 3.5rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;

  input {
    display: none;
  }

  label, a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #60a5fa;
    font-weight: 500;
    cursor: pointer;
  }

  label:hover, a:hover {
    filter: brightness(1.2);
  }
`

export const TextArea = styled.textarea`
  flex-grow: 1;
  resize: none;
  border: none;
  outline: none;
  padding: 0.5rem;
  font-size: 1rem;
  background: #0f172a;
  color: #fff;
  line-height: 1.5rem;
  overflow-y: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
`

const InputConsole = ({ currentInput, setCurrentInput, getFile }) => {
  return (
    <Console>
      <Header>
        Input:
        <label htmlFor="inputfile">
          <input type="file" accept="." id="inputfile" onChange={(e) => getFile(e, setCurrentInput)} />
          <BiImport /> Import Input
        </label>
      </Header>
      <TextArea
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
      />
    </Console>
  )
}

export default InputConsole
