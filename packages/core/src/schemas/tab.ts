import { z } from "zod";

export const TabSchema = z.object({
  id: z.string().uuid(),
  url: z.string().url().or(z.string().startsWith("chrome://")),
  title: z.string().min(1),
  domain: z.string().min(1),
  favicon: z.string().optional(),
  pinned: z.boolean(),
  active: z.boolean(),
  windowId: z.number().optional(),
  tabId: z.number().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const TabSnapshotSchema = z.object({
  id: z.string().uuid(),
  url: z.string().url().or(z.string().startsWith("chrome://")),
  title: z.string().min(1),
  domain: z.string().min(1),
  favicon: z.string().optional(),
  pinned: z.boolean(),
  createdAt: z.date(),
});

export type TabType = z.infer<typeof TabSchema>;
export type TabSnapshotType = z.infer<typeof TabSnapshotSchema>;
