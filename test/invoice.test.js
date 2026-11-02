const test = require('node:test');
const assert = require('node:assert/strict');
const { buildInvoice, formatCents } = require('../src/invoice');

const order = {
  id: 'ord_1001',
  state: 'CA',
  items: [
    { sku: 'MUG-01', quantity: 2, unitPriceCents: 1250 },
    { sku: 'TEE-02', quantity: 1, unitPriceCents: 1999 },
  ],
};

test('invoice total includes state sales tax', () => {
  const invoice = buildInvoice(order);
  assert.equal(invoice.subtotalCents, 4499);
  assert.equal(invoice.totalCents, 4825);
});

test('invoice has one line per item', () => {
  const invoice = buildInvoice(order);
  assert.deepEqual(invoice.lines.map((l) => l.lineTotalCents), [2500, 1999]);
});

test('invoice for a state with no sales tax', () => {
  const invoice = buildInvoice({ ...order, state: 'OR' });
  assert.equal(invoice.totalCents, 4499);
});

test('unknown states are rejected', () => {
  assert.throws(() => buildInvoice({ ...order, state: 'ZZ' }), /No tax rate/);
});

test('formatCents prints dollars', () => {
  assert.equal(formatCents(4825), '$48.25');
});
