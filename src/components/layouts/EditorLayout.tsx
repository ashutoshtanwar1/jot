import { Editor } from '@/editor/editor';
import React from 'react';
import type { ExplorerNode } from '../explorer/explorer-context';

interface EditorLayoutProps {
  activeFile: ExplorerNode | null;
  updateFileContent: (id: string, content: string) => void;
}

export const EditorLayout: React.FC<EditorLayoutProps> = ({ activeFile, updateFileContent }) => (
  <div className="flex-1 overflow-y-scroll">
    {activeFile ? (
      <Editor
        key={activeFile.id}
        content={activeFile.content || ''}
        onChange={content => updateFileContent(activeFile.id, content)}
      />
    ) : (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Select a file to start editing
      </div>
    )}
  </div>
);
