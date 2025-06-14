import { z } from 'zod';

type HandlerContext = {
  bridge: (action: string, params?: Record<string, unknown>) => Promise<unknown>;
  params?: Record<string, unknown>;
};

export const listDocuments = {
  name: 'listDocuments',
  description: 'Lists all notes/documents',
  parameters: z.object({}),
  async handler({ bridge }: HandlerContext) {
    return await bridge('listDocuments');
  },
};

export const getDocument = {
  name: 'getDocument',
  description: 'Get a document by ID',
  parameters: z.object({ id: z.string() }),
  async handler({ bridge, params }: HandlerContext) {
    return await bridge('getDocument', params);
  },
};
