# Acme Checkout

Cart and invoice math for the Acme web shop. It is a small Node.js library with no dependencies.

- `src/cart.js` adds up items, applies coupons and adds sales tax.
- `src/invoice.js` builds the invoice for an order, using the sales tax rate for the order's state.
- `test/` has the tests. CI runs them on every pull request.

## Project rules

- Money is always whole cents (integers). Never return a fraction of a cent.
- Coupons apply before tax.
- Every change needs passing tests. Fix the code, not the tests.

## Tests

```
npm test
```

Node 20 or newer. There is nothing to install.

CI is in `.github/workflows/ci.yml`. It runs `npm test` in a job called `test`.

## Workshop lab

This repo is the starter for the Devin workshop lab **Fix failing CI with a GitHub-triggered automation**. `main` passes CI. The **Create failing branch** workflow pushes a branch, `feat/percent-coupons`, that adds percent coupons and breaks two tests. When you open a pull request from it, CI fails. A Devin Automation then fixes it.

See [DEVIN_DEMO.md](DEVIN_DEMO.md) for the steps.
