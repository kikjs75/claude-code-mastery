import assert from "node:assert/strict";
import { test, describe } from "node:test";
import { Calculator } from "./calculator";

describe("Calculator", () => {
  let calc: Calculator;

  // 각 테스트 전 새 인스턴스 생성
  const setup = () => {
    calc = new Calculator();
  };

  test("덧셈", () => {
    setup();
    assert.equal(calc.add(2, 3), 5);
    assert.equal(calc.add(-1, 1), 0);
  });

  test("뺄셈", () => {
    setup();
    assert.equal(calc.subtract(10, 4), 6);
    assert.equal(calc.subtract(0, 5), -5);
  });

  test("곱셈", () => {
    setup();
    assert.equal(calc.multiply(3, 4), 12);
    assert.equal(calc.multiply(-2, 5), -10);
  });

  test("나눗셈", () => {
    setup();
    assert.equal(calc.divide(10, 2), 5);
    assert.equal(calc.divide(7, 2), 3.5);
  });

  test("0으로 나누면 에러 발생", () => {
    setup();
    assert.throws(() => calc.divide(5, 0), /0으로 나눌 수 없습니다/);
  });

  test("히스토리 기록 및 초기화", () => {
    setup();
    calc.add(1, 2);
    calc.multiply(3, 4);
    assert.equal(calc.getHistory().length, 2);

    calc.clearHistory();
    assert.equal(calc.getHistory().length, 0);
  });
});
