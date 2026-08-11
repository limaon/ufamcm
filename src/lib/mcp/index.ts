import { defineMcp } from "@lovable.dev/mcp-js";
import listTrailsTool from "./tools/list-trails";
import getTrailTool from "./tools/get-trail";
import findNearestPointTool from "./tools/find-nearest-point";

export default defineMcp({
  name: "campus-navigator-ufam",
  title: "campus-navigator-ufam",
  version: "0.1.0",
  instructions:
    "Public read-only tools for the UFAM campus navigator. Use `list_trails` to see mapped campus trails, `get_trail` for a trail's full point list, and `find_nearest_trail_point` to locate the closest mapped points to a coordinate.",
  tools: [listTrailsTool, getTrailTool, findNearestPointTool],
});
