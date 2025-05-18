import { CommandDialog } from '@/design-system/components/ui/command';
import React, { useEffect, useState } from 'react';
import { ulid } from 'ulid';
import type { ExplorerNode } from './explorer/explorer-context';
import { useExplorer } from './explorer/explorer-context';
import { SearchCommandInput } from './search-command-modal/SearchCommandInput';
import { SearchCommandList } from './search-command-modal/SearchCommandList';
import { flattenNotes, getAllItems } from './search-command-modal/utils';
import { useTheme } from './theme/use-theme';

export type CommandItemType = {
  type: 'command';
  id: string;
  name: string;
  action: () => void;
  score: number;
};

export type NoteItemType = {
  type: 'file' | 'folder';
  id: string;
  name: string;
  content?: string;
  score: number;
  node: ExplorerNode;
};

type CommonItem = CommandItemType | NoteItemType;

export const SearchCommandModal: React.FC = () => {
  const { tree, setActiveId, addNode, setSearchOpen, searchOpen, setSidebarOpen } = useExplorer();
  const [query, setQuery] = useState('');
  const allNodes = flattenNotes(tree, true);
  const { theme, setTheme } = useTheme();

  const handleAddNode = (type: 'folder' | 'note') => {
    const nodeId = ulid();
    addNode(null, {
      id: nodeId,
      name: type === 'folder' ? 'New Folder' : 'New Note',
      isFolder: type === 'folder',
      items: [],
    });
    setActiveId(nodeId);
  };

  const COMMANDS = [
    {
      name: 'Create new note',
      action: () => handleAddNode('note'),
    },
    {
      name: 'Create new folder',
      action: () => handleAddNode('folder'),
    },
    {
      name: 'Toggle theme',
      action: () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
      },
    },
    {
      name: 'Toggle sidebar',
      action: () => {
        setSidebarOpen(sidebarOpen => !sidebarOpen);
      },
    },
    {
      name: 'Home',
      action: () => {
        setActiveId(null);
      },
    },
  ];
  const items = getAllItems(query, allNodes, COMMANDS);
  const recentFiles = allNodes
    .sort((a: ExplorerNode, b: ExplorerNode) =>
      (b.lastOpenedDate || '').localeCompare(a.lastOpenedDate || ''),
    )
    .map(
      (f: ExplorerNode) =>
        ({
          type: f.isFolder ? 'folder' : 'file',
          id: f.id,
          name: f.name,
          node: f,
        } as NoteItemType),
    );
  const commandItems = COMMANDS.map(
    cmd =>
      ({
        type: 'command' as const,
        id: cmd.name,
        name: cmd.name,
        action: cmd.action,
      } as CommandItemType),
  );

  function handleSelect(item: CommonItem) {
    if (item.type === 'command') {
      item.action();
      setSearchOpen(false);
    } else {
      setActiveId(item.id);
      setSearchOpen(false);
    }
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
      <SearchCommandInput query={query} setQuery={setQuery} />
      <SearchCommandList
        items={items.length > 0 ? items : [...commandItems, ...recentFiles]}
        onSelect={handleSelect}
      />
    </CommandDialog>
  );
};
