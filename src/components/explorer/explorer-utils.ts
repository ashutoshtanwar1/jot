import type { ExplorerNode } from './explorer-context';

/**
 * Recursively finds the id of the first parent folder containing the node with the given id.
 * Returns null if not found or if the node is at the root level.
 */
export function findParentFolderId(nodes: ExplorerNode[], targetId: string): string | null {
  for (const node of nodes) {
    if (node.isFolder) {
      if (node.id === targetId) {
        return targetId;
      }
      const foundNode = node.items.find(child => child.id === targetId);
      // Check if any direct child matches
      if (foundNode) {
        return foundNode.isFolder ? foundNode.id : node.id;
      }
      // Otherwise, recurse into children
      const found = findParentFolderId(node.items, targetId);

      if (found) return found;
    }
  }
  return null;
}
