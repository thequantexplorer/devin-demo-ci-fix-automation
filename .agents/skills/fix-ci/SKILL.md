---
name: fix-ci
description: How to fix a failing CI check on a pull request in this repo. Use when a GitHub check run fails.
---

# Fix a failing CI check

1. Find the pull request for the failed check. Check out its head branch. Never work on `main`.
2. Read the failed job log on GitHub. Write down each failing test and its error.
3. Run `npm test` in the repo. It needs Node 20 and no install step. Make sure you see the same failures.
4. Find the root cause in `src/`. Fix the code, not the tests. Only change a test if it is clearly wrong, and say why in the PR comment.
5. Keep the project rules in `README.md`. Money is always whole cents.
6. Run `npm test` again. All tests must pass.
7. Commit with a short message that says what you fixed. Push to the same branch. Do not open a new pull request. Do not merge.
8. Wait for the `test` check to pass on GitHub.
9. Leave one comment on the pull request: what failed, why, and what you changed.
