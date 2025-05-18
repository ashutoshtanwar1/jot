import React from 'react';
import type { ExplorerNode } from '../explorer/explorer-context';
import { useExplorer } from '../explorer/explorer-context';
import { EditorLayout } from './EditorLayout';
import { HeaderLayout } from './HeaderLayout';
import { SidebarLayout } from './SidebarLayout';
import { TabsLayout } from './TabsLayout';

function findNodeById(nodes: ExplorerNode[], id: string): ExplorerNode | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.isFolder && node.items.length > 0) {
      const found: ExplorerNode | null = findNodeById(node.items, id);
      if (found) return found;
    }
  }
  return null;
}

export const MainAppLayout: React.FC = () => {
  const {
    tree,
    openFileIds,
    activeId,
    setActiveId,
    closeFile,
    updateFileContent,
    sidebarOpen,
    setSidebarOpen,
  } = useExplorer();
  const openFiles = openFileIds.map(id => findNodeById(tree, id)).filter(Boolean) as ExplorerNode[];
  const activeFile = activeId ? findNodeById(tree, activeId) : null;

  return (
    <div className="h-dvh w-dvw flex flex-col bg-background text-foreground">
      <HeaderLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="flex flex-1 min-h-0">
        <SidebarLayout open={sidebarOpen} />
        <div className="flex-1 flex flex-col overflow-x-auto">
          <TabsLayout
            openFiles={openFiles}
            activeId={activeId}
            setActiveId={setActiveId}
            closeFile={closeFile}
          />
          <EditorLayout activeFile={activeFile} updateFileContent={updateFileContent} />
        </div>
      </main>
    </div>
  );
};
