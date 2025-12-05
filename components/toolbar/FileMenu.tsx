import { FC } from "react"
import { Menu, MenuItem, MenuItems, MenuButton } from '@headlessui/react'
  
  const FileMenu: FC = () => {
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

  export default FileMenu;