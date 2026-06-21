// 사칙연산 및 히스토리 관리를 담당하는 계산기 클래스
export class Calculator {
  private history: string[] = [];

  add(a: number, b: number): number {
    const result = a + b;
    this.history.push(`${a} + ${b} = ${result}`);
    return result;
  }

  subtract(a: number, b: number): number {
    const result = a - b;
    this.history.push(`${a} - ${b} = ${result}`);
    return result;
  }

  multiply(a: number, b: number): number {
    const result = a * b;
    this.history.push(`${a} × ${b} = ${result}`);
    return result;
  }

  // 0으로 나누기 시도 시 에러 발생
  divide(a: number, b: number): number {
    if (b === 0) throw new Error("0으로 나눌 수 없습니다");
    const result = a / b;
    this.history.push(`${a} ÷ ${b} = ${result}`);
    return result;
  }

  getHistory(): string[] {
    return [...this.history];
  }

  clearHistory(): void {
    this.history = [];
  }
}
