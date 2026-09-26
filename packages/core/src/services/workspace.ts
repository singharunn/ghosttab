import { v4 as uuidv4 } from "uuid";
import type {
  Workspace,
  WorkspaceSnapshot,
  CreateWorkspaceInput,
  UpdateWorkspaceInput,
} from "../types";

/**
 * WorkspaceService handles workspace operations
 * Includes creation, deletion, update, and persistence logic
 */
export class WorkspaceService {
  /**
   * Creates a new workspace
   */
  static createWorkspace(input: CreateWorkspaceInput): Workspace {
    const now = new Date();
    return {
      id: uuidv4(),
      name: input.name,
      description: input.description,
      icon: input.icon || "💻",
      color: input.color || "#3B82F6",
      tabs: [],
      pinned: false,
      settings: {
        autoCloseEmptyTabs: false,
        preventDuplicates: false,
      },
      createdAt: now,
      updatedAt: now,
    };
  }

  /**
   * Updates an existing workspace
   */
  static updateWorkspace(
    workspace: Workspace,
    input: UpdateWorkspaceInput
  ): Workspace {
    return {
      ...workspace,
      ...input,
      updatedAt: new Date(),
    };
  }

  /**
   * Creates a snapshot for persistence
   */
  static createSnapshot(workspace: Workspace): WorkspaceSnapshot {
    return {
      id: workspace.id,
      name: workspace.name,
      description: workspace.description,
      icon: workspace.icon,
      color: workspace.color,
      tabs: workspace.tabs.map((tab) => ({
        id: tab.id,
        url: tab.url,
        title: tab.title,
        domain: tab.domain,
        favicon: tab.favicon,
        pinned: tab.pinned,
        createdAt: tab.createdAt,
      })),
      pinned: workspace.pinned,
      createdAt: workspace.createdAt,
      updatedAt: workspace.updatedAt,
    };
  }

  /**
   * Restores workspace from snapshot
   */
  static fromSnapshot(snapshot: WorkspaceSnapshot): Workspace {
    return {
      id: snapshot.id,
      name: snapshot.name,
      description: snapshot.description,
      icon: snapshot.icon,
      color: snapshot.color,
      tabs: snapshot.tabs.map((tab) => ({
        ...tab,
        active: false,
        pinned: tab.pinned,
      })),
      pinned: snapshot.pinned,
      settings: {
        autoCloseEmptyTabs: false,
        preventDuplicates: false,
      },
      createdAt: snapshot.createdAt,
      updatedAt: snapshot.updatedAt,
    };
  }

  /**
   * Duplicates a workspace with new ID
   */
  static duplicate(workspace: Workspace): Workspace {
    const now = new Date();
    return {
      ...workspace,
      id: uuidv4(),
      name: `${workspace.name} (Copy)`,
      pinned: false,
      createdAt: now,
      updatedAt: now,
    };
  }
}
