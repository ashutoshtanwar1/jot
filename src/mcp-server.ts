import { FastMCP } from 'fastmcp';
import { mcpTools } from './mcp-tools/index';

const server = new FastMCP({
  name: 'Jot Electron MCP',
  version: '1.0.0',
});

function bridgeToElectron(action: string, params?: Record<string, unknown>) {
  return new Promise((resolve, reject) => {
    const requestId = Math.random().toString(36).slice(2);

    function handleMessage(msg: { requestId: string; error?: string; result?: unknown }) {
      if (msg && msg.requestId === requestId) {
        process.removeListener('message', handleMessage);
        if (msg.error) {
          console.error(`[MCP] Electron bridge error for action '${action}':`, msg.error);
          reject(msg.error);
        } else {
          console.info(`[MCP] Electron bridge response for action '${action}':`, msg.result);
          resolve(msg.result);
        }
      }
    }

    console.info(`[MCP] Bridging to Electron: action='${action}', params=`, params);
    process.on('message', handleMessage);
    process.send?.({ action, params, requestId });
  });
}

for (const tool of mcpTools) {
  console.info(`[MCP] Registering tool: ${tool.name}`);
  server.addTool({
    name: tool.name,
    description: tool.description,
    parameters: tool.parameters,
    async execute(params: Record<string, unknown> = {}): Promise<string> {
      console.info(`[MCP] Executing tool: ${tool.name} with params:`, params);
      const result = await tool.handler({ bridge: bridgeToElectron, params });
      return typeof result === 'string' ? result : JSON.stringify(result);
    },
  });
}

console.info('[MCP] Starting MCP server...');
server.start({
  transportType: 'httpStream',
  httpStream: {
    port: 4000,
  },
});
console.info('[MCP] MCP server started.');
