import React from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { Explorer } from '../explorer/explorer';

const MIN_WIDTH = 180;
const MAX_WIDTH = 800;

export const SidebarLayout: React.FC<{ open: boolean }> = ({ open }) => (
  <div
    className={`transition-all duration-300 h-full flex flex-shrink-0 bg-card border-r border-border ${
      open ? 'w-fit opacity-100' : 'w-0 opacity-0 pointer-events-none'
    }`}
    style={{ minWidth: open ? MIN_WIDTH : 0, maxWidth: open ? MAX_WIDTH : 0 }}
  >
    {open && (
      <ResizableBox
        width={260}
        minConstraints={[MIN_WIDTH, 100]}
        maxConstraints={[MAX_WIDTH, Infinity]}
        axis="x"
        height={Infinity}
        className="bg-card border-r border-border h-full flex flex-shrink-0"
        handle={
          <span className="w-[2px] bg-border cursor-col-resize block h-full transition-all duration-200 hover:w-1 hover:bg-muted-foreground" />
        }
      >
        <Explorer />
      </ResizableBox>
    )}
  </div>
);
