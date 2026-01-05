import * as z from "zod";

export const StopTimeSchema = z.object({
  stopTime: z.object({
    arrivalTime: z.string(),
    stopId: z.string(),
    stopHeadsign: z.string(),
    routeLongName: z.string(),
    routeShortName: z.string(),
    tripId: z.string(),
    tripHeadSign: z.string(),
  }),
  tripUpdate: z.object({
    delay: z.number(),
    cancelled: z.boolean(),
    calculatedArrivalTime: z.string(),
    minutesUntill: z.number(),
  }),
  alerts: z
    .array(
      z.object({
        header: z.string(),
        description: z.string(),
      })
    )
    .optional(),
});

export type StopTime = z.infer<typeof StopTimeSchema>;
