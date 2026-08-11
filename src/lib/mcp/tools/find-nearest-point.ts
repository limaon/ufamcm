import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getAllTrails } from "../../../utils/mapData.js";

function distanceMeters(aLat: number, aLon: number, bLat: number, bLon: number) {
  const R = 6371000;
  const toRad = (v: number) => (v * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLon = toRad(bLon - aLon);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export default defineTool({
  name: "find_nearest_trail_point",
  title: "Find nearest trail point",
  description:
    "Find the closest mapped trail points to a latitude/longitude on the UFAM campus, with distance in meters.",
  inputSchema: {
    lat: z.number().describe("Latitude in decimal degrees."),
    lon: z.number().describe("Longitude in decimal degrees."),
    limit: z.number().int().positive().default(5).describe("How many nearby points to return."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ lat, lon, limit }) => {
    const points = getAllTrails().flatMap((trail) =>
      trail.points.map((point: { lat: number; lon: number; imageId: string }) => ({
        trailId: trail.id,
        trailName: trail.name,
        lat: point.lat,
        lon: point.lon,
        imageId: point.imageId,
        distanceMeters: Math.round(distanceMeters(lat, lon, point.lat, point.lon)),
      })),
    );
    const nearest = points.sort((a, b) => a.distanceMeters - b.distanceMeters).slice(0, limit ?? 5);
    return {
      content: [{ type: "text", text: JSON.stringify(nearest, null, 2) }],
      structuredContent: { points: nearest },
    };
  },
});
