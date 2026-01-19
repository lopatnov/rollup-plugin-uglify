# Contributing to rollup-plugin-uglify

Thank you for your interest in contributing to this project!

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nicvac/rollup-plugin-uglify.git
cd rollup-plugin-uglify
```

2. Install dependencies:
```bash
npm install
```

3. Install terser (peer dependency):
```bash
npm run prepare
```

## Development

### Building

Build the project:
```bash
npm run build
```

Watch mode for development:
```bash
npm run watch
```

### Testing

Run tests:
```bash
npm test
```

### Project Structure

```
rollup-plugin-uglify/
├── src/
│   └── plugin.ts      # Main plugin source code
├── tests/
│   ├── plugin.test.ts # Test suite
│   └── sample.js      # Sample file for testing
├── dist/              # Built output (CJS, ESM, UMD)
├── package.json
├── tsconfig.json
└── rollup.config.mjs
```

## Making Changes

1. Create a new branch for your feature or fix:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes

3. Ensure tests pass:
```bash
npm test
```

4. Ensure the build succeeds:
```bash
npm run build
```

5. Commit your changes with a descriptive message

6. Push to your fork and submit a Pull Request

## Code Style

- Use TypeScript for all source code
- Follow existing code patterns
- Keep code minimal and focused
- Add tests for new functionality

## Reporting Issues

When reporting issues, please include:

- Node.js version
- npm version
- Rollup version
- Terser version
- Steps to reproduce
- Expected vs actual behavior

## License

By contributing, you agree that your contributions will be licensed under the Apache-2.0 License.
