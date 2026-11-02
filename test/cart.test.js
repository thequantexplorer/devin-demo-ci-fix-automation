const test = require('node:test');
const assert = require('node:assert/strict');
const { subtotal, applyCoupon, tax, total } = require('../src/cart');

const items = [
  { sku: 'MUG-01', quantity: 2, unitPriceCents: 1250 },
  { sku: 'TEE-02', quantity: 1, unitPriceCents: 1999 },
];

test('subtotal adds quantity times unit price', () => {
  assert.equal(subtotal(items), 4499);
});

test('subtotal rejects bad quantities', () => {
  assert.throws(() => subtotal([{ sku: 'X', quantity: 0, unitPriceCents: 100 }]), /Invalid quantity/);
  assert.throws(() => subtotal([{ sku: 'X', quantity: 1.5, unitPriceCents: 100 }]), /Invalid quantity/);
});

test('fixed coupon takes money off and never goes below zero', () => {
  assert.equal(applyCoupon(4499, { type: 'fixed', amountCents: 500 }), 3999);
  assert.equal(applyCoupon(300, { type: 'fixed', amountCents: 500 }), 0);
});

test('unknown coupon types are rejected', () => {
  assert.throws(() => applyCoupon(1000, { type: 'bogus' }), /Unknown coupon type/);
});

test('tax rounds to the nearest cent', () => {
  assert.equal(tax(4499, 725), 326);
  assert.equal(tax(1000, 0), 0);
});

test('total applies the coupon before tax', () => {
  assert.equal(total(items, { coupon: { type: 'fixed', amountCents: 500 }, taxRateBps: 725 }), 4289);
});
