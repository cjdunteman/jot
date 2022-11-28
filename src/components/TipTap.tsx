import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import * as Tb from '@radix-ui/react-toolbar';
import {
  StrikethroughIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  FontBoldIcon,
  FontItalicIcon,
} from '@radix-ui/react-icons';
import './Toolbar.css';

const Toolbar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <Tb.Root className="ToolbarRoot" aria-label="Formatting options">
    <Tb.ToggleGroup type="multiple" aria-label="Text formatting">
      <Tb.ToggleItem 
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
      </Tb.ToggleItem>
      <Tb.ToggleItem className="ToolbarToggleItem" value="italic" aria-label="Italic">
        <FontItalicIcon />
      </Tb.ToggleItem>
      <Tb.ToggleItem
        className="ToolbarToggleItem"
        value="strikethrough"
        aria-label="Strike through"
      >
        <StrikethroughIcon />
      </Tb.ToggleItem>
    </Tb.ToggleGroup>
    <Tb.Separator className="ToolbarSeparator" />
    <Tb.ToggleGroup type="single" defaultValue="center" aria-label="Text alignment">
      <Tb.ToggleItem 
        value="left"
        aria-label="Left aligned"
        onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
          }
        className={editor.isActive('italic') ? 'is-active ToolbarToggleItem' : 'ToolbarToggleItem'}>
        <TextAlignLeftIcon />
      </Tb.ToggleItem>
      <Tb.ToggleItem className="ToolbarToggleItem" value="center" onClick={() => alignText('center')} aria-label="Center aligned">
        <TextAlignCenterIcon />
      </Tb.ToggleItem>
      <Tb.ToggleItem className="ToolbarToggleItem" value="right" onClick={() => alignText('right')} aria-label="Right aligned">
        <TextAlignRightIcon />
      </Tb.ToggleItem>
    </Tb.ToggleGroup>
    <Tb.Separator className="ToolbarSeparator" />
    <Tb.Link className="ToolbarLink" href="#" target="_blank" style={{ marginRight: 10 }}>
      Edited 2 hours ago
    </Tb.Link>
    <Tb.Button className="ToolbarButton" style={{ marginLeft: 'auto' }}>
      Share
    </Tb.Button>
  </Tb.Root>
  )
}

const Tiptap = () => {
    const editor = useEditor({
      extensions: [
        StarterKit,
      ],
      content: '<p>Hello World!</p>',
    })
  
    return (
      <div>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
    )
  }
  
  export default Tiptap