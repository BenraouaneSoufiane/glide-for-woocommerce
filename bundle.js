(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.glide = void 0;
var _glideJs = require("@paywithglide/glide-js");
class Glide {
  async sendfunds(projectid, data) {
    const glideClient = (0, _glideJs.createGlideClient)({
      projectId: projectid,
      // Lists the chains where payments will be accepted
      chains: [{
        id: 1
      },
      // Ethereum
      {
        id: 8543
      },
      // Base
      {
        id: 10
      },
      // Optimism
      {
        id: 137
      },
      // Polygon
      {
        id: 42161
      } // Arbitrum
      ]
    });
    const txHash = await glideClient.writeContract(data);
    if (txHash) {
      return txHash;
    }
  }
}
const glide = exports.glide = new Glide();
window.glide = glide;

},{"@paywithglide/glide-js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SponsoredTransactionFailedError = exports.SessionExpiredError = exports.ResponseNotOkError = exports.NoPaymentOptionsError = exports.GlideClient = exports.CurrenciesByChain = exports.Currencies = exports.Chains = void 0;
exports.createGlideClient = Qt;
var ze = Object.defineProperty;
var Me = (e, t, n) => t in e ? ze(e, t, {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: n
}) : e[t] = n;
var V = (e, t, n) => (Me(e, typeof t != "symbol" ? t + "" : t, n), n),
  X = (e, t, n) => {
    if (!t.has(e)) throw TypeError("Cannot " + n);
  };
var x = (e, t, n) => (X(e, t, "read from private field"), n ? n.call(e) : t.get(e)),
  K = (e, t, n) => {
    if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, n);
  },
  Z = (e, t, n, r) => (X(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
function Ue(e, t) {
  const n = e.exec(t);
  return n == null ? void 0 : n.groups;
}
const J = /^tuple(?<array>(\[(\d*)\])*)$/;
function L(e) {
  let t = e.type;
  if (J.test(e.type) && "components" in e) {
    t = "(";
    const n = e.components.length;
    for (let i = 0; i < n; i++) {
      const s = e.components[i];
      t += L(s), i < n - 1 && (t += ", ");
    }
    const r = Ue(J, e.type);
    return t += `)${(r == null ? void 0 : r.array) ?? ""}`, L({
      ...e,
      type: t
    });
  }
  return "indexed" in e && e.indexed && (t = `${t} indexed`), e.name ? `${t} ${e.name}` : t;
}
function P(e) {
  let t = "";
  const n = e.length;
  for (let r = 0; r < n; r++) {
    const i = e[r];
    t += L(i), r !== n - 1 && (t += ", ");
  }
  return t;
}
function Ce(e) {
  return e.type === "function" ? `function ${e.name}(${P(e.inputs)})${e.stateMutability && e.stateMutability !== "nonpayable" ? ` ${e.stateMutability}` : ""}${e.outputs.length ? ` returns (${P(e.outputs)})` : ""}` : e.type === "event" ? `event ${e.name}(${P(e.inputs)})` : e.type === "error" ? `error ${e.name}(${P(e.inputs)})` : e.type === "constructor" ? `constructor(${P(e.inputs)})${e.stateMutability === "payable" ? " payable" : ""}` : e.type === "fallback" ? "fallback()" : "receive() external payable";
}
function v(e, {
  includeName: t = !1
} = {}) {
  if (e.type !== "function" && e.type !== "event" && e.type !== "error") throw new We(e.type);
  return `${e.name}(${ce(e.inputs, {
    includeName: t
  })})`;
}
function ce(e, {
  includeName: t = !1
} = {}) {
  return e ? e.map(n => De(n, {
    includeName: t
  })).join(t ? ", " : ",") : "";
}
function De(e, {
  includeName: t
}) {
  return e.type.startsWith("tuple") ? `(${ce(e.components, {
    includeName: t
  })})${e.type.slice(5)}` : e.type + (t && e.name ? ` ${e.name}` : "");
}
function I(e, {
  strict: t = !0
} = {}) {
  return !e || typeof e != "string" ? !1 : t ? /^0x[0-9a-fA-F]*$/.test(e) : e.startsWith("0x");
}
function p(e) {
  return I(e, {
    strict: !1
  }) ? Math.ceil((e.length - 2) / 2) : e.length;
}
const ke = "2.9.15",
  He = () => `viem@${ke}`;
class u extends Error {
  constructor(t, n = {}) {
    var s;
    super(), Object.defineProperty(this, "details", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "docsPath", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "metaMessages", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "shortMessage", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ViemError"
    }), Object.defineProperty(this, "version", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: He()
    });
    const r = n.cause instanceof u ? n.cause.details : (s = n.cause) != null && s.message ? n.cause.message : n.details,
      i = n.cause instanceof u && n.cause.docsPath || n.docsPath;
    this.message = [t || "An error occurred.", "", ...(n.metaMessages ? [...n.metaMessages, ""] : []), ...(i ? [`Docs: https://viem.sh${i}${n.docsSlug ? `#${n.docsSlug}` : ""}`] : []), ...(r ? [`Details: ${r}`] : []), `Version: ${this.version}`].join(`
`), n.cause && (this.cause = n.cause), this.details = r, this.docsPath = i, this.metaMessages = n.metaMessages, this.shortMessage = t;
  }
  walk(t) {
    return ae(this, t);
  }
}
function ae(e, t) {
  return t != null && t(e) ? e : e && typeof e == "object" && "cause" in e ? ae(e.cause, t) : t ? null : e;
}
class Le extends u {
  constructor({
    expectedLength: t,
    givenLength: n,
    type: r
  }) {
    super([`ABI encoding array length mismatch for type ${r}.`, `Expected length: ${t}`, `Given length: ${n}`].join(`
`)), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "AbiEncodingArrayLengthMismatchError"
    });
  }
}
class ve extends u {
  constructor({
    expectedSize: t,
    value: n
  }) {
    super(`Size of bytes "${n}" (bytes${p(n)}) does not match expected size (bytes${t}).`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "AbiEncodingBytesSizeMismatchError"
    });
  }
}
class je extends u {
  constructor({
    expectedLength: t,
    givenLength: n
  }) {
    super(["ABI encoding params/values length mismatch.", `Expected length (params): ${t}`, `Given length (values): ${n}`].join(`
`)), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "AbiEncodingLengthMismatchError"
    });
  }
}
class Q extends u {
  constructor(t, {
    docsPath: n
  } = {}) {
    super([`Function ${t ? `"${t}" ` : ""}not found on ABI.`, "Make sure you are using the correct ABI and that the function exists on it."].join(`
`), {
      docsPath: n
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "AbiFunctionNotFoundError"
    });
  }
}
class Ne extends u {
  constructor(t, n) {
    super("Found ambiguous types in overloaded ABI items.", {
      metaMessages: [`\`${t.type}\` in \`${v(t.abiItem)}\`, and`, `\`${n.type}\` in \`${v(n.abiItem)}\``, "", "These types encode differently and cannot be distinguished at runtime.", "Remove one of the ambiguous items in the ABI."]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "AbiItemAmbiguityError"
    });
  }
}
class Fe extends u {
  constructor(t, {
    docsPath: n
  }) {
    super([`Type "${t}" is not a valid encoding type.`, "Please provide a valid ABI type."].join(`
`), {
      docsPath: n
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidAbiEncodingType"
    });
  }
}
class Re extends u {
  constructor(t) {
    super([`Value "${t}" is not a valid array.`].join(`
`)), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidArrayError"
    });
  }
}
class We extends u {
  constructor(t) {
    super([`"${t}" is not a valid definition type.`, 'Valid types: "function", "event", "error"'].join(`
`)), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidDefinitionTypeError"
    });
  }
}
class ue extends u {
  constructor({
    offset: t,
    position: n,
    size: r
  }) {
    super(`Slice ${n === "start" ? "starting" : "ending"} at offset "${t}" is out-of-bounds (size: ${r}).`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "SliceOffsetOutOfBoundsError"
    });
  }
}
class fe extends u {
  constructor({
    size: t,
    targetSize: n,
    type: r
  }) {
    super(`${r.charAt(0).toUpperCase()}${r.slice(1).toLowerCase()} size (${t}) exceeds padding size (${n}).`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "SizeExceedsPaddingSizeError"
    });
  }
}
function $(e, {
  dir: t,
  size: n = 32
} = {}) {
  return typeof e == "string" ? m(e, {
    dir: t,
    size: n
  }) : _e(e, {
    dir: t,
    size: n
  });
}
function m(e, {
  dir: t,
  size: n = 32
} = {}) {
  if (n === null) return e;
  const r = e.replace("0x", "");
  if (r.length > n * 2) throw new fe({
    size: Math.ceil(r.length / 2),
    targetSize: n,
    type: "hex"
  });
  return `0x${r[t === "right" ? "padEnd" : "padStart"](n * 2, "0")}`;
}
function _e(e, {
  dir: t,
  size: n = 32
} = {}) {
  if (n === null) return e;
  if (e.length > n) throw new fe({
    size: e.length,
    targetSize: n,
    type: "bytes"
  });
  const r = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    const s = t === "right";
    r[s ? i : n - i - 1] = e[s ? i : e.length - i - 1];
  }
  return r;
}
class Ge extends u {
  constructor({
    max: t,
    min: n,
    signed: r,
    size: i,
    value: s
  }) {
    super(`Number "${s}" is not in safe ${i ? `${i * 8}-bit ${r ? "signed" : "unsigned"} ` : ""}integer range ${t ? `(${n} to ${t})` : `(above ${n})`}`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "IntegerOutOfRangeError"
    });
  }
}
class qe extends u {
  constructor({
    givenSize: t,
    maxSize: n
  }) {
    super(`Size cannot exceed ${n} bytes. Given size: ${t} bytes.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "SizeOverflowError"
    });
  }
}
function E(e, {
  size: t
}) {
  if (p(e) > t) throw new qe({
    givenSize: p(e),
    maxSize: t
  });
}
function Y(e, t = {}) {
  const {
    signed: n
  } = t;
  t.size && E(e, {
    size: t.size
  });
  const r = BigInt(e);
  if (!n) return r;
  const i = (e.length - 2) / 2,
    s = (1n << BigInt(i) * 8n - 1n) - 1n;
  return r <= s ? r : r - BigInt(`0x${"f".padStart(i * 2, "f")}`) - 1n;
}
const Ve = /* @__PURE__ */Array.from({
  length: 256
}, (e, t) => t.toString(16).padStart(2, "0"));
function j(e, t = {}) {
  return typeof e == "number" || typeof e == "bigint" ? w(e, t) : typeof e == "string" ? pe(e, t) : typeof e == "boolean" ? de(e, t) : le(e, t);
}
function de(e, t = {}) {
  const n = `0x${Number(e)}`;
  return typeof t.size == "number" ? (E(n, {
    size: t.size
  }), $(n, {
    size: t.size
  })) : n;
}
function le(e, t = {}) {
  let n = "";
  for (let i = 0; i < e.length; i++) n += Ve[e[i]];
  const r = `0x${n}`;
  return typeof t.size == "number" ? (E(r, {
    size: t.size
  }), $(r, {
    dir: "right",
    size: t.size
  })) : r;
}
function w(e, t = {}) {
  const {
      signed: n,
      size: r
    } = t,
    i = BigInt(e);
  let s;
  r ? n ? s = (1n << BigInt(r) * 8n - 1n) - 1n : s = 2n ** (BigInt(r) * 8n) - 1n : typeof e == "number" && (s = BigInt(Number.MAX_SAFE_INTEGER));
  const o = typeof s == "bigint" && n ? -s - 1n : 0;
  if (s && i > s || i < o) {
    const d = typeof e == "bigint" ? "n" : "";
    throw new Ge({
      max: s ? `${s}${d}` : void 0,
      min: `${o}${d}`,
      signed: n,
      size: r,
      value: `${e}${d}`
    });
  }
  const c = `0x${(n && i < 0 ? (1n << BigInt(r * 8)) + BigInt(i) : i).toString(16)}`;
  return r ? $(c, {
    size: r
  }) : c;
}
const Xe = /* @__PURE__ */new TextEncoder();
function pe(e, t = {}) {
  const n = Xe.encode(e);
  return le(n, t);
}
const Ke = /* @__PURE__ */new TextEncoder();
function he(e, t = {}) {
  return typeof e == "number" || typeof e == "bigint" ? Je(e, t) : typeof e == "boolean" ? Ze(e, t) : I(e) ? be(e, t) : ye(e, t);
}
function Ze(e, t = {}) {
  const n = new Uint8Array(1);
  return n[0] = Number(e), typeof t.size == "number" ? (E(n, {
    size: t.size
  }), $(n, {
    size: t.size
  })) : n;
}
const b = {
  zero: 48,
  nine: 57,
  A: 65,
  F: 70,
  a: 97,
  f: 102
};
function ee(e) {
  if (e >= b.zero && e <= b.nine) return e - b.zero;
  if (e >= b.A && e <= b.F) return e - (b.A - 10);
  if (e >= b.a && e <= b.f) return e - (b.a - 10);
}
function be(e, t = {}) {
  let n = e;
  t.size && (E(n, {
    size: t.size
  }), n = $(n, {
    dir: "right",
    size: t.size
  }));
  let r = n.slice(2);
  r.length % 2 && (r = `0${r}`);
  const i = r.length / 2,
    s = new Uint8Array(i);
  for (let o = 0, c = 0; o < i; o++) {
    const d = ee(r.charCodeAt(c++)),
      f = ee(r.charCodeAt(c++));
    if (d === void 0 || f === void 0) throw new u(`Invalid byte sequence ("${r[c - 2]}${r[c - 1]}" in "${r}").`);
    s[o] = d * 16 + f;
  }
  return s;
}
function Je(e, t) {
  const n = w(e, t);
  return be(n);
}
function ye(e, t = {}) {
  const n = Ke.encode(e);
  return typeof t.size == "number" ? (E(n, {
    size: t.size
  }), $(n, {
    dir: "right",
    size: t.size
  })) : n;
}
function te(e) {
  if (!Number.isSafeInteger(e) || e < 0) throw new Error(`Wrong positive integer: ${e}`);
}
function me(e, ...t) {
  if (!(e instanceof Uint8Array)) throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length)) throw new Error(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function ne(e, t = !0) {
  if (e.destroyed) throw new Error("Hash instance has been destroyed");
  if (t && e.finished) throw new Error("Hash#digest() has already been called");
}
function Qe(e, t) {
  me(e);
  const n = t.outputLen;
  if (e.length < n) throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const U = /* @__PURE__ */BigInt(2 ** 32 - 1),
  re = /* @__PURE__ */BigInt(32);
function Ye(e, t = !1) {
  return t ? {
    h: Number(e & U),
    l: Number(e >> re & U)
  } : {
    h: Number(e >> re & U) | 0,
    l: Number(e & U) | 0
  };
}
function et(e, t = !1) {
  let n = new Uint32Array(e.length),
    r = new Uint32Array(e.length);
  for (let i = 0; i < e.length; i++) {
    const {
      h: s,
      l: o
    } = Ye(e[i], t);
    [n[i], r[i]] = [s, o];
  }
  return [n, r];
}
const tt = (e, t, n) => e << n | t >>> 32 - n,
  nt = (e, t, n) => t << n | e >>> 32 - n,
  rt = (e, t, n) => t << n - 32 | e >>> 64 - n,
  it = (e, t, n) => e << n - 32 | t >>> 64 - n;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const st = e => e instanceof Uint8Array,
  ot = e => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4)),
  ct = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!ct) throw new Error("Non little-endian hardware is not supported");
function at(e) {
  if (typeof e != "string") throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function ge(e) {
  if (typeof e == "string" && (e = at(e)), !st(e)) throw new Error(`expected Uint8Array, got ${typeof e}`);
  return e;
}
class ut {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function ft(e) {
  const t = r => e().update(ge(r)).digest(),
    n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
const [xe, we, Ae] = [[], [], []],
  dt = /* @__PURE__ */BigInt(0),
  B = /* @__PURE__ */BigInt(1),
  lt = /* @__PURE__ */BigInt(2),
  pt = /* @__PURE__ */BigInt(7),
  ht = /* @__PURE__ */BigInt(256),
  bt = /* @__PURE__ */BigInt(113);
for (let e = 0, t = B, n = 1, r = 0; e < 24; e++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], xe.push(2 * (5 * r + n)), we.push((e + 1) * (e + 2) / 2 % 64);
  let i = dt;
  for (let s = 0; s < 7; s++) t = (t << B ^ (t >> pt) * bt) % ht, t & lt && (i ^= B << (B << /* @__PURE__ */BigInt(s)) - B);
  Ae.push(i);
}
const [yt, mt] = /* @__PURE__ */et(Ae, !0),
  ie = (e, t, n) => n > 32 ? rt(e, t, n) : tt(e, t, n),
  se = (e, t, n) => n > 32 ? it(e, t, n) : nt(e, t, n);
function gt(e, t = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++) n[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const c = (o + 8) % 10,
        d = (o + 2) % 10,
        f = n[d],
        l = n[d + 1],
        A = ie(f, l, 1) ^ n[c],
        T = se(f, l, 1) ^ n[c + 1];
      for (let g = 0; g < 50; g += 10) e[o + g] ^= A, e[o + g + 1] ^= T;
    }
    let i = e[2],
      s = e[3];
    for (let o = 0; o < 24; o++) {
      const c = we[o],
        d = ie(i, s, c),
        f = se(i, s, c),
        l = xe[o];
      i = e[l], s = e[l + 1], e[l] = d, e[l + 1] = f;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let c = 0; c < 10; c++) n[c] = e[o + c];
      for (let c = 0; c < 10; c++) e[o + c] ^= ~n[(c + 2) % 10] & n[(c + 4) % 10];
    }
    e[0] ^= yt[r], e[1] ^= mt[r];
  }
  n.fill(0);
}
class F extends ut {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, n, r, i = !1, s = 24) {
    if (super(), this.blockLen = t, this.suffix = n, this.outputLen = r, this.enableXOF = i, this.rounds = s, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, te(r), 0 >= this.blockLen || this.blockLen >= 200) throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = ot(this.state);
  }
  keccak() {
    gt(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    ne(this);
    const {
      blockLen: n,
      state: r
    } = this;
    t = ge(t);
    const i = t.length;
    for (let s = 0; s < i;) {
      const o = Math.min(n - this.pos, i - s);
      for (let c = 0; c < o; c++) r[this.pos++] ^= t[s++];
      this.pos === n && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished) return;
    this.finished = !0;
    const {
      state: t,
      suffix: n,
      pos: r,
      blockLen: i
    } = this;
    t[r] ^= n, n & 128 && r === i - 1 && this.keccak(), t[i - 1] ^= 128, this.keccak();
  }
  writeInto(t) {
    ne(this, !1), me(t), this.finish();
    const n = this.state,
      {
        blockLen: r
      } = this;
    for (let i = 0, s = t.length; i < s;) {
      this.posOut >= r && this.keccak();
      const o = Math.min(r - this.posOut, s - i);
      t.set(n.subarray(this.posOut, this.posOut + o), i), this.posOut += o, i += o;
    }
    return t;
  }
  xofInto(t) {
    if (!this.enableXOF) throw new Error("XOF is not possible for this instance");
    return this.writeInto(t);
  }
  xof(t) {
    return te(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (Qe(t, this), this.finished) throw new Error("digest() was already called");
    return this.writeInto(t), this.destroy(), t;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = !0, this.state.fill(0);
  }
  _cloneInto(t) {
    const {
      blockLen: n,
      suffix: r,
      outputLen: i,
      rounds: s,
      enableXOF: o
    } = this;
    return t || (t = new F(n, r, i, o, s)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = s, t.suffix = r, t.outputLen = i, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
}
const xt = (e, t, n) => ft(() => new F(t, e, n)),
  wt = /* @__PURE__ */xt(1, 136, 256 / 8);
function Se(e, t) {
  const n = t || "hex",
    r = wt(I(e, {
      strict: !1
    }) ? he(e) : e);
  return n === "bytes" ? r : j(r);
}
const At = e => Se(he(e));
function St(e) {
  return At(e);
}
function $t(e) {
  let t = !0,
    n = "",
    r = 0,
    i = "",
    s = !1;
  for (let o = 0; o < e.length; o++) {
    const c = e[o];
    if (["(", ")", ","].includes(c) && (t = !0), c === "(" && r++, c === ")" && r--, !!t) {
      if (r === 0) {
        if (c === " " && ["event", "function", ""].includes(i)) i = "";else if (i += c, c === ")") {
          s = !0;
          break;
        }
        continue;
      }
      if (c === " ") {
        e[o - 1] !== "," && n !== "," && n !== ",(" && (n = "", t = !1);
        continue;
      }
      i += c, n += c;
    }
  }
  if (!s) throw new u("Unable to normalize signature.");
  return i;
}
const Et = e => {
  const t = typeof e == "string" ? e : Ce(e);
  return $t(t);
};
function $e(e) {
  return St(Et(e));
}
const Tt = $e;
class Ot extends u {
  constructor({
    address: t
  }) {
    super(`Address "${t}" is invalid.`, {
      metaMessages: ["- Address must be a hex value of 20 bytes (40 hex characters).", "- Address must match its checksum counterpart."]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidAddressError"
    });
  }
}
class Pt extends Map {
  constructor(t) {
    super(), Object.defineProperty(this, "maxSize", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.maxSize = t;
  }
  set(t, n) {
    return super.set(t, n), this.maxSize && this.size > this.maxSize && this.delete(this.keys().next().value), this;
  }
}
function Bt(e, t) {
  const n = t ? `${t}${e.toLowerCase()}` : e.substring(2).toLowerCase(),
    r = Se(ye(n), "bytes"),
    i = (t ? n.substring(`${t}0x`.length) : n).split("");
  for (let s = 0; s < 40; s += 2) r[s >> 1] >> 4 >= 8 && i[s] && (i[s] = i[s].toUpperCase()), (r[s >> 1] & 15) >= 8 && i[s + 1] && (i[s + 1] = i[s + 1].toUpperCase());
  return `0x${i.join("")}`;
}
const It = /^0x[a-fA-F0-9]{40}$/,
  H = /* @__PURE__ */new Pt(8192);
function C(e, t) {
  const {
    strict: n = !0
  } = t ?? {};
  if (H.has(e)) return H.get(e);
  const r = It.test(e) ? e.toLowerCase() === e ? !0 : n ? Bt(e) === e : !0 : !1;
  return H.set(e, r), r;
}
function S(e) {
  return typeof e[0] == "string" ? Ee(e) : zt(e);
}
function zt(e) {
  let t = 0;
  for (const i of e) t += i.length;
  const n = new Uint8Array(t);
  let r = 0;
  for (const i of e) n.set(i, r), r += i.length;
  return n;
}
function Ee(e) {
  return `0x${e.reduce((t, n) => t + n.replace("0x", ""), "")}`;
}
function Te(e, t, n, {
  strict: r
} = {}) {
  return I(e, {
    strict: !1
  }) ? Ut(e, t, n, {
    strict: r
  }) : Mt(e, t, n, {
    strict: r
  });
}
function Oe(e, t) {
  if (typeof t == "number" && t > 0 && t > p(e) - 1) throw new ue({
    offset: t,
    position: "start",
    size: p(e)
  });
}
function Pe(e, t, n) {
  if (typeof t == "number" && typeof n == "number" && p(e) !== n - t) throw new ue({
    offset: n,
    position: "end",
    size: p(e)
  });
}
function Mt(e, t, n, {
  strict: r
} = {}) {
  Oe(e, t);
  const i = e.slice(t, n);
  return r && Pe(i, t, n), i;
}
function Ut(e, t, n, {
  strict: r
} = {}) {
  Oe(e, t);
  const i = `0x${e.replace("0x", "").slice((t ?? 0) * 2, (n ?? e.length) * 2)}`;
  return r && Pe(i, t, n), i;
}
function Ct(e, t) {
  if (e.length !== t.length) throw new je({
    expectedLength: e.length,
    givenLength: t.length
  });
  const n = Dt({
      params: e,
      values: t
    }),
    r = W(n);
  return r.length === 0 ? "0x" : r;
}
function Dt({
  params: e,
  values: t
}) {
  const n = [];
  for (let r = 0; r < e.length; r++) n.push(R({
    param: e[r],
    value: t[r]
  }));
  return n;
}
function R({
  param: e,
  value: t
}) {
  const n = Rt(e.type);
  if (n) {
    const [r, i] = n;
    return Ht(t, {
      length: r,
      param: {
        ...e,
        type: i
      }
    });
  }
  if (e.type === "tuple") return Ft(t, {
    param: e
  });
  if (e.type === "address") return kt(t);
  if (e.type === "bool") return vt(t);
  if (e.type.startsWith("uint") || e.type.startsWith("int")) {
    const r = e.type.startsWith("int");
    return jt(t, {
      signed: r
    });
  }
  if (e.type.startsWith("bytes")) return Lt(t, {
    param: e
  });
  if (e.type === "string") return Nt(t);
  throw new Fe(e.type, {
    docsPath: "/docs/contract/encodeAbiParameters"
  });
}
function W(e) {
  let t = 0;
  for (let s = 0; s < e.length; s++) {
    const {
      dynamic: o,
      encoded: c
    } = e[s];
    o ? t += 32 : t += p(c);
  }
  const n = [],
    r = [];
  let i = 0;
  for (let s = 0; s < e.length; s++) {
    const {
      dynamic: o,
      encoded: c
    } = e[s];
    o ? (n.push(w(t + i, {
      size: 32
    })), r.push(c), i += p(c)) : n.push(c);
  }
  return S([...n, ...r]);
}
function kt(e) {
  if (!C(e)) throw new Ot({
    address: e
  });
  return {
    dynamic: !1,
    encoded: m(e.toLowerCase())
  };
}
function Ht(e, {
  length: t,
  param: n
}) {
  const r = t === null;
  if (!Array.isArray(e)) throw new Re(e);
  if (!r && e.length !== t) throw new Le({
    expectedLength: t,
    givenLength: e.length,
    type: `${n.type}[${t}]`
  });
  let i = !1;
  const s = [];
  for (let o = 0; o < e.length; o++) {
    const c = R({
      param: n,
      value: e[o]
    });
    c.dynamic && (i = !0), s.push(c);
  }
  if (r || i) {
    const o = W(s);
    if (r) {
      const c = w(s.length, {
        size: 32
      });
      return {
        dynamic: !0,
        encoded: s.length > 0 ? S([c, o]) : c
      };
    }
    if (i) return {
      dynamic: !0,
      encoded: o
    };
  }
  return {
    dynamic: !1,
    encoded: S(s.map(({
      encoded: o
    }) => o))
  };
}
function Lt(e, {
  param: t
}) {
  const [, n] = t.type.split("bytes"),
    r = p(e);
  if (!n) {
    let i = e;
    return r % 32 !== 0 && (i = m(i, {
      dir: "right",
      size: Math.ceil((e.length - 2) / 2 / 32) * 32
    })), {
      dynamic: !0,
      encoded: S([m(w(r, {
        size: 32
      })), i])
    };
  }
  if (r !== parseInt(n)) throw new ve({
    expectedSize: parseInt(n),
    value: e
  });
  return {
    dynamic: !1,
    encoded: m(e, {
      dir: "right"
    })
  };
}
function vt(e) {
  if (typeof e != "boolean") throw new u(`Invalid boolean value: "${e}" (type: ${typeof e}). Expected: \`true\` or \`false\`.`);
  return {
    dynamic: !1,
    encoded: m(de(e))
  };
}
function jt(e, {
  signed: t
}) {
  return {
    dynamic: !1,
    encoded: w(e, {
      size: 32,
      signed: t
    })
  };
}
function Nt(e) {
  const t = pe(e),
    n = Math.ceil(p(t) / 32),
    r = [];
  for (let i = 0; i < n; i++) r.push(m(Te(t, i * 32, (i + 1) * 32), {
    dir: "right"
  }));
  return {
    dynamic: !0,
    encoded: S([m(w(p(t), {
      size: 32
    })), ...r])
  };
}
function Ft(e, {
  param: t
}) {
  let n = !1;
  const r = [];
  for (let i = 0; i < t.components.length; i++) {
    const s = t.components[i],
      o = Array.isArray(e) ? i : s.name,
      c = R({
        param: s,
        value: e[o]
      });
    r.push(c), c.dynamic && (n = !0);
  }
  return {
    dynamic: n,
    encoded: n ? W(r) : S(r.map(({
      encoded: i
    }) => i))
  };
}
function Rt(e) {
  const t = e.match(/^(.*)\[(\d+)?\]$/);
  return t ?
  // Return `null` if the array is dynamic.
  [t[2] ? Number(t[2]) : null, t[1]] : void 0;
}
const Be = e => Te($e(e), 0, 4);
function Wt(e) {
  const {
      abi: t,
      args: n = [],
      name: r
    } = e,
    i = I(r, {
      strict: !1
    }),
    s = t.filter(c => i ? c.type === "function" ? Be(c) === r : c.type === "event" ? Tt(c) === r : !1 : "name" in c && c.name === r);
  if (s.length === 0) return;
  if (s.length === 1) return s[0];
  let o;
  for (const c of s) {
    if (!("inputs" in c)) continue;
    if (!n || n.length === 0) {
      if (!c.inputs || c.inputs.length === 0) return c;
      continue;
    }
    if (!c.inputs || c.inputs.length === 0 || c.inputs.length !== n.length) continue;
    if (n.every((f, l) => {
      const A = "inputs" in c && c.inputs[l];
      return A ? N(f, A) : !1;
    })) {
      if (o && "inputs" in o && o.inputs) {
        const f = Ie(c.inputs, o.inputs, n);
        if (f) throw new Ne({
          abiItem: c,
          type: f[0]
        }, {
          abiItem: o,
          type: f[1]
        });
      }
      o = c;
    }
  }
  return o || s[0];
}
function N(e, t) {
  const n = typeof e,
    r = t.type;
  switch (r) {
    case "address":
      return C(e, {
        strict: !1
      });
    case "bool":
      return n === "boolean";
    case "function":
      return n === "string";
    case "string":
      return n === "string";
    default:
      return r === "tuple" && "components" in t ? Object.values(t.components).every((i, s) => N(Object.values(e)[s], i)) : /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(r) ? n === "number" || n === "bigint" : /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(r) ? n === "string" || e instanceof Uint8Array : /[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(r) ? Array.isArray(e) && e.every(i => N(i, {
        ...t,
        // Pop off `[]` or `[M]` from end of type
        type: r.replace(/(\[[0-9]{0,}\])$/, "")
      })) : !1;
  }
}
function Ie(e, t, n) {
  for (const r in e) {
    const i = e[r],
      s = t[r];
    if (i.type === "tuple" && s.type === "tuple" && "components" in i && "components" in s) return Ie(i.components, s.components, n[r]);
    const o = [i.type, s.type];
    if (o.includes("address") && o.includes("bytes20") ? !0 : o.includes("address") && o.includes("string") ? C(n[r], {
      strict: !1
    }) : o.includes("address") && o.includes("bytes") ? C(n[r], {
      strict: !1
    }) : !1) return o;
  }
}
const oe = "/docs/contract/encodeFunctionData";
function _t(e) {
  const {
    abi: t,
    args: n,
    functionName: r
  } = e;
  let i = t[0];
  if (r) {
    const s = Wt({
      abi: t,
      args: n,
      name: r
    });
    if (!s) throw new Q(r, {
      docsPath: oe
    });
    i = s;
  }
  if (i.type !== "function") throw new Q(void 0, {
    docsPath: oe
  });
  return {
    abi: [i],
    functionName: Be(v(i))
  };
}
function Gt(e) {
  const {
      args: t
    } = e,
    {
      abi: n,
      functionName: r
    } = (() => {
      var c;
      return e.abi.length === 1 && (c = e.functionName) != null && c.startsWith("0x") ? e : _t(e);
    })(),
    i = n[0],
    s = r,
    o = "inputs" in i && i.inputs ? Ct(i.inputs, t ?? []) : void 0;
  return Ee([s, o ?? "0x"]);
}
class qt extends Error {
  constructor(t, n) {
    super(`Non-OK status code: ${t} - ${n}`), this.name = "RequestError";
  }
}
exports.ResponseNotOkError = qt;
class Vt extends Error {
  constructor() {
    super("No payment options available."), this.name = "NoPaymentOptionsError";
  }
}
exports.NoPaymentOptionsError = Vt;
class Xt extends Error {
  constructor() {
    super("Sponsored transaction failed."), this.name = "SponsoredTransactionFailedError";
  }
}
exports.SponsoredTransactionFailedError = Xt;
class Kt extends Error {
  constructor() {
    super("Session expired."), this.name = "SessionExpiredError";
  }
}
exports.SessionExpiredError = Kt;
function Qt(e) {
  return new Zt(e);
}
var h;
class Zt {
  constructor(t) {
    K(this, h, void 0);
    // writeContract submits a contract interaction transaction using
    // Glide. It returns the transaction hash.
    //
    // Example usage:
    // ```ts
    // const txHash = await glideClient.writeContract({
    //   account: address,
    //
    //   chainId: base.id,
    //   abi: fabricABI,
    //   address: "0x1169c6769c4F4B3cA1944AF0F26B36582fd5279d",
    //   functionName: "mintFor",
    //   args: [address, 999999907200n],
    //   value: 999999907200n,
    //
    //   // callback functions to interact with the user's wallet.
    //   // they are compatible with wagmi.
    //   switchChainAsync,
    //   sendTransactionAsync,
    //   signTypedDataAsync, // optional, to enable gasless payments
    // });
    // ```
    V(this, "writeContract", async ({
      chainId: t,
      currentChainId: n,
      account: r,
      paymentCurrency: i,
      abi: s,
      address: o,
      functionName: c,
      args: d,
      value: f,
      switchChainAsync: l,
      sendTransactionAsync: A,
      signTypedDataAsync: T
    }) => {
      var G;
      const g = Gt({
        abi: s,
        functionName: c,
        args: d
      });
      let D = i;
      if (!D) {
        const M = (await this.listPaymentOptions({
          payerWalletAddress: r,
          paymentCurrencies: (G = x(this, h).paymentCurrencies) != null && G.length ? x(this, h).paymentCurrencies : void 0,
          transaction: {
            chainId: `eip155:${t}`,
            to: o,
            input: g,
            value: j(f || 0n)
          }
        })).map(k => k.paymentCurrency.toLowerCase()).filter(k => {
          var q;
          return (q = x(this, h).paymentCurrencies) != null && q.length ? x(this, h).paymentCurrencies.includes(k) : !0;
        });
        if (M.length === 0) throw new Vt();
        D = M[0];
      }
      const {
        sessionId: _,
        unsignedTransaction: O,
        unsignedTypedData: z
      } = await this.createSession({
        payerWalletAddress: r,
        paymentCurrency: D,
        preferGaslessPayment: !!T,
        transaction: {
          chainId: `eip155:${t}`,
          to: o,
          input: g,
          value: j(f || 0n)
        }
      });
      if (T && z) {
        const y = Number(Y(z.domain.chainId));
        y !== (n || t) && (await l({
          chainId: y
        }));
        const M = await T({
          ...z,
          domain: {
            ...z.domain,
            chainId: BigInt(y)
          }
        });
        await this.payWithSignature({
          sessionId: _,
          signature: M
        });
      } else if (O) {
        const y = Number(O.chainId.replace("eip155:", ""));
        y !== (n || t) && (await l({
          chainId: y
        })), await A({
          chainId: y,
          to: O.to,
          data: O.input,
          value: Y(O.value)
        });
      }
      return (await this.waitForSession(_)).sponsoredTransactionHash;
    });
    const n = t.chains.map(({
        id: i
      }) => `eip155:${i}`),
      r = (t.paymentCurrencies || []).filter(i => n.find(s => i.indexOf(s) === 0)).map(i => i.toLowerCase());
    Z(this, h, {
      ...t,
      paymentCurrencies: r
    });
  }
  async waitForSession(t) {
    return new Promise((n, r) => {
      const i = async () => {
        const s = await this.getSessionById(t);
        if (s.sponsoredTransactionHash) {
          n({
            ...s,
            sponsoredTransactionHash: s.sponsoredTransactionHash
          });
          return;
        }
        if (s.sponsoredTransactionStatus === "failed") {
          r(new Xt());
          return;
        }
        if (s.expired) {
          r(new Kt());
          return;
        }
        setTimeout(() => i(), 2e3);
      };
      setTimeout(() => i(), 2e3);
    });
  }
  async listPaymentOptions(t) {
    return this.makeRequest({
      url: "/list-payment-options",
      body: t
    });
  }
  async estimatePaymentAmount({
    paymentCurrency: t,
    transaction: n
  }) {
    return this.makeRequest({
      url: "/estimate-payment-amount",
      body: {
        paymentCurrency: t,
        transaction: n
      }
    });
  }
  async createSession(t) {
    return this.makeRequest({
      url: "/sessions",
      body: t
    });
  }
  async getSessionById(t) {
    return this.makeRequest({
      url: `/sessions/${t}`
    });
  }
  async getSessionByPaymentTransaction({
    chainId: t,
    txHash: n
  }) {
    return this.makeRequest({
      url: `/sessions/get-by-payment-transaction?chain_id=${t}&tx_hash=${n}`
    });
  }
  async payWithSignature(t) {
    return this.makeRequest({
      url: "/pay-with-signature",
      body: t
    });
  }
  async makeRequest({
    method: t,
    url: n,
    body: r
  }) {
    const s = `${x(this, h).baseUrl || "https://api.paywithglide.xyz"}${n}`,
      o = await fetch(s, {
        method: t ?? (r ? "POST" : "GET"),
        headers: {
          "Content-Type": "application/json",
          "X-Glide-Project-ID": x(this, h).projectId
        },
        body: r ? JSON.stringify(r) : null
      });
    if (!o.ok) throw new qt(o.status, await o.text());
    return await o.json();
  }
}
exports.GlideClient = Zt;
h = new WeakMap();
const a = exports.CurrenciesByChain = {
    EthereumMainnet: {
      ETH: "eip155:1/slip44:60",
      stETH: "eip155:1/erc20:0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
      USDC: "eip155:1/erc20:0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      USDT: "eip155:1/erc20:0xdac17f958d2ee523a2206206994597c13d831ec7",
      DAI: "eip155:1/erc20:0x6b175474e89094c44da98b954eedeac495271d0f",
      BNB: "eip155:1/erc20:0xb8c77482e45f1f44de1745f52c74426c631bdd52",
      WBTC: "eip155:1/erc20:0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
      PEPE: "eip155:1/erc20:0x6982508145454ce325ddbe47a25d4ec3d2311933",
      SHIB: "eip155:1/erc20:0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce"
    },
    OptimismMainnet: {
      ETH: "eip155:10/slip44:60",
      USDT: "eip155:10/erc20:0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
      USDC: "eip155:10/erc20:0x0b2c639c533813f4aa9d7837caf62653d097ff85",
      USDCe: "eip155:10/erc20:0x7f5c764cbc14f9669b88837ca1490cca17c31607",
      UST: "eip155:10/erc20:0xfb21b70922b9f6e3c6274bcd6cb1aa8a0fe20b80",
      WBTC: "eip155:10/erc20:0x68f180fcce6836688e9084f035309e29bf0a2095",
      tBTC: "eip155:10/erc20:0x6c84a8f1c29108f47a79964b5fe888d4f4d0de40",
      DAI: "eip155:10/erc20:0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
      OP: "eip155:10/erc20:0x4200000000000000000000000000000000000042"
    },
    BaseMainnet: {
      ETH: "eip155:8453/slip44:60",
      rETH: "eip155:8453/erc20:0xb6fe221fe9eef5aba221c348ba20a1bf5e73624c",
      cbETH: "eip155:8453/erc20:0x2ae3f1ec7f1f5012cfeab0185bfc7aa3cf0dec22",
      USDC: "eip155:8453/erc20:0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
      DAI: "eip155:8453/erc20:0x50c5725949a6f0c72e6c4a641f24049a917db0cb",
      DEGEN: "eip155:8453/erc20:0x4ed4e862860bed51a9570b96d89af5e1b0efefed"
    },
    ArbitrumOneMainnet: {
      ETH: "eip155:42161/slip44:60",
      USDT: "eip155:42161/erc20:0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
      USDC: "eip155:42161/erc20:0xaf88d065e77c8cc2239327c5edb3a432268e5831",
      USDCe: "eip155:42161/erc20:0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
      USDD: "eip155:42161/erc20:0x680447595e8b7b3aa1b43beb9f6098c79ac2ab3f",
      TUSD: "eip155:42161/erc20:0x4d15a3a2286d883af0aa1b3f21367843fac63e07",
      DAI: "eip155:42161/erc20:0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
      WBTC: "eip155:42161/erc20:0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
      PEPE: "eip155:42161/erc20:0x25d887ce7a35172c62febfd67a1856f20faebb00"
    },
    PolygonPoSMainnet: {
      MATIC: "eip155:137/slip44:966",
      WETH: "eip155:137/erc20:0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
      rETH: "eip155:137/erc20:0x0266f4f08d82372cf0fcbccc0ff74309089c74d1",
      USDT: "eip155:137/erc20:0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      USDC: "eip155:137/erc20:0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
      USDCe: "eip155:137/erc20:0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
      BUSD: "eip155:137/erc20:0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
      USDD: "eip155:137/erc20:0xffa4d863c96e743a2e1513824ea006b8d0353c57",
      TUSD: "eip155:137/erc20:0x2e1ad108ff1d8c782fcbbb89aad783ac49586756",
      DAI: "eip155:137/erc20:0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
      BNB: "eip155:137/erc20:0x3ba4c387f786bfee076a58914f5bd38d668b42c3",
      SHIB: "eip155:137/erc20:0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
      WBTC: "eip155:137/erc20:0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6"
    }
  },
  Yt = exports.Currencies = {
    GasTokens: [a.EthereumMainnet.ETH, a.OptimismMainnet.ETH, a.ArbitrumOneMainnet.ETH, a.BaseMainnet.ETH, a.PolygonPoSMainnet.MATIC],
    Stablecoins: [a.EthereumMainnet.USDC, a.EthereumMainnet.USDT, a.EthereumMainnet.DAI, a.OptimismMainnet.USDC, a.OptimismMainnet.USDT, a.OptimismMainnet.DAI, a.OptimismMainnet.UST, a.OptimismMainnet.USDCe, a.BaseMainnet.USDC, a.BaseMainnet.DAI, a.ArbitrumOneMainnet.USDC, a.ArbitrumOneMainnet.USDT, a.ArbitrumOneMainnet.DAI, a.ArbitrumOneMainnet.USDCe, a.ArbitrumOneMainnet.USDD, a.ArbitrumOneMainnet.TUSD, a.PolygonPoSMainnet.USDC, a.PolygonPoSMainnet.USDT, a.PolygonPoSMainnet.DAI, a.PolygonPoSMainnet.USDCe, a.PolygonPoSMainnet.USDD, a.PolygonPoSMainnet.TUSD]
  },
  en = exports.Chains = {
    Ethereum: {
      id: 1,
      caip2: "eip155:1",
      name: "Ethereum"
    },
    Polygon: {
      id: 137,
      caip2: "eip155:137",
      name: "Polygon"
    },
    Base: {
      id: 8453,
      caip2: "eip155:8453",
      name: "Base"
    },
    Arbitrum: {
      id: 42161,
      caip2: "eip155:42161",
      name: "Arbitrum"
    },
    Avalanche: {
      id: 43114,
      caip2: "eip155:43114",
      name: "Avalanche"
    },
    Optimism: {
      id: 10,
      caip2: "eip155:10",
      name: "Optimism"
    },
    Zora: {
      id: 7777777,
      caip2: "eip155:7777777",
      name: "Zora"
    }
  };

},{}]},{},[1]);
