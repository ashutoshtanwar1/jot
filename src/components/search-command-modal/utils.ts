import type { ExplorerNode } from '../explorer/explorer-context';

export function flattenNotes(tree: ExplorerNode[], includeFolders = false): ExplorerNode[] {
  let notes: ExplorerNode[] = [];
  for (const node of tree) {
    if (node.isFolder && node.items.length > 0) {
      notes = notes.concat(flattenNotes(node.items, includeFolders));
    }
    if (!node.isFolder || includeFolders) {
      notes.push(node);
    }
  }
  return notes;
}

export function basicSemanticScore(query: string, note: ExplorerNode) {
  const queryTokens = query.toLowerCase().split(/\s+/);
  const text = (note.name + ' ' + (note.content || '')).toLowerCase();
  let score = 0;
  for (const token of queryTokens) {
    if (text.includes(token)) score += 1;
  }
  return score;
}

export function getAllItems(
  query: string,
  notes: ExplorerNode[],
  commands: { name: string; action: () => void }[],
) {
  // Score and map notes/folders
  const noteItems = query
    ? notes
        .map(note => ({
          type: note.isFolder ? ('folder' as const) : ('file' as const),
          id: note.id,
          name: note.name,
          content: note.content,
          score: basicSemanticScore(query, note),
          node: note,
        }))
        .filter(({ score }) => score > 0)
    : [];

  // Score and map commands
  const commandItems = query
    ? commands
        .map(cmd => ({
          type: 'command' as const,
          id: cmd.name,
          name: cmd.name,
          action: cmd.action,
          score: cmd.name.toLowerCase().includes(query.toLowerCase()) ? 1 : 0,
        }))
        .filter(({ score }) => score > 0)
    : [];

  // Sort by score, then name
  return [...commandItems, ...noteItems].sort(
    (a, b) => b.score - a.score || a.name.localeCompare(b.name),
  );
}
