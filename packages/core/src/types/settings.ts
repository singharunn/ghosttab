/**
 * User settings and preferences
 */

export type Theme = "dark" | "light" | "system";

export interface AppearanceSettings {
  theme: Theme;
  accentColor?: string;
  fontSize: "sm" | "md" | "lg";
}

export interface WorkspaceSettingsPreferences {
  defaultWorkspace: string;
  autoRestoreLastWorkspace: boolean;
}

export interface TabSettingsPreferences {
  duplicateHandling: "allow" | "prevent" | "warn";
  restorePinnedTabs: boolean;
  autoCloseEmptyTabs: boolean;
}

export interface VanishModeSettings {
  enabled: boolean;
  autoCleanup: boolean;
  autoCleanupDelay: number; // minutes
  confirmBeforeClear: boolean;
}

export interface PrivacySettings {
  telemetryEnabled: false; // Always false
  analyticsEnabled: false; // Always false
  crashReportsEnabled: false; // Always false
}

export interface DataSettings {
  autoBackup: boolean;
  autoBackupInterval: number; // minutes
  maxBackups: number;
}

export interface KeyboardShortcuts {
  openDashboard: string;
  commandPalette: string;
  searchTabs: string;
  newWorkspace: string;
  saveSession: string;
}

export interface Settings {
  appearance: AppearanceSettings;
  workspace: WorkspaceSettingsPreferences;
  tabs: TabSettingsPreferences;
  vanishMode: VanishModeSettings;
  privacy: PrivacySettings;
  data: DataSettings;
  shortcuts: KeyboardShortcuts;
}

export const DEFAULT_SETTINGS: Settings = {
  appearance: {
    theme: "system",
    fontSize: "md",
  },
  workspace: {
    defaultWorkspace: "personal",
    autoRestoreLastWorkspace: false,
  },
  tabs: {
    duplicateHandling: "prevent",
    restorePinnedTabs: true,
    autoCloseEmptyTabs: false,
  },
  vanishMode: {
    enabled: true,
    autoCleanup: false,
    autoCleanupDelay: 60,
    confirmBeforeClear: true,
  },
  privacy: {
    telemetryEnabled: false,
    analyticsEnabled: false,
    crashReportsEnabled: false,
  },
  data: {
    autoBackup: true,
    autoBackupInterval: 60,
    maxBackups: 10,
  },
  shortcuts: {
    openDashboard: "Ctrl+Alt+G",
    commandPalette: "Ctrl+K",
    searchTabs: "Ctrl+Shift+F",
    newWorkspace: "Ctrl+Shift+N",
    saveSession: "Ctrl+Shift+S",
  },
};
