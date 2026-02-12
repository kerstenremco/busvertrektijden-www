import * as z from "zod";

export const StopTimeSchema = z.object({
  stop_id: z.string(),
  arrival_time: z.optional(z.string().nullable()),
  departure_time: z.string(),
  stop_headsign: z.optional(z.string().nullable()),
  stop_name: z.string(),
  platform_code: z.optional(z.string().nullable()),
  route_id: z.string(),
  route_short_name: z.optional(z.string().nullable()),
  route_long_name: z.optional(z.string().nullable()),
  route_color: z.optional(z.string().nullable()),
  route_text_color: z.optional(z.string().nullable()),
  trip_id: z.string(),
  trip_headsign: z.optional(z.string().nullable()),
  trip_short_name: z.optional(z.string().nullable()),
  trip_long_name: z.optional(z.string().nullable()),
  realtime: z.object({
    cancelled: z.boolean(),
    delay: z.number(),
  }),
  computed: z.object({
    time: z.string(),
    seconds: z.number(),
    name: z.string(),
  }),
  alert: z.optional(
    z.array(
      z.object({
        start: z.number(),
        end: z.number(),
        cause: z.number(),
        effect: z.number(),
        header: z.string(),
        description: z.string().nullable(),
      }),
    ),
  ),
});

export type StopTime = z.infer<typeof StopTimeSchema>;
