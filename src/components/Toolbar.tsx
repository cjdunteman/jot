import React from 'react';
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

function alignText(param: string) {
  // e.preventDefault();
  document.getElementById('text').style.textAlign = param;
}

const Toolbar = () => (
  <Tb.Root className="ToolbarRoot" aria-label="Formatting options">
    <Tb.ToggleGroup type="multiple" aria-label="Text formatting">
      <Tb.ToggleItem className="ToolbarToggleItem" value="bold" aria-label="Bold">
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
      <Tb.ToggleItem className="ToolbarToggleItem" value="left" onClick={() => alignText('left')} aria-label="Left aligned">
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
);

export default Toolbar;