const { subtotal, total } = require('./cart');

const TAX_RATES_BPS = {
  CA: 725,
  NY: 400,
  TX: 625,
  OR: 0,
};

function buildInvoice(order) {
  const taxRateBps = TAX_RATES_BPS[order.state];
  if (taxRateBps === undefined) {
    throw new Error(`No tax rate for state ${order.state}`);
  }
  const sub = subtotal(order.items);
  const due = total(order.items, { coupon: order.coupon, taxRateBps });
  return {
    orderId: order.id,
    subtotalCents: sub,
    totalCents: due,
    lines: order.items.map((item) => ({
      sku: item.sku,
      quantity: item.quantity,
      lineTotalCents: item.quantity * item.unitPriceCents,
    })),
  };
}

function formatCents(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

module.exports = { buildInvoice, formatCents, TAX_RATES_BPS };
