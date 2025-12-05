import { FC, useState } from 'react'
import { Menu, MenuItem, MenuItems, MenuButton } from '@headlessui/react'
import { Editor } from '@tiptap/react'

const fonts = [
  { id: 1, name: 'Durward Reynolds', unavailable: false },
  { id: 2, name: 'Kenton Towne', unavailable: false },
  { id: 3, name: 'Therese Wunsch', unavailable: false },
  { id: 4, name: 'Benedict Kessler', unavailable: true },
  { id: 5, name: 'Katelyn Rohan', unavailable: false },
]

const FontSelect: FC<{ editor: Editor | null}> = ({ editor }) => {
  const [selectedFont, setSelectedFont] = useState(fonts[0])

  return (
    <Menu>
      <MenuButton>
        {selectedFont.name} ▾
      </MenuButton>

      <MenuItems anchor="bottom" className="block absolute left-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg py-1 z-50">
        {fonts.map((font) => (
          <MenuItem key={font.id} disabled={font.unavailable}>
            {({ active, disabled }) => (
              <button
                onClick={() => !disabled && setSelectedFont(font)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  active ? 'bg-slate-100' : ''
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {font.name}
              </button>
            )}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  )
}

export default FontSelect;