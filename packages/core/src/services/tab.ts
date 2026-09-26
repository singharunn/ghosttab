import { v4 as uuidv4 } from "uuid";
import type { Tab, TabSnapshot } from "../types";
import { isValidUrl, extractDomain } from "../utils/validation";

/**
 * TabService handles individual tab operations
 */
export class TabService {
  /**
   * Creates a new tab object
   */
  static createTab(
    url: string,
    title: string,
    options?: {
      favicon?: string;
      pinned?: boolean;
      tabId?: number;
      windowId?: number;
    }
  ): Tab {
    if (!isValidUrl(url)) {
      throw new Error(`Invalid URL: ${url}`);
    }

    const now = new Date();
    return {
      id: uuidv4(),
      url,
      title: title || url,
      domain: extractDomain(url),
      favicon: options?.favicon,
      pinned: options?.pinned || false,
      active: false,
      tabId: options?.tabId,
      windowId: options?.windowId,
      createdAt: now,
      updatedAt: now,
    };
  }

  /**
   * Creates a snapshot for persistence
   */
  static createSnapshot(tab: Tab): TabSnapshot {
    return {
      id: tab.id,
      url: tab.url,
      title: tab.title,
      domain: tab.domain,
      favicon: tab.favicon,
      pinned: tab.pinned,
      createdAt: tab.createdAt,
    };
  }

  /**
   * Checks if two tabs are duplicates by URL
   */
  static isDuplicate(tab1: Tab | TabSnapshot, tab2: Tab | TabSnapshot): boolean {
    return tab1.url === tab2.url;
  }

  /**
   * Finds duplicate tabs in a list
   */
  static findDuplicates(tabs: (Tab | TabSnapshot)[]): string[] {
    const seen = new Map<string, string>();
    const duplicates: string[] = [];

    for (const tab of tabs) {
      if (seen.has(tab.url)) {
        duplicates.push(tab.id);
      } else {
        seen.set(tab.url, tab.id);
      }
    }

    return duplicates;
  }

  /**
   * Extracts favicon URL from HTML
   */
  static extractFavicon(url: string): string | undefined {
    try {
      const urlObj = new URL(url);
      return `https://www.google.com/s2/favicons?sz=16&domain=${urlObj.hostname}`;
    } catch {
      return undefined;
    }
  }
}
