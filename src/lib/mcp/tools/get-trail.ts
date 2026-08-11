import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getTrailById } from "../../../utils/mapData.js";

export default defineTool({
  name: "get_trail",
  title: "Get trail details",
  description:
    "Get one UFAM campus trail by id, including every mapped point (latitude, longitude and Mapillary street-view image id).",
  inputSchema: {
    trailId: z.string().min(1).describe("Trail id, e.g. `trail1`. Use `list_trails` to discover ids."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ trailId }) => {
    const trail = getTrailById(trailId);
    if (!trail) throw new ToolError(`No trail found with id "${trailId}".`);
    const result = { id: trailId, ...trail };
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: { trail: result },
    };
  },
});
