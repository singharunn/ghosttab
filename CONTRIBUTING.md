# Contributing to GhostTab

Thank you for your interest in contributing to GhostTab! This document outlines the process, principles, and guidelines for contributing.

## Code of Conduct

We are committed to providing a welcoming and inspiring community. Please read and adhere to our principles of respect and inclusivity.

## Getting Started

### Prerequisites

- Node.js 20 LTS or newer
- pnpm 9 or newer
- Git
- A Chromium-based browser for extension testing

### Setup

```bash
git clone https://github.com/singharunn/ghosttab.git
cd ghosttab
corepack enable
pnpm install
pnpm type-check
pnpm lint
pnpm test
```

## Development Workflow

### 1. Create a Feature Branch

Branch names should be descriptive:

```bash
git checkout -b feat/workspace-color-picker
git checkout -b fix/duplicate-prevention-urls
git checkout -b docs/privacy-model-clarification
```

### 2. Make Your Changes

Follow these principles:

- **One concern per commit**: Each commit should address a single problem or feature.
- **Write tests**: Behavioral tests are required for features and bug fixes.
- **Update documentation**: Reflect changes in README.md or relevant docs.
- **Type safety**: Use strict TypeScript throughout.
- **No console warnings**: Tests and builds must pass with zero warnings.

### 3. Test Your Changes

```bash
pnpm type-check   # TypeScript strict mode
pnpm lint         # ESLint with no warnings
pnpm test         # Vitest suite
pnpm format:check # Prettier formatting
```

### 4. Format Code

```bash
pnpm format
```

### 5. Commit Messages

Use clear, present-tense imperative commit messages:

- ✅ `Add workspace color picker component`
- ✅ `Prevent duplicate tab restoration with URL normalization`
- ✅ `Document permission rationale for tabs API`
- ❌ `Fixed stuff` / `Updated code` / `WIP`

### 6. Push and Open a Pull Request

```bash
git push origin feat/workspace-color-picker
```

## Pull Request Requirements

Every pull request must include:

### Problem Statement

What user-visible or domain-level problem does this solve?

### Design Rationale

Why did you choose this approach? What alternatives were considered?

### Behavioral Tests

Tests should answer: "What behavior is now guaranteed?"

Example:

```typescript
describe('WorkspaceService', () => {
  it('should prevent duplicate workspace names within the same container', () => {
    const service = new WorkspaceService();
    service.create({ name: 'Research' });
    
    expect(() => {
      service.create({ name: 'Research' });
    }).toThrow(/duplicate/i);
  });
});
```

### Privacy and Permission Impact

- Does this introduce new permission requests?
- Does it collect, store, or transmit new data types?
- Is the privacy impact documented?

### Accessibility Impact

- Is keyboard navigation supported?
- Are ARIA labels present where needed?
- Has the change been tested with screen readers?

### Migration Notes (if applicable)

- Does this change persisted data structures?
- Is schema validation updated?
- How will existing data migrate?

### Screenshots (UI changes)

Include before/after screenshots or animated GIFs.

## Code Style

### TypeScript

```typescript
// ✅ Good
interface WorkspaceSettings {
  theme: 'light' | 'dark';
  fontSize: number;
  autoSave: boolean;
}

const createWorkspace = (name: string): Workspace => {
  if (!name.trim()) {
    throw new Error('Workspace name cannot be empty');
  }
  return { id: uuid(), name, createdAt: new Date() };
};

// ❌ Avoid
const createWorkspace = (name) => {
  if (!name) throw 'error';
  return { id: Math.random(), name };
};
```

### Naming Conventions

