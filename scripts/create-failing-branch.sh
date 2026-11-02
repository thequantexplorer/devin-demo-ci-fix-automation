#!/usr/bin/env bash
# Creates the feat/percent-coupons branch for the CI-fix lab and pushes it to your copy.
# The change on that branch breaks two tests, so CI fails on its pull request.
set -euo pipefail
cd "$(dirname "$0")/.."
if git ls-remote --exit-code --heads origin feat/percent-coupons >/dev/null; then
  echo "Branch feat/percent-coupons already exists. Delete it on GitHub first if you want a fresh copy."
  exit 1
fi
git checkout -b feat/percent-coupons
git apply pr-branch/percent-coupons.patch
git add src test
git commit -q -m "Add percent coupons and take tax rates as percents"
git push -u origin feat/percent-coupons
git checkout -q main
echo
echo "Branch pushed. Now open a pull request from feat/percent-coupons into main."
