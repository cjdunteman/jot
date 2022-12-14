// import React, { useEffect } from 'react';
// import * as Select from '@radix-ui/react-select';
// import classnames from 'classnames';
// import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
// import './FontSelectStyles.css';

// const FontSelect = ({ editor }) => {
//     if (!editor) {
//         return null
//       }

//     const [value, setValue] = React.useState('Inter') 

//     useEffect(() => {
//         editor.chain().focus().setFontFamily(value).run();
//     });

//       return (
//         <Select.Root value={value} onValueChange={setValue}>
//             <Select.Trigger className="SelectTrigger">
//             <Select.Value/>
//                 {/* {value} */}
//                 <Select.Icon className="SelectIcon">
//                     <ChevronDownIcon />
//                 </Select.Icon>
//             </Select.Trigger>

//             <Select.Portal>
//             <Select.Content className="SelectContent">
//                 <Select.ScrollUpButton className="SelectScrollButton">
//                 <ChevronUpIcon />
//                 </Select.ScrollUpButton>
//                 <Select.Viewport className="SelectViewport">

//                 {/* <Select.Separator className="SelectSeparator" /> */}

//                 <Select.Group>
//                     <Select.Label className="SelectLabel">Fonts</Select.Label>
//                     <SelectItem value="inter">Inter</SelectItem>
//                     <SelectItem value="comicSans">Comic Sans</SelectItem>
//                     <SelectItem value="serif">serif</SelectItem>
//                     <SelectItem value="monospace">monospace</SelectItem>
//                     <SelectItem value="cursive">cursive</SelectItem>
//                     <SelectItem value="unsetFontFamily">unsetFontFamily</SelectItem>
//                 </Select.Group>
//                 </Select.Viewport>
//                 <Select.ScrollDownButton className="SelectScrollButton">
//                 <ChevronDownIcon />
//                 </Select.ScrollDownButton>
//             </Select.Content>
//             </Select.Portal>
//         </Select.Root>
// )
//     };

// const SelectItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => {
//   return (
//     <Select.Item className={classnames('SelectItem', className)} {...props} ref={forwardedRef}>
//       <Select.ItemText>{children}</Select.ItemText>
//       <Select.ItemIndicator className="SelectItemIndicator">
//         <CheckIcon />
//       </Select.ItemIndicator>
//     </Select.Item>
//   );
// });

// export default FontSelect;

import { FC, useState } from 'react'
import { Listbox } from '@headlessui/react'
import { Editor } from '@tiptap/react'

const people = [
  { id: 1, name: 'Durward Reynolds', unavailable: false },
  { id: 2, name: 'Kenton Towne', unavailable: false },
  { id: 3, name: 'Therese Wunsch', unavailable: false },
  { id: 4, name: 'Benedict Kessler', unavailable: true },
  { id: 5, name: 'Katelyn Rohan', unavailable: false },
]

const FontSelect: FC<{ editor: Editor | null}> = ({ editor }) => {
  const [selectedPerson, setSelectedPerson] = useState(people[0])

  return (
    <Listbox value={selectedPerson} onChange={setSelectedPerson}>
      <Listbox.Button>{selectedPerson.name}</Listbox.Button>
      <Listbox.Options>
        {people.map((person) => (
          <Listbox.Option
            key={person.id}
            value={person}
            disabled={person.unavailable}
          >
            {person.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}

export default FontSelect;