import { v4 as uuidv4 } from "uuid";
import type { Session, CreateSessionInput, TabSnapshot } from "../types";

/**
 * SessionService handles session capsule operations
 * Includes save, restore, and management logic
 */
export class SessionService {
  /**
   * Creates a new session from current state
   */
  static createSession(
    input: CreateSessionInput,
    tabs: TabSnapshot[]
  ): Session {
    const now = new Date();
    return {
      id: uuidv4(),
      name: input.name,
      workspaceId: input.workspaceId,
      tabs,
      description: input.description,
      tags: input.tags || [],
      pinned: false,
      createdAt: now,
      updatedAt: now,
    };
  }

  /**
   * Updates session metadata
   */
  static updateSession(
    session: Session,
    updates: Partial<Omit<Session, "id" | "createdAt">>
  ): Session {
    return {
      ...session,
      ...updates,
      updatedAt: new Date(),
    };
  }

  /**
   * Duplicates a session with new ID
   */
  static duplicate(session: Session): Session {
    const now = new Date();
    return {
      ...session,
      id: uuidv4(),
      name: `${session.name} (Copy)`,
      pinned: false,
      createdAt: now,
      updatedAt: now,
    };
  }

  /**
   * Filters duplicate tabs based on URL
   */
  static filterDuplicates(
    sessionTabs: TabSnapshot[],
    existingTabs: TabSnapshot[]
  ): TabSnapshot[] {
    const existingUrls = new Set(existingTabs.map((tab) => tab.url));
    return sessionTabs.filter((tab) => !existingUrls.has(tab.url));
  }

  /**
   * Merges session tabs with existing tabs
   */
  static mergeTabs(
    sessionTabs: TabSnapshot[],
    existingTabs: TabSnapshot[],
    preventDuplicates = true
  ): TabSnapshot[] {
    if (preventDuplicates) {
      return [...existingTabs, ...this.filterDuplicates(sessionTabs, existingTabs)];
    }
    return [...existingTabs, ...sessionTabs];
  }
}
