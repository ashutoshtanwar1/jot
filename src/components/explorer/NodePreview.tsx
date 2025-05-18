import { Button } from '@/design-system';
import { Card, CardContent, CardHeader } from '@/design-system/components/ui/card';
import { Editor } from '@/editor/editor';
import React from 'react';
import type { ExplorerNode } from './explorer-context';

interface NodePreviewProps {
  node: ExplorerNode;
  onClick: () => void;
  buttonText: string;
}

export const NodePreview: React.FC<NodePreviewProps> = ({ node, onClick, buttonText }) => {
  return (
    <Card className="my-2 bg-background/80 border-border/60 shadow-sm hover:shadow-lg transition-shadow w-full max-w-xs sm:max-w-sm">
      <CardHeader className="py-1.5 px-3 border-b flex flex-row justify-between items-center flex-nowrap">
        <span className="text-base font-medium text-foreground truncate pr-2">{node.name}</span>
        <Button size="sm" variant="outline" onClick={onClick}>
          {buttonText}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="my-2 p-0 rounded [mask-image:linear-gradient(to_top,transparent,black_50%)]">
          <div className="w-full h-[80px] sm:w-[280px] sm:h-[120px] overflow-hidden relative">
            <div
              className="scale-50 origin-top-left w-[220%]"
              style={{ pointerEvents: 'none', position: 'absolute', top: 0, left: 0 }}
            >
              <Editor content={node.content || ''} editable={false} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
