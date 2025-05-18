import { Checkbox, Container, Separator } from '@/design-system';
import { EditorToolbar } from '@/editor/editor-toolbar';
import { useEditorStyles } from '@/editor/use-editor-styles';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import CharacterCount from '@tiptap/extension-character-count';
import Code from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
import Document from '@tiptap/extension-document';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import History from '@tiptap/extension-history';
import Italic from '@tiptap/extension-italic';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Text from '@tiptap/extension-text';
import Underline from '@tiptap/extension-underline';
import type { NodeViewProps } from '@tiptap/react';
import {
  EditorContent,
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  useEditor,
} from '@tiptap/react';
import { useState } from 'react';

interface EditorProps {
  content?: string;
  onChange?: (content: string) => void;
  editable?: boolean;
}

const TaskItemNodeView = (props: NodeViewProps) => {
  const checked = props.node.attrs.checked;
  return (
    <NodeViewWrapper as="li">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={checked}
          onCheckedChange={() => {
            props.updateAttributes({ checked: !checked });
          }}
        />
        <div className={checked ? 'line-through text-muted-foreground' : ''}>
          <NodeViewContent />
        </div>
      </div>
    </NodeViewWrapper>
  );
};

export function Editor({ content = '', onChange, editable = true }: EditorProps) {
  const { extensionConfigs, editorClassName } = useEditorStyles();

  const [counts, setCounts] = useState({ words: 0, chars: 0 });

  const editor = useEditor(
    {
      extensions: [
        // Core extensions
        Document,
        Paragraph.configure(extensionConfigs.Paragraph),
        Heading.configure(extensionConfigs.Heading),
        Text,
        History,
        HardBreak,

        // Lists
        ListItem,
        BulletList,
        OrderedList,
        TaskList,
        TaskItem.extend({
          addNodeView() {
            return ReactNodeViewRenderer(TaskItemNodeView);
          },
        }),

        // Tables
        Table.configure(extensionConfigs.Table),
        TableHeader,
        TableCell,
        TableRow,

        // Placeholder
        Placeholder.configure(extensionConfigs.Placeholder),

        // Marks
        Bold,
        Italic,
        Underline,
        Code,
        CodeBlock,

        // Character/Word Count
        CharacterCount,
      ],
      content,
      editable,
      editorProps: {
        attributes: {
          class: editorClassName,
        },
      },
      onCreate: ({ editor }) => {
        // TOOD: Replace this with word count extension
        const text = editor.getText().trim();
        const words = text.length > 0 ? text.split(' ').length : 0;
        const chars = text.length;
        setCounts({ words, chars });
      },
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        onChange?.(html);

        // TOOD: Replace this with word count extension
        const text = editor.getText().trim();
        const words = text.length > 0 ? text.split(' ').length : 0;
        const chars = text.length;
        setCounts({ words, chars });
      },
    },
    [setCounts],
  );

  return (
    <Container className="h-full">
      <div className="h-full flex flex-col">
        <div className="flex-1 mt-2 sm:mt-4 p-2 sm:p-4 overflow-y-auto bg-background">
          <EditorContent editor={editor} className="tiptap min-h-full outline-none" />
        </div>

        <Separator />

        <div className="overflow-x-auto w-full">
          <EditorToolbar editor={editor} counts={counts} />
        </div>
      </div>
    </Container>
  );
}
