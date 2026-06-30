# Scope: E2E Testing

## Architecture
- Opaque-box testing of the doctoral research portal's poster room (`poster.html`) and React component (`WPoster.js`).
- Dynamic Markdown rendering (R1), Vanguard Protocol styling (R2), Spring Physics motion (R3), and Desktop integration (R4).

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Explore Environment & Features | Run environment checks to see available testing tools and explore feature files | None | DONE |
| 2 | Design Test Cases & Infra | Define the test runner, design 49+ tests across Tiers 1-4, create TEST_INFRA.md | M1 | DONE |
| 3 | Implement E2E Test Suite | Implement the test suite and all the test cases | M2 | DONE |
| 4 | Verify and Run Test Suite | Run tests, fix failures, and ensure E2E suite passes fully | M3 | DONE |
| 5 | Publish TEST_READY.md | Create and place TEST_READY.md in project root | M4 | DONE |

## Interface Contracts
- None (E2E testing is opaque-box, verifying user-facing features).
