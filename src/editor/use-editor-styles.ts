import BulletList from '@tiptap/extension-bullet-list';
import { Heading, type HeadingOptions } from '@tiptap/extension-heading';
import OrderedList from '@tiptap/extension-ordered-list';
import { Paragraph, type ParagraphOptions } from '@tiptap/extension-paragraph';
import type { PlaceholderOptions } from '@tiptap/extension-placeholder';
import type { TableOptions } from '@tiptap/extension-table';
import { useMemo } from 'react';

interface ExtensionConfigs {
  Paragraph: Partial<ParagraphOptions>;
  Heading: Partial<HeadingOptions>;
  Table: Partial<TableOptions>;
  Placeholder: Partial<PlaceholderOptions>;
}

export function useEditorStyles() {
  // Configs for Tiptap extensions
  const extensionConfigs = useMemo<ExtensionConfigs>(
    () => ({
      Paragraph: {
        HTMLAttributes: {
          class: 'tiptap-paragraph',
        },
      },
      Heading: {
        HTMLAttributes: {
          class: 'tiptap-heading',
        },
      },
      Table: {
        cellMinWidth: 50,
        resizable: true,
        lastColumnResizable: true,
        allowTableNodeSelection: true,
      },
      Placeholder: {
        placeholder: ({ node }) => {
          if (node.type.name === Heading.name) {
            return 'Heading...';
          }
          if (node.type.name === Paragraph.name) {
            return 'Start writing...';
          }
          if (node.type.name === BulletList.name || node.type.name === OrderedList.name) {
            return 'Add pointer...';
          }
          return '';
        },
        showOnlyCurrent: false,
      },
    }),
    [],
  );

  const editorClassName = 'tiptap';

  return { extensionConfigs, editorClassName };
}
