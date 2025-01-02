import { z } from "zod";

const headerSchema = z.object({
  key: z.string(),
  value: z.string(),
});

const ruleSchema = z.object({
  path: z.string(),
  upstreams: z.array(z.string()),
});

const upstreamSchema = z.object({
  id: z.string(),
  url: z.string().url(),
});

const serverConfigSchema = z.object({
  listen: z.number(),
  workers: z.number().optional(),
  upstreams: z.array(upstreamSchema),
  headerSchema: z.array(headerSchema).optional(),
  rules: z.array(ruleSchema),
});

export const rootConfigSchema = z.object({
  server: serverConfigSchema,
});
