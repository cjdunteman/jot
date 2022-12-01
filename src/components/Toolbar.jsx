import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from './Auth'
import SignOut from './SignOut'

import './ToolbarStyles.css'

import {
    StrikethroughIcon,
    TextAlignLeftIcon,
    TextAlignCenterIcon,
    TextAlignRightIcon,
    FontBoldIcon,
    FontItalicIcon,
    Cross2Icon,
    FileTextIcon,
  } from '@radix-ui/react-icons';

  import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

  import FontSelect from './FontSelect'
  import Avatar from './Avatar'

  const FileMenu = () => {
    return (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="ToolbarToggleItem">File</DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
            <DropdownMenu.Item className="DropdownMenuItem">Open</DropdownMenu.Item>
            <DropdownMenu.Item className="DropdownMenuItem">Export</DropdownMenu.Item>
            <DropdownMenu.Arrow className="DropdownMenuArrow" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
        </DropdownMenu.Root>
      )
  }

const Toolbar = ({ editor }) => {
    const [session, setSession] = useState(null)
  
    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
  
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }, [])

    if (!editor) {
      return null
    }
  
    return (
      <div className="ToolbarRoot" aria-label="Formatting options">
        <div style={{ display: "flex"}}>
          <div className="">
            <FileMenu />
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
          value={editor.getAttributes('textStyle').color || "#ffffff"}
          className="ToolbarToggleItem colorPicker"
        />
        <FontSelect editor={ editor }/>
      </div>
      <div>
          {!session ? <Auth /> : <Avatar/>}
          </div>
    </div>
    )
  }

  export default Toolbar;