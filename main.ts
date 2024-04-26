export class ClosedRange {
  readonly #start: number;
  readonly #end: number;

  constructor(start: number, end: number) {
    if (start > end) {
      throw new Error("下限が上限より大きい区間は作れません");
    }
    this.#start = start;
    this.#end = end;
  }

  get start(): number {
    return this.#start;
  }

  get end(): number {
    return this.#end;
  }

  toString(): string {
    return `[${this.#start},${this.#end}]`;
  }

  contains(value: number): boolean {
    return this.#start <= value && value <= this.#end;
  }

  equals(other: ClosedRange): boolean {
    return this.#start === other.#start && this.#end === other.#end;
  }

  includes(other: ClosedRange): boolean {
    return this.#start <= other.#start && other.#end <= this.#end;
  }
}
