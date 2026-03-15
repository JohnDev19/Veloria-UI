# Contributing to AtlasUI

Thank you for your interest in contributing!

## Development Setup

```bash
git clone https://github.com/JohnDev19/AtlasUI.git
cd atlasui
npm install
npm run build
```

## Project Structure

- `packages/core` — The `@atlasui/core` npm package
- `cli` — The `@atlasui/cli` npm package

## Adding a New Component

1. Create the component in the appropriate category folder under `packages/core/src/components/`
2. Export it from the category's `index.tsx`
3. Export it from `packages/core/src/index.ts`
4. Add it to `cli/src/registry.ts`
5. Add TypeScript types
6. Ensure ARIA / accessibility attributes are correct

## Code Standards

- TypeScript strict mode
- All components must use `React.forwardRef`
- ARIA attributes required for all interactive components
- Support `asChild` pattern via Radix `Slot` where appropriate
- Dark mode via CSS variables (no hardcoded colors)
- Use `cn()` utility for class merging

## Commit Convention

```
feat: add <ComponentName> component
fix: correct <ComponentName> focus trap
docs: update <ComponentName> README
chore: bump dependencies
```

## Pull Request Process

1. Fork the repo
2. Create a branch: `feat/my-component`
3. Open a PR against `main`
4. Fill in the PR template

## License

By contributing, you agree your work will be licensed under MIT.
