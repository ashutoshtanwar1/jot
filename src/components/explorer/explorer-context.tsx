import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { explorerTemplates } from './templates';

export type ExplorerNode = {
  id: string;
  name: string;
  isFolder: boolean;
  items: ExplorerNode[];
  content?: string; // Only for files
  createDate?: string; // ISO string
  lastUpdatedDate?: string; // ISO string
  lastOpenedDate?: string; // ISO string
};

export type ExplorerContextType = {
  tree: ExplorerNode[];
  setTree: React.Dispatch<React.SetStateAction<ExplorerNode[]>>;
  activeId: string | null;
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
  openFileIds: string[];
  openFile: (id: string) => void;
  closeFile: (id: string) => void;
  addNode: (parentId: string | null, node: ExplorerNode) => void;
  removeNode: (id: string) => void;
  renameNode: (id: string, name: string) => void;
  updateFileContent: (id: string, content: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchOpen: boolean;
  setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ExplorerContext = createContext<ExplorerContextType | undefined>(undefined);

// The initial tree structure, now including the "Examples" folder and template notes
const initialTree: ExplorerNode[] = [
  {
    id: 'examples-folder',
    name: 'Examples',
    isFolder: true,
    items: explorerTemplates,
  },
];

const OPEN_FILE_IDS_KEY = 'explorer-openFileIds';
const ACTIVE_ID_KEY = 'explorer-activeId';
const TREE_KEY = 'explorer-tree';

export const ExplorerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize tree from localStorage if present
  const [tree, setTree] = useState<ExplorerNode[]>(() => {
    const stored = localStorage.getItem(TREE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return initialTree;
      }
    }
    return initialTree;
  });

  // Initialize activeId from localStorage if present
  const [activeId, setActiveId] = useState<string | null>(() => {
    return localStorage.getItem(ACTIVE_ID_KEY) || null;
  });

  // Initialize openFileIds from localStorage if present
  const [openFileIds, setOpenFileIds] = useState<string[]>(() => {
    const stored = localStorage.getItem(OPEN_FILE_IDS_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });

  const isMobileScreen = window.innerWidth <= 768;
  const [sidebarOpen, setSidebarOpen] = useState(isMobileScreen ? false : true);
  const [searchOpen, setSearchOpen] = useState(false);
  // Persist tree to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(TREE_KEY, JSON.stringify(tree));
  }, [tree]);

  // Persist activeId to localStorage whenever it changes
  useEffect(() => {
    if (activeId) {
      localStorage.setItem(ACTIVE_ID_KEY, activeId);
    } else {
      localStorage.removeItem(ACTIVE_ID_KEY);
    }
  }, [activeId]);

  // Persist openFileIds to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(OPEN_FILE_IDS_KEY, JSON.stringify(openFileIds));
  }, [openFileIds]);

  // Helper to find and update a node recursively
  const updateNode = useCallback(
    (
      nodes: ExplorerNode[],
      id: string,
      cb: (node: ExplorerNode, idx: number, arr: ExplorerNode[]) => void,
    ): ExplorerNode[] => {
      return nodes.map((node, idx, arr) => {
        if (node.id === id) {
          const copy = { ...node };
          cb(copy, idx, arr);
          return copy;
        }
        if (node.isFolder && node.items.length > 0) {
          return { ...node, items: updateNode(node.items, id, cb) };
        }
        return node;
      });
    },
    [],
  );

  const addNode = useCallback(
    (parentId: string | null, node: ExplorerNode) => {
      const now = new Date().toISOString();
      const nodeWithDates = {
        ...node,
        createDate: node.createDate || now,
        lastUpdatedDate: node.lastUpdatedDate || now,
        lastOpenedDate: node.lastOpenedDate || undefined,
      };
      if (!parentId) {
        setTree(prev => [...prev, nodeWithDates]);
        return;
      }
      setTree(prev =>
        updateNode(prev, parentId, parent => {
          if (parent.isFolder) {
            parent.items = [...parent.items, nodeWithDates];
          }
        }),
      );
    },
    [updateNode],
  );

  const removeNode = useCallback((id: string) => {
    const removeRec = (nodes: ExplorerNode[]): ExplorerNode[] => {
      return nodes.filter(node => {
        if (node.id === id) return false;
        if (node.isFolder && node.items.length > 0) {
          node.items = removeRec(node.items);
        }
        return true;
      });
    };
    setTree(prev => removeRec(prev));
  }, []);

  const renameNode = useCallback(
    (id: string, name: string) => {
      setTree(prev =>
        updateNode(prev, id, node => {
          node.name = name;
        }),
      );
    },
    [updateNode],
  );

  const openFile = useCallback(
    (id: string) => {
      setOpenFileIds(prev => (prev.includes(id) ? prev : [...prev, id]));
      setActiveId(id);
      const now = new Date().toISOString();
      if (isMobileScreen) {
        setSidebarOpen(false);
      }
      setTree(prev =>
        updateNode(prev, id, node => {
          if (!node.isFolder) {
            node.lastOpenedDate = now;
          }
        }),
      );
    },
    [isMobileScreen, updateNode],
  );

  const closeFile = useCallback(
    (id: string) => {
      const newOpenFileIds = openFileIds.filter(fid => fid !== id);
      setActiveId(prev => (prev === id ? newOpenFileIds.at(-1) ?? null : prev));
      setOpenFileIds(newOpenFileIds);
      if (isMobileScreen && newOpenFileIds.length === 0) {
        setSidebarOpen(true);
      }
    },
    [isMobileScreen, openFileIds],
  );

  const updateFileContent = useCallback(
    (id: string, content: string) => {
      const now = new Date().toISOString();
      setTree(prev =>
        updateNode(prev, id, node => {
          if (!node.isFolder) {
            node.content = content;
            node.lastUpdatedDate = now;
          }
        }),
      );
    },
    [updateNode],
  );

  return (
    <ExplorerContext.Provider
      value={{
        tree,
        setTree,
        activeId,
        setActiveId,
        openFileIds,
        openFile,
        closeFile,
        addNode,
        removeNode,
        renameNode,
        updateFileContent,
        sidebarOpen,
        setSidebarOpen,
        searchOpen,
        setSearchOpen,
      }}
    >
      {children}
    </ExplorerContext.Provider>
  );
};

export function useExplorer() {
  const ctx = useContext(ExplorerContext);
  if (!ctx) throw new Error('useExplorer must be used within ExplorerProvider');
  return ctx;
}
