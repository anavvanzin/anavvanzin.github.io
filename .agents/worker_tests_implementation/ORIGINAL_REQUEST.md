## 2026-06-30T10:13:55Z
You are the E2E Testing Implementation Worker. Your task is to implement the E2E test cases in the `tests/` directory.

Please create the following files in the project workspace:
1. `tests/tier1-coverage.spec.js` - implementing the 20 Tier 1 test cases.
2. `tests/tier2-boundaries.spec.js` - implementing the 20 Tier 2 test cases.
3. `tests/tier3-combinations.spec.js` - implementing the 4 Tier 3 test cases.
4. `tests/tier4-scenarios.spec.js` - implementing the 5 Tier 4 test cases.

Make sure to use the correct imports:
`const { test, expect } = require('@playwright/test');`

And implement the tests to target the local server baseURL `http://localhost:8080` (use relative paths `/poster.html` or `/mesa/index.html` or `/`). Use class selectors like `.poster`, `.bezel-inner`, `.drop-cap`, `.poster-backdrop`, etc. as outlined in the design spec. If a selector doesn't exist yet (because the implementation track is running in parallel), write the test case cleanly to fail with an informative timeout error on that selector — this is correct behavior for E2E tests before implementation is complete.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Please write these test files, run a dry-run check `npx playwright test --list` to verify that they compile and are listed correctly by Playwright, and write a handoff report in your directory (.agents/worker_tests_implementation/handoff.md) listing the files created, configurations, and verification results.
