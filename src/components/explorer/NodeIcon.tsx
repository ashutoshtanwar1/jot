import { FileText, Folder, FolderOpen } from 'lucide-react';
import React from 'react';

const NodeIcon: React.FC<{ isFolder: boolean; expanded?: boolean }> = ({ isFolder, expanded }) => {
  if (!isFolder) {
    return <FileText className="shrink-0 w-4 h-4 mr-2 text-muted-foreground" strokeWidth={1.5} />;
  }
  return expanded ? (
    <FolderOpen className="shrink-0 w-4 h-4 mr-2 text-muted-foreground" strokeWidth={1.5} />
  ) : (
    <Folder className="shrink-0 w-4 h-4 mr-2 text-muted-foreground" strokeWidth={1.5} />
  );
};

export default NodeIcon;
