const test = require("node:test");
const assert = require("node:assert/strict");
const crypto = require("crypto");

const { safeEqual, verifyHmac } = require("../utils/signatures");

test("verifyHmac accepts a valid signature", () => {
  const payload = "order_123|payment_456";
  const secret = "test-secret";
  const signature = crypto.createHmac("sha256", secret).update(payload).digest("hex");

  assert.equal(verifyHmac(payload, signature, secret), true);
});

test("verifyHmac rejects invalid or missing credentials", () => {
  assert.equal(verifyHmac("payload", "invalid", "secret"), false);
  assert.equal(verifyHmac("payload", null, "secret"), false);
  assert.equal(verifyHmac("payload", "signature", null), false);
});

test("safeEqual rejects values with different lengths", () => {
  assert.equal(safeEqual("abc", "abcd"), false);
});
