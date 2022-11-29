import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'

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
import './TipTap.css';

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
    <Tb.Button className="ToolbarButton" style={{ marginLeft: 'auto' }}>
      Share
    </Tb.Button>
  </Tb.Root>
  )
}

export default () => {
    const editor = useEditor({
      // https://www.angularfix.com/2022/03/use-localstoragegetitem-with-typescript.html
      content: JSON.parse(localStorage.getItem('content') || '<p>Hello World!</p>'),
      extensions: [
        StarterKit.configure({
          history: {
            depth: 10,
          }
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
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
    </div>
    )
  }