- **Files and directories**: kebab-case (`workspace-service.ts`, `popup-ui/`)
- **Classes and interfaces**: PascalCase (`WorkspaceService`, `TabSnapshot`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_WORKSPACES = 100`)
- **Functions and variables**: camelCase (`createWorkspace`, `isValidUrl`)

### Browser Adapters

Always wrap browser APIs behind adapters:

```typescript
// ✅ Good: adapter defines the contract
export interface BrowserTabsPort {
  query(filter: TabFilter): Promise<BrowserTab[]>;
  close(tabId: number): Promise<void>;
}

class ChromeTabsAdapter implements BrowserTabsPort {
  async query(filter: TabFilter): Promise<BrowserTab[]> {
    // Chrome implementation
  }
}

// ❌ Avoid: domain code directly calls Chrome APIs
const tabs = await chrome.tabs.query({ active: true });
```

### Validation

Always validate external input at boundaries:

```typescript
// ✅ Good: validate before use
import { z } from 'zod';

const WorkspaceSchema = z.object({
  name: z.string().min(1).max(50),
  icon: z.string().emoji(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i),
});

const workspace = WorkspaceSchema.parse(untrustedInput);

// ❌ Avoid: assume input is valid
const workspace = { ...untrustedInput };
```

## Security Guidelines

Before submitting security-related changes, read [`docs/SECURITY.md`](docs/SECURITY.md).

### Key Rules

- Never execute JavaScript from a saved URL or imported JSON
- Treat imported files and persisted data as hostile input
- Keep message payloads typed and validated
- Avoid `innerHTML`, `eval()`, and `new Function()`
- Do not send URLs to remote logging systems
- Keep privileged operations in the background boundary

## Documentation

### README.md

Update the README if your change:
- Adds a new feature or command
- Changes keyboard shortcuts
- Alters permissions
- Introduces a new technology or dependency

### Inline Comments

Comment *why*, not *what*:

```typescript
// ✅ Good: explains intent and trade-off
// Use IndexedDB instead of localStorage to support larger data sets
// and structured queries. We sacrifice IE11 compatibility.
const store = new IndexedDBStore();

// ❌ Avoid: restates code
// Loop through workspaces
for (const workspace of workspaces) {
  // ...
}
```

### Type Definitions

Exported types should have JSDoc comments:

```typescript
/**
 * A snapshot of browser tab state at a point in time.
 * @property id - Unique identifier (UUID)
 * @property url - The tab's URL
 * @property title - The tab's current title
 * @property domain - Extracted domain for display and grouping
 * @property favicon - Optional URL to the tab's icon
 * @property pinned - Whether the tab is marked as pinned
 * @property createdAt - ISO 8601 timestamp of capture
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
```

## Testing

### Test Structure

```typescript
describe('WorkspaceService', () => {
  let service: WorkspaceService;

  beforeEach(() => {
    service = new WorkspaceService();
  });

  describe('create', () => {
    it('should create a workspace with a unique ID', () => {
      const workspace = service.create({ name: 'Research' });
      expect(workspace.id).toBeDefined();
      expect(workspace.id).toMatch(/^[0-9a-f-]{36}$/); // UUID format
    });

    it('should reject empty workspace names', () => {
      expect(() => service.create({ name: '' })).toThrow();
    });
  });

  describe('duplicate prevention', () => {
    it('should allow workspaces with the same name in different containers', () => {
      const ws1 = service.create({ name: 'Research' });
      const ws2 = service.create({ name: 'Research' });
      
      expect(ws1.id).not.toBe(ws2.id);
    });
  });
});
```

### Coverage Goals

- Core domain services: >90%
- Storage adapters: >85%
- Browser adapters: >80% (with mocked Chrome APIs)
- UI components: behavioral tests over coverage %

## Dependency Management

### Adding Dependencies

Before adding a new dependency:

1. Check the package size and tree-shaking support
2. Verify the maintenance status and community adoption
3. Ensure the license is compatible (MIT, Apache-2.0, BSD-*)
4. Update `package.json` and commit the lockfile

### Preferred Technologies

| Area | Preferred | Why |
|---|---|---|
| Validation | Zod | Runtime validation at boundaries |
| HTTP | fetch + abort signals | Native browser API |
| Async | Promises | No callback hell |
| State | Zustand or React hooks | Minimal boilerplate |
| Testing | Vitest + Testing Library | Fast, modern, React-focused |

## Release Process

Releases follow semantic versioning:

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features, backward compatible
- **PATCH** (0.0.1): Bug fixes

Maintainers will:

1. Create a release branch from `main`
2. Update `package.json` version
3. Update `CHANGELOG.md` (if maintained)
4. Tag the commit with `v<version>`
5. Push and open a release PR
6. Publish to npm (if applicable)

## Questions?

- 📖 Read the [README](README.md) and [Architecture](docs/ARCHITECTURE.md)
- 🔐 Review [Security Guidelines](docs/SECURITY.md)
- 🤝 Open a discussion in GitHub Discussions
- 💬 Reach out in a GitHub Issue

Thank you for helping make GhostTab better! 👻
