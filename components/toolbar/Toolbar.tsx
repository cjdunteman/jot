'use client'

import { FC } from 'react'
import { Editor } from '@tiptap/react';

import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from '@heroicons/react/16/solid'

import {
    StrikethroughIcon,
    TextAlignLeftIcon,
    TextAlignCenterIcon,
    TextAlignRightIcon,
    FontBoldIcon,
    FontItalicIcon,
  } from '@radix-ui/react-icons';

  import FontSelect from './FontSelect'

  import { Menu, MenuItem, MenuItems, MenuButton } from '@headlessui/react'

  function FileMenu() {
    return (
      <Menu>
        <MenuButton>File</MenuButton>
        <MenuItems transition anchor="bottom" className="origin-top-right mt-2 w-40 rounded-md bg-white shadow-lg flex flex-col py-1 z-50">
          <MenuItem>
            <button>
              Save
            </button>
          </MenuItem>
          <MenuItem>
            <button>
              Save As
            </button>
          </MenuItem>
          <MenuItem>
            <button>
              Export
            </button>
          </MenuItem>
        </MenuItems>
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
          <div className="flex flex-row">
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
      <FileMenu />
      </div>
    </div>
    )
  }

  export default Toolbar;