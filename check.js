// 강도 판정 셀프 체크: node check.js
const html = require("fs").readFileSync(__dirname + "/index.html", "utf8");
global.crypto ??= require("crypto").webcrypto;
const code = html.slice(html.indexOf("// 강도:"), html.indexOf("// 유출 확인:"));
const assert = require("assert");

// zxcvbn 없이 (불러오기 전·실패 시)
eval(code);
assert.strictEqual(crackTime("Xk9#mQ2$vL7@pR4!zT8w"), "1억 년 이상");
assert.match(crackTime("a"), /1초 미만/);

// zxcvbn 사용
global.zxcvbn = require("./zxcvbn.js");
const level = pw => strength(pw).level;
for (const pw of ["abc", "aaaaaaaa", "qwerty123", "password", "123456", "Tiger7horse"]) assert.strictEqual(level(pw), "weak", pw);
assert.strictEqual(level("Xk9#mQ2$vL7@pR4!zT8w"), "strong");
assert.strictEqual(level("Mxq7trzpLw"), "medium");

// 한국형 패턴
assert.match(strength("Dkssud!Xm#82kQz").reasons.join(), /영문 자판/);
assert.match(strength("Mk#950312zQx!Lp").reasons.join(), /생년월일/);
assert.match(strength("Zx!01087654321q").reasons.join(), /전화번호/);
assert.match(strength("abc").reasons[0], /3자로 너무 짧아요/);

// 추측 시간: 단어를 이어 붙인 비밀번호는 더 이상 "1억 년 이상"이 아님
assert.notStrictEqual(crackTime("correcthorsebatterystaple"), "1억 년 이상");
assert.strictEqual(crackTime("Xk9#mQ2$vL7@pR4!zT8w"), "1억 년 이상");

// 비밀번호 만들기: 16자, 네 종류 모두, 강함
for (let i = 0; i < 200; i++) {
  const pw = generate();
  assert.strictEqual(pw.length, 16);
  assert.strictEqual(level(pw), "strong", pw);
}

console.log("ok");
