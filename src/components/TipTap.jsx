import { useEditor, EditorContent, ReactNodeViewRenderer } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'

import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
// load all highlight.js languages
import { lowlight } from 'lowlight'

import { Color } from '@tiptap/extension-color'
import CharacterCount from '@tiptap/extension-character-count'

// import CodeBlockComponent from './CodeBlockComponent'

import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from './Auth'
import SignOut from './SignOut'

lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)

import {
  StrikethroughIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  FontBoldIcon,
  FontItalicIcon,
  Cross2Icon,
} from '@radix-ui/react-icons';
import './TipTap.css';

const Footbar = ({ editor }) => {
  if (!editor) {
    return null
  }
  return <p className="wordCount">{editor.storage.characterCount.words()} Words</p>
}

const Toolbar = ({ editor }) => {
  if (!editor) {
    return null
  }

  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="ToolbarRoot" aria-label="Formatting options">
      <div className="ToolbarGroup">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'is-active ToolbarToggleItem' : 'ToolbarToggleItem'}
        value="bold" 
        aria-label="Bold">
        <FontBoldIcon />
      </button>
      <button 
         onClick={() => editor.chain().focus().toggleItalic().run()}
         disabled={
           !editor.can()
             .chain()
             .focus()
             .toggleItalic()
             .run()
         }
         className={editor.isActive('italic') ? 'is-active ToolbarToggleItem' : 'ToolbarToggleItem'}
          value="italic" 
          aria-label="Italic">
        <FontItalicIcon />
      </button>
      <button
         onClick={() => editor.chain().focus().toggleStrike().run()}
         disabled={
           !editor.can()
             .chain()
             .focus()
             .toggleStrike()
             .run()
         }
         className={editor.isActive('strike') ? 'is-active ToolbarToggleItem' : 'ToolbarToggleItem'}
        value="strikethrough"
        aria-label="Strike through"
      >
        <StrikethroughIcon />
      </button>
    </div>
    <div className="ToolbarSeparator" />
    <div defaultValue="center" aria-label="Text alignment">
      <button 
        value="left"
        aria-label="Left aligned"
        onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'is-active ToolbarToggleItem' : 'ToolbarToggleItem'}>
          <TextAlignLeftIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'is-active ToolbarToggleItem' : 'ToolbarToggleItem'}
        value="center" 
        aria-label="Center aligned">
        <TextAlignCenterIcon />
      </button>
      <button 
        value="right" 
        onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'is-active ToolbarToggleItem' : 'ToolbarToggleItem'}
        aria-label="Right aligned">
        <TextAlignRightIcon />
      </button>
    </div>
    <div className="ToolbarSeparator" />
    <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'is-active ToolbarToggleItem' : 'ToolbarToggleItem'}>
      Code
    </button>
    <input
        type="color"
        onInput={(event)=> editor.chain().focus().setColor(event.target.value).run()}
        value={editor.getAttributes('textStyle').color}
        className="ToolbarToggleItem"
      />
    {/* {!session ? <Auth /> : <Account key={session.user.id} session={session} />} */}
    <div className="ToolbarGroup">
        {!session ? <Auth /> : <SignOut/>}
    </div>
  </div>
  )
}

export default () => {
    const editor = useEditor({
      // https://www.angularfix.com/2022/03/use-localstoragegetitem-with-typescript.html
      content: JSON.parse(localStorage.getItem('content') ||
        `{
          "type": "doc",
          "content": [
            {
              "type": "paragraph",
              "content": [
                {
                  "type": "text",
                  "text": "Hello World!"
                }
              ]
            }
          ]
        }`),
      extensions: [
        Document,
        Paragraph,
        Text,
        TextStyle,
        Color,
        CharacterCount,
        Highlight.configure({ multicolor: true }),
        StarterKit.configure({
          document: false,
          paragraph: false,
          text: false,
          codeBlock: false,
          history: {
            depth: 10,
          },
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph']
        }),
        CodeBlockLowlight
        // .extend({
        //   addNodeView() {
        //     return ReactNodeViewRenderer(CodeBlockComponent)
        //   },
        // })
        .configure({ lowlight }),
      ],

      // triggered on every change
      onUpdate: ({ editor }) => {
        const json = editor.getJSON()
        // send the content to an API here
        const content = JSON.stringify(json)
        localStorage.setItem('content', content)
      }
    })
  
    return (
    <div className="container">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
      <Footbar editor={editor}/>
    </div>
    )
  }