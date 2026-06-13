const test = require("node:test");
const assert = require("node:assert/strict");
const jwt = require("jsonwebtoken");

const { requireOwner, verifyAdminToken, verifyToken } = require("../middleware/auth");

function response() {
  return {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}

test("verifyToken accepts a valid bearer token", () => {
  process.env.JWT_SECRET = "test-secret";
  const token = jwt.sign({ uid: "user-1" }, process.env.JWT_SECRET);
  const req = { get: () => `Bearer ${token}` };
  const res = response();
  let called = false;

  verifyToken(req, res, () => {
    called = true;
  });

  assert.equal(called, true);
  assert.equal(req.user.uid, "user-1");
});

test("requireOwner rejects access to another user", () => {
  const req = {
    params: { uid: "user-2" },
    user: { uid: "user-1" },
  };
  const res = response();

  requireOwner("params", "uid")(req, res, () => assert.fail("next should not run"));

  assert.equal(res.statusCode, 403);
});

test("verifyAdminToken rejects a regular user", () => {
  process.env.JWT_SECRET = "test-secret";
  const token = jwt.sign({ uid: "user-1" }, process.env.JWT_SECRET);
  const req = { get: () => `Bearer ${token}` };
  const res = response();

  verifyAdminToken(req, res, () => assert.fail("next should not run"));

  assert.equal(res.statusCode, 403);
});
