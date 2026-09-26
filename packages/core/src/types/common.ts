/**
 * Common type definitions used across GhostTab
 */

export interface Timestamp {
  createdAt: Date;
  updatedAt: Date;
}

export interface Identifiable {
  id: string;
}

export interface BaseEntity extends Identifiable, Timestamp {}

export type RGB = `rgb(${number}, ${number}, ${number})`;
export type HEX = `#${string}`;
export type Color = HEX | RGB | string;
