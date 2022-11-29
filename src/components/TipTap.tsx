// import React from 'react'

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
import { BlockPicker } from 'react-color';
import CharacterCount from '@tiptap/extension-character-count'

// import CodeBlockComponent from './CodeBlockComponent'

lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)

import ProfilePic from './ProfilePic';

import * as Tb from '@radix-ui/react-toolbar';
import {
  StrikethroughIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  FontBoldIcon,
  FontItalicIcon,
} from '@radix-ui/react-icons';
import './TipTap.scss';

const Footbar = ({ editor } : { editor: any }) => {
  if (!editor) {
    return null
  }
  return <p className="wordCount">{editor.storage.characterCount.words()} Words</p>
}

const Toolbar = ({ editor } : { editor: any}) => {
  if (!editor) {
    return null
  }

  return (
    <Tb.Root className="ToolbarRoot" aria-label="Formatting options">
    <Tb.ToggleGroup type="multiple" aria-label="Text formatting">
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
    </Tb.ToggleGroup>
    <Tb.Separator className="ToolbarSeparator" />
    <Tb.ToggleGroup type="single" defaultValue="center" aria-label="Text alignment">
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
      <Tb.ToggleItem 
        value="right" 
        onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'is-active ToolbarToggleItem' : 'ToolbarToggleItem'}
        aria-label="Right aligned">
        <TextAlignRightIcon />
      </Tb.ToggleItem>
    </Tb.ToggleGroup>
    <Tb.Separator className="ToolbarSeparator" />
    <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'is-active ToolbarToggleItem' : 'ToolbarToggleItem'}>
      Code
    </button>
    {/* <BlockPicker onChange={ editor.chain().focus().setColor('#FBBC88').run()}/> */}
    <input
        type="color"
        onInput={(event: React.ChangeEvent<HTMLInputElement>)=> editor.chain().focus().setColor(event.target.value).run()}
        value={editor.getAttributes('textStyle').color}
        className="ToolbarToggleItem"
      />
    <Tb.Button className="ToolbarButton" style={{ marginLeft: 'auto' }}>
      Share
    </Tb.Button>
  </Tb.Root>
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

        // const wordCount = editor.storage.characterCount.words()
        // console.log(wordCount)
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