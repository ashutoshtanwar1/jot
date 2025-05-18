import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/design-system/components/ui/command';
import { formatDate } from '@/design-system/lib/utils';
import { Command, FileText, FolderOpen } from 'lucide-react';
import React from 'react';
import type { CommandItemType, NoteItemType } from '../SearchCommandModal';

type CommonItem = CommandItemType | NoteItemType;

type SearchCommandListProps = {
  items: CommonItem[];
  onSelect: (item: CommonItem) => void;
};

export const SearchCommandList: React.FC<SearchCommandListProps> = ({ items, onSelect }) => {
  const renderIcon = (item: CommonItem) => {
    if (item.type === 'command') return <Command className="text-muted-foreground/80  " />;
    if (item.type === 'folder') return <FolderOpen className="text-muted-foreground/80" />;
    return <FileText className="text-muted-foreground/80" />;
  };

  return (
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Results">
        {items.map(item => (
          <CommandItem
            key={item.id}
            value={`${item.id} ${item.name}`}
            onSelect={() => onSelect(item)}
          >
            {renderIcon(item)}
            <div className="flex flex-row items-center justify-between w-full">
              <span>{item.name}</span>
              {item.type !== 'command' && item.node.lastOpenedDate && (
                <span className="text-[9px] text-muted-foreground/40">
                  {`Last opened ${formatDate(item.node.lastOpenedDate).toLowerCase()}`}
                </span>
              )}
            </div>
          </CommandItem>
        ))}
      </CommandGroup>
    </CommandList>
  );
};
