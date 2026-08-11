import { defineTool } from "@lovable.dev/mcp-js";
import { getAllTrails } from "../../../utils/mapData.js";

export default defineTool({
  name: "list_trails",
  title: "List campus trails",
  description:
    "List all mapped UFAM campus trails with their id, name, display color and number of mapped points.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const trails = getAllTrails().map((trail) => ({
      id: trail.id,
      name: trail.name,
      color: trail.color,
      pointCount: trail.points.length,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(trails, null, 2) }],
      structuredContent: { trails },
    };
  },
});
