// All money is in integer cents. Tax rates are in basis points (825 = 8.25%).

function subtotal(items) {
  return items.reduce((sum, item) => {
    if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
      throw new Error(`Invalid quantity for ${item.sku}`);
    }
    if (!Number.isInteger(item.unitPriceCents) || item.unitPriceCents < 0) {
      throw new Error(`Invalid price for ${item.sku}`);
    }
    return sum + item.quantity * item.unitPriceCents;
  }, 0);
}

function applyCoupon(amountCents, coupon) {
  if (!coupon) return amountCents;
  if (coupon.type === 'fixed') {
    return Math.max(0, amountCents - coupon.amountCents);
  }
  throw new Error(`Unknown coupon type: ${coupon.type}`);
}

function tax(amountCents, taxRateBps) {
  return Math.round((amountCents * taxRateBps) / 10000);
}

function total(items, { coupon, taxRateBps = 0 } = {}) {
  const discounted = applyCoupon(subtotal(items), coupon);
  return discounted + tax(discounted, taxRateBps);
}

module.exports = { subtotal, applyCoupon, tax, total };
