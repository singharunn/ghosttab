import type { BaseEntity } from "./common";

/**
 * Represents a browser tab
 */
export interface Tab extends BaseEntity {
  url: string;
  title: string;
  domain: string;
  favicon?: string;
  pinned: boolean;
  active: boolean;
  windowId?: number;
  tabId?: number;
}

/**
 * Snapshot of a tab for persistence
 */
export interface TabSnapshot {
  id: string;
  url: string;
  title: string;
  domain: string;
  favicon?: string;
  pinned: boolean;
  createdAt: Date;
}

export interface TabRestoreResult {
  success: boolean;
  tabId?: number;
  error?: string;
}

export interface DuplicateTabInfo {
  isDuplicate: boolean;
  existingTabId?: string;
  reason?: string;
}
