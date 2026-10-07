// 강도 판정 셀프 체크: node check.js
const html = require("fs").readFileSync(__dirname + "/index.html", "utf8");
eval(html.slice(html.indexOf("// 강도:"), html.indexOf("// 유출 확인:")));
const assert = require("assert");

const level = pw => strength(pw).level;
for (const pw of ["abc", "aaaaaaaa", "qwerty123", "password", "123456"]) assert.strictEqual(level(pw), "weak", pw);
assert.strictEqual(level("Xk9#mQ2$vL7@pR4!zT8w"), "strong");
assert.strictEqual(level("Tiger7horse"), "medium");

// 한국형 패턴
assert.match(strength("Dkssud!Xm#82kQz").reasons.join(), /영문 자판/);
assert.match(strength("Mk#950312zQx!Lp").reasons.join(), /생년월일/);
assert.match(strength("Zx!01087654321q").reasons.join(), /전화번호/);
assert.match(strength("abc").reasons[0], /3자로 너무 짧아요/);

// 추측 시간
assert.strictEqual(crackTime("Xk9#mQ2$vL7@pR4!zT8w"), "1억 년 이상");
assert.match(crackTime("Tiger7horse"), /^약 \d+(년|일)$/);
assert.match(crackTime("a"), /1초 미만/);

console.log("ok");
