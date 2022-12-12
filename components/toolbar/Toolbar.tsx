'use client'

import { FC } from 'react'
import { Editor } from '@tiptap/react';

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

  import FontSelect from './FontSelect'

  import { Menu } from '@headlessui/react'

  function FileMenu() {
    return (
      <Menu>
        <Menu.Button>More</Menu.Button>
        <Menu.Items>
          <Menu.Item>
            {({ active }) => (
              <a
                className={`${active && 'bg-blue-500'}`}
                href="/account-settings"
              >
                Account settings
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                className={`${active && 'bg-blue-500'}`}
                href="/account-settings"
              >
                Documentation
              </a>
            )}
          </Menu.Item>
          <Menu.Item disabled>
            <span className="opacity-75">Invite a friend (coming soon!)</span>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    )
  }

const Toolbar: FC<{ editor: Editor | null}> = ({ editor }) => {
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
        <FontSelect editor={ editor }/>
      </div>
      <div>
          </div>
    </div>
    )
  }

  export default Toolbar;