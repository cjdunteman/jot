import { FC, useState } from 'react'
import { Listbox, ListboxOptions, ListboxOption, ListboxButton } from '@headlessui/react'
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
    <Listbox value={selectedFont} onChange={setSelectedFont}>
      <ListboxButton>{selectedFont.name}</ListboxButton>
      <ListboxOptions>
        {fonts.map((font) => (
          <ListboxOption
            key={font.id}
            value={font}
            disabled={font.unavailable}
          >
            {font.name}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  )
}

export default FontSelect;