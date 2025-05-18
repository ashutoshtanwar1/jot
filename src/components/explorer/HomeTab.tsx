import React from 'react';
import { useExplorer } from './explorer-context';
import { NodePreview } from './NodePreview';
import RecentlyOpened from './RecentlyOpened';
import { explorerTemplates } from './templates';

const HomeTab: React.FC = () => {
  const { addNode, openFile } = useExplorer();

  const handleCreateFromTemplate = (template: (typeof explorerTemplates)[number]) => {
    const newId = Date.now().toString() + Math.random().toString(36).slice(2, 6);
    addNode(null, {
      id: newId,
      name: template.name.replace(/^\d+\. /, ''),
      isFolder: false,
      items: [],
      content: template.content,
    });
    openFile(newId);
  };

  return (
    <div className="mt-4 w-full flex items-center justify-center h-full text-muted-foreground flex-col">
      <RecentlyOpened />

      <div className="mt-8">
        <span className="mb-2 text-sm font-semibold text-muted-foreground">
          Start from a template
        </span>

        <div className="flex flex-row gap-3 overflow-auto w-[640px]">
          {explorerTemplates.map(template => (
            <NodePreview
              key={template.id}
              node={template}
              onClick={() => handleCreateFromTemplate(template)}
              buttonText="Use this template"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeTab;
