import { z } from "zod";

export const SettingsSchema = z.object({
  appearance: z.object({
    theme: z.enum(["dark", "light", "system"]),
    accentColor: z.string().optional(),
    fontSize: z.enum(["sm", "md", "lg"]),
  }),
  workspace: z.object({
    defaultWorkspace: z.string(),
    autoRestoreLastWorkspace: z.boolean(),
  }),
  tabs: z.object({
    duplicateHandling: z.enum(["allow", "prevent", "warn"]),
    restorePinnedTabs: z.boolean(),
    autoCloseEmptyTabs: z.boolean(),
  }),
  vanishMode: z.object({
    enabled: z.boolean(),
    autoCleanup: z.boolean(),
    autoCleanupDelay: z.number().positive(),
    confirmBeforeClear: z.boolean(),
  }),
  privacy: z.object({
    telemetryEnabled: z.literal(false),
    analyticsEnabled: z.literal(false),
    crashReportsEnabled: z.literal(false),
  }),
  data: z.object({
    autoBackup: z.boolean(),
    autoBackupInterval: z.number().positive(),
    maxBackups: z.number().positive(),
  }),
  shortcuts: z.object({
    openDashboard: z.string(),
    commandPalette: z.string(),
    searchTabs: z.string(),
    newWorkspace: z.string(),
    saveSession: z.string(),
  }),
});

export type SettingsType = z.infer<typeof SettingsSchema>;
