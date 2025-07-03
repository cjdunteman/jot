'use client'

import { useEditor, EditorContent, ReactNodeViewRenderer } from '@tiptap/react'
import { Editor } from '@tiptap/react';
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
import FontFamily from '@tiptap/extension-font-family'

import Toolbar from './toolbar/Toolbar'

// import CodeBlockComponent from './CodeBlockComponent'

lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)

import './TipTap.css';
import { FC, useEffect } from 'react'

const Footbar: FC<{ editor: Editor | null}> = ({ editor }) => {
  if (!editor) {
    return null
  }
  return <p className="wordCount">{editor.storage.characterCount.words()} Words</p>
}

const TipTap = () => {
    const editor = useEditor({
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Hello World!"
              }
            ]
          }
        ]
      },
      immediatelyRender: false,
      extensions: [
        Document,
        Paragraph,
        Text,
        TextStyle,
        Color,
        CharacterCount,
        FontFamily,
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
        const content = JSON.stringify(json)
        if (typeof window !== "undefined") {
          localStorage.setItem('content', content)
        }
      }
    })

    // Load content from localStorage on client
    useEffect(() => {
      if (editor && typeof window !== "undefined") {
        const saved = localStorage.getItem('content')
        if (saved) {
          editor.commands.setContent(JSON.parse(saved))
        }
      }
    }, [editor])

    return (
    <div className="container mx-auto p-4 flex flex-col max-w-4xl bg-white border border-sm border-solid shadow-md">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
      <Footbar editor={editor}/>
    </div>
    )
}

export default TipTap