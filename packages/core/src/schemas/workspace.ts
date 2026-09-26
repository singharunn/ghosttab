import { z } from "zod";
import { TabSnapshotSchema } from "./tab";

export const CreateWorkspaceInputSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().max(500).optional(),
  icon: z.string().emoji().default("💻"),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).default("#3B82F6"),
});

export const UpdateWorkspaceInputSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  description: z.string().max(500).optional(),
  icon: z.string().emoji().optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  pinned: z.boolean().optional(),
});

export const WorkspaceSettingsSchema = z.object({
  autoCloseEmptyTabs: z.boolean(),
  preventDuplicates: z.boolean(),
});

export const WorkspaceSnapshotSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  icon: z.string(),
  color: z.string(),
  tabs: z.array(TabSnapshotSchema),
  pinned: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateWorkspaceInputType = z.infer<typeof CreateWorkspaceInputSchema>;
export type UpdateWorkspaceInputType = z.infer<typeof UpdateWorkspaceInputSchema>;
