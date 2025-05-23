import { Container } from '@/design-system';
import React from 'react';
import { Skeleton } from '../../design-system/components/ui/Skeleton';
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
    setSearchOpen,
    isDataLoading,
  } = useExplorer();
  const openFiles = openFileIds.map(id => findNodeById(tree, id)).filter(Boolean) as ExplorerNode[];
  const activeFile = activeId ? findNodeById(tree, activeId) : null;
  const openHomeTab = () => setActiveId(null);

  return (
    <div className="h-dvh w-dvw flex flex-col bg-background text-foreground">
      <HeaderLayout
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        openHomeTab={openHomeTab}
        setSearchOpen={setSearchOpen}
      />
      <main className="flex flex-1 min-h-0">
        <SidebarLayout open={sidebarOpen} isDataLoading={isDataLoading} />
        <div className="flex-1 flex flex-col overflow-x-auto">
          <TabsLayout
            openFiles={openFiles}
            activeId={activeId}
            setActiveId={setActiveId}
            closeFile={closeFile}
            isDataLoading={isDataLoading}
          />
          {isDataLoading ? (
            <Container className="mt-8 p-2 h-full w-full flex-1 flex flex-col gap-4">
              <Skeleton className="h-6 w-1/2 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </Container>
          ) : (
            <EditorLayout activeFile={activeFile} updateFileContent={updateFileContent} />
          )}
        </div>
      </main>
    </div>
  );
};
