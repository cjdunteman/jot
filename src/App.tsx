import './App.css'
import Toolbar from './components/Toolbar'
import ProfilePic from './components/ProfilePic'

import { useCallback, useMemo, useState } from 'react'

import { BaseEditor, createEditor, Descendant, Editor, Transforms } from 'slate'
import { Editable, ReactEditor, Slate, withReact } from 'slate-react'

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}


const App = () => {
  const [editor] = useState(() => withReact(createEditor()))

  const initialValue = useMemo(
    () =>
      JSON.parse(localStorage.getItem('content')) || [
        {
          type: 'paragraph',
          children: [{ text: 'A line of text in a paragraph.' }],
        },
      ],
    []
  )

  return (
    <div className="App container">
    <div className="header">
      <Toolbar />
      <ProfilePic />
    </div>
    <Slate editor={editor} value={initialValue} 
      onChange={value => {
        const isAstChange = editor.operations.some(
          op => 'set_selection' !== op.type
        )
        if (isAstChange) {
          // Save the value to Local Storage.
          const content = JSON.stringify(value)
          localStorage.setItem('content', content)
        }}
        }>
      <Editable />
    </Slate>
    </div>
  )
}

const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>
}

export default App
