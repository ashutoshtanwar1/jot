import React from 'react';
import { ulid } from 'ulid';
import { useExplorer } from './explorer-context';
import { NodePreview } from './NodePreview';
import RecentlyOpened from './RecentlyOpened';
import { explorerTemplates } from './templates';

const HomeTab: React.FC = () => {
  const { addNode, openFile } = useExplorer();

  const handleCreateFromTemplate = (template: (typeof explorerTemplates)[number]) => {
    const newId = ulid();
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
    <div className="w-full flex items-center justify-center h-full text-muted-foreground flex-col px-3">
      <RecentlyOpened />

      <div className="px-0 md:px-16 mt-8 w-full max-w-full">
        <span className="mb-2 text-sm font-semibold text-muted-foreground">
          Start from a template
        </span>

        <div className="flex flex-nowrap flex-row gap-3 overflow-x-auto w-full">
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
