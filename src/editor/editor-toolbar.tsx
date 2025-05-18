import {
  Button,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator,
  Tooltip,
} from '@/design-system';
import { type Editor } from '@tiptap/react';
import {
  Bold,
  CheckSquare,
  CodeXml,
  Italic,
  List,
  ListOrdered,
  SquareCode,
  Table,
  Underline,
} from 'lucide-react';
import React from 'react';

type ToolbarButtonProps = {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  tooltipContent: string;
  shortcut?: string;
};

function ToolbarButton({
  onClick,
  isActive,
  children,
  tooltipContent,
  shortcut,
}: ToolbarButtonProps) {
  return (
    <Tooltip content={tooltipContent} shortcut={shortcut}>
      <Button
        variant="ghost"
        size="sm"
        onClick={onClick}
        className={cn(
          'text-gray-400 p-1.5 rounded hover:bg-muted transition-colors hover:text-primary',
          isActive && 'bg-muted text-primary',
        )}
      >
        {children}
      </Button>
    </Tooltip>
  );
}

interface EditorToolbarProps {
  editor: Editor | null;
  counts: { words: number; chars: number };
}

const ToolbarSeparator = () => <Separator orientation="vertical" className="opacity-50 my-1" />;

const blockTypes = [
  {
    label: 'Paragraph',
    value: 'paragraph',
    isActive: (editor: Editor) => editor.isActive('paragraph'),
    onClick: (editor: Editor) => editor.chain().focus().setParagraph().run(),
  },
  {
    label: 'Heading 1',
    value: 'heading1',
    isActive: (editor: Editor) => editor.isActive('heading', { level: 1 }),
    onClick: (editor: Editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    label: 'Heading 2',
    value: 'heading2',
    isActive: (editor: Editor) => editor.isActive('heading', { level: 2 }),
    onClick: (editor: Editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    label: 'Heading 3',
    value: 'heading3',
    isActive: (editor: Editor) => editor.isActive('heading', { level: 3 }),
    onClick: (editor: Editor) => editor.chain().focus().toggleHeading({ level: 3 }).focus().run(),
  },
  {
    label: 'Heading 4',
    value: 'heading4',
    isActive: (editor: Editor) => editor.isActive('heading', { level: 4 }),
    onClick: (editor: Editor) => editor.chain().focus().toggleHeading({ level: 4 }).focus().run(),
  },
  {
    label: 'Heading 5',
    value: 'heading5',
    isActive: (editor: Editor) => editor.isActive('heading', { level: 5 }),
    onClick: (editor: Editor) => editor.chain().focus().toggleHeading({ level: 5 }).focus().run(),
  },
  {
    label: 'Heading 6',
    value: 'heading6',
    isActive: (editor: Editor) => editor.isActive('heading', { level: 6 }),
    onClick: (editor: Editor) => editor.chain().focus().toggleHeading({ level: 6 }).focus().run(),
  },
];

export function EditorToolbar({ editor, counts }: EditorToolbarProps) {
  const words = counts.words;
  const chars = counts.chars;

  if (!editor) {
    return null;
  }

  // Toolbar configuration array
  type ToolbarItem =
    | {
        type: 'button';
        icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
        onClick: () => void;
        isActive?: boolean;
        tooltip: string;
        shortcut?: string;
      }
    | { type: 'separator' }
    | { type: 'custom-block-dropdown' };

  const toolbarItems: ToolbarItem[] = [
    { type: 'separator' },
    {
      type: 'button',
      icon: () => <Bold style={{ width: 14, height: 14 }} />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
      tooltip: 'Bold',
      shortcut: '⌘B',
    },
    {
      type: 'button',
      icon: () => <Italic style={{ width: 14, height: 14 }} />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
      tooltip: 'Italic',
      shortcut: '⌘I',
    },
    {
      type: 'button',
      icon: Underline,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive('underline'),
      tooltip: 'Underline',
      shortcut: '⌘U',
    },
    { type: 'separator' },
    {
      type: 'button',
      icon: () => <CodeXml />,
      onClick: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive('code'),
      tooltip: 'Inline Code',
      shortcut: '⌘E',
    },
    {
      type: 'button',
      icon: () => <SquareCode />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: editor.isActive('codeBlock'),
      tooltip: 'Code Block',
      shortcut: '⌘⇧E',
    },
    { type: 'separator' },
    {
      type: 'button',
      icon: List,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
      tooltip: 'Bullet List',
      shortcut: '⇧⌘8',
    },
    {
      type: 'button',
      icon: ListOrdered,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
      tooltip: 'Numbered List',
      shortcut: '⇧⌘7',
    },
    {
      type: 'button',
      icon: CheckSquare,
      onClick: () => editor.chain().focus().toggleTaskList().run(),
      isActive: editor.isActive('taskList'),
      tooltip: 'Task List',
      shortcut: '',
    },
    { type: 'separator' },
    {
      type: 'button',
      icon: Table,
      onClick: () =>
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
      isActive: editor.isActive('table'),
      tooltip: 'Insert Table',
      shortcut: '',
    },
  ];

  return (
    <div className="flex items-center justify-between gap-1 p-1">
      <div className="flex gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="justify-start text-gray-400 hover:text-primary transition-colors"
            >
              {blockTypes.find(b => b.isActive(editor))?.label || 'Paragraph'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="gap-1">
            {blockTypes.map(block => (
              <DropdownMenuItem
                key={block.value}
                onClick={() => block.onClick(editor)}
                className={cn(
                  'cursor-pointer text-xs first:mt-0 last:mb-0 my-1',
                  block.isActive(editor) && 'bg-muted text-primary',
                )}
              >
                {block.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Render the rest of the toolbar items */}
        {toolbarItems.map((item, idx) => {
          if (item.type === 'separator') {
            return <ToolbarSeparator key={`sep-${idx}`} />;
          }
          if (item.type === 'button') {
            const Icon = item.icon;
            if (!Icon) return null;
            return (
              <ToolbarButton
                key={`button-${idx}`}
                onClick={item.onClick}
                isActive={item.isActive}
                tooltipContent={item.tooltip}
                shortcut={item.shortcut}
              >
                <Icon />
              </ToolbarButton>
            );
          }
          // fallback for unexpected item types
          return null;
        })}
      </div>
      <div className="flex items-center gap-4 text-xs text-muted-foreground/50 px-2">
        <span>
          Words: <span className="text-primary/50 font-medium">{words}</span>
        </span>
        <span>
          Chars: <span className="text-primary/50 font-medium">{chars}</span>
        </span>
      </div>
    </div>
  );
}
