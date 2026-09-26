import { z } from "zod";
import { TabSnapshotSchema } from "./tab";

export const CreateSessionInputSchema = z.object({
  name: z.string().min(1).max(100),
  workspaceId: z.string().uuid().or(z.string()),
  description: z.string().max(500).optional(),
  tags: z.array(z.string()).default([]),
});

export const SessionRestoreOptionsSchema = z.object({
  newWindow: z.boolean().optional(),
  replaceCurrent: z.boolean().optional(),
  preventDuplicates: z.boolean().optional(),
});

export const SessionSnapshotSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  workspaceId: z.string(),
  tabs: z.array(TabSnapshotSchema),
  description: z.string().optional(),
  tags: z.array(z.string()),
  pinned: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateSessionInputType = z.infer<typeof CreateSessionInputSchema>;
export type SessionRestoreOptionsType = z.infer<typeof SessionRestoreOptionsSchema>;
