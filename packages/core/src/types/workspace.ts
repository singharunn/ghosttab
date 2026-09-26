import type { BaseEntity, Color } from "./common";
import type { Tab, TabSnapshot } from "./tab";

/**
 * Workspace is a collection of related tabs and sessions
 */
export interface Workspace extends BaseEntity {
  name: string;
  description?: string;
  icon: string;
  color: Color;
  tabs: Tab[];
  pinned: boolean;
  settings: WorkspaceSettings;
}

export interface WorkspaceSnapshot {
  id: string;
  name: string;
  description?: string;
  icon: string;
  color: Color;
  tabs: TabSnapshot[];
  pinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkspaceSettings {
  autoCloseEmptyTabs: boolean;
  preventDuplicates: boolean;
}

export interface CreateWorkspaceInput {
  name: string;
  description?: string;
  icon?: string;
  color?: Color;
}

export interface UpdateWorkspaceInput {
  name?: string;
  description?: string;
  icon?: string;
  color?: Color;
  pinned?: boolean;
}

export const VANISH_MODE_ID = "__vanish_mode__";
export const VANISH_MODE_NAME = "Vanish Mode";
