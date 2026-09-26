import type { BaseEntity } from "./common";
import type { TabSnapshot } from "./tab";

/**
 * Session Capsule: a snapshot of browser state at a point in time
 */
export interface Session extends BaseEntity {
  name: string;
  workspaceId: string;
  tabs: TabSnapshot[];
  description?: string;
  tags: string[];
  pinned: boolean;
}

export interface SessionRestoreOptions {
  newWindow?: boolean;
  replaceCurrent?: boolean;
  preventDuplicates?: boolean;
}

export interface SessionRestoreResult {
  success: boolean;
  openedTabCount: number;
  failedTabs: Array<{
    url: string;
    error: string;
  }>;
}

export interface CreateSessionInput {
  name: string;
  workspaceId: string;
  description?: string;
  tags?: string[];
}
