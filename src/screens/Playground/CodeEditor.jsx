import React, { useState, useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror'

// Language imports
import { cpp } from '@codemirror/lang-cpp'
import { java } from '@codemirror/lang-java'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'

// Theme imports
import { githubDark, githubLight } from '@uiw/codemirror-theme-github'
import { bespin } from '@uiw/codemirror-theme-bespin'
import { duotoneDark, duotoneLight } from '@uiw/codemirror-theme-duotone'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { xcodeDark, xcodeLight } from '@uiw/codemirror-theme-xcode'
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode'
import { okaidia } from '@uiw/codemirror-theme-okaidia'

// Configuration imports
import { indentUnit } from '@codemirror/language'
import { EditorState } from '@codemirror/state'

const CodeEditor = ({ currentLanguage, currentTheme, currentCode, setCurrentCode }) => {

  const [theme, setTheme] = useState(dracula)
  const [language, setLanguage] = useState(javascript)

  // Map string to theme object
  const themeMap = {
    githubDark,
    githubLight,
    bespin,
    duotoneDark,
    duotoneLight,
    dracula,
    xcodeDark,
    xcodeLight,
    vscodeDark,
    vscodeLight,
    okaidia
  }

  // Map string to language object
  const languageMap = {
    cpp,
    java,
    javascript,
    python
  }

  useEffect(() => {
    if (languageMap[currentLanguage]) setLanguage(languageMap[currentLanguage])
  }, [currentLanguage])

  useEffect(() => {
    if (themeMap[currentTheme]) setTheme(themeMap[currentTheme])
  }, [currentTheme])

  return (
    <CodeMirror
      value={currentCode}
      height="100%"
      theme={theme}
      extensions={[
        language,
        indentUnit.of("        "),
        EditorState.tabSize.of(8),
        EditorState.changeFilter.of(() => true)
      ]}
      onChange={(value) => setCurrentCode(value)}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLineGutter: true,
        highlightSpecialChars: true,
        history: true,
        foldGutter: true,
        drawSelection: true,
        dropCursor: true,
        allowMultipleSelections: true,
        indentOnInput: true,
        syntaxHighlighting: true,
        bracketMatching: true,
        closeBrackets: true,
        autocompletion: true,
        rectangularSelection: true,
        crosshairCursor: true,
        highlightActiveLine: true,
        highlightSelectionMatches: true,
        closeBracketsKeymap: true,
        defaultKeymap: true,
        searchKeymap: true,
        historyKeymap: true,
        foldKeymap: true,
        completionKeymap: true,
        lintKeymap: true,
      }}
    />
  )
}

export default CodeEditor
