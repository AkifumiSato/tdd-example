import { assertEquals, assertThrows } from "jsr:@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import { ClosedRange } from "./main.ts";

describe("矛盾する区間", () => {
  it("下限が上限より大きい場合はエラー", () => {
    assertThrows(
      () => {
        new ClosedRange(2, 1);
      },
      Error,
      "下限が上限より大きい区間は作れません",
    );
  });
});

describe("上限・下限の取得", () => {
  it("閉区間[1,2]の下限は1", () => {
    const sut = new ClosedRange(1, 2);
    assertEquals(sut.start, 1);
  });

  it("閉区間[1,2]の上限は2", () => {
    const sut = new ClosedRange(1, 2);
    assertEquals(sut.end, 2);
  });

  it("閉区間[3,10]の下限は3", () => {
    const sut = new ClosedRange(3, 10);
    assertEquals(sut.start, 3);
  });

  it("閉区間[3,10]の上限は10", () => {
    const sut = new ClosedRange(3, 10);
    assertEquals(sut.end, 10);
  });

  it("閉区間[1,1]の上限・下限は1", () => {
    const sut = new ClosedRange(1, 1);
    assertEquals(sut.end, 1);
    assertEquals(sut.start, 1);
  });
});

describe("文字列表現", () => {
  it("閉区間[1,2]の文字列表現は'[1,2]'", () => {
    const sut = new ClosedRange(1, 2);
    assertEquals(sut.toString(), "[1,2]");
  });

  it("閉区間[3,10]の文字列表現は'[3,10]'", () => {
    const sut = new ClosedRange(3, 10);
    assertEquals(sut.toString(), "[3,10]");
  });
});

describe("閉区間に値が含まれるか", () => {
  it("閉区間[3,8]に5は含まれる", () => {
    const sut = new ClosedRange(3, 8);
    assertEquals(sut.contains(5), true);
  });

  it("閉区間[3,8]に2は含まれない", () => {
    const sut = new ClosedRange(3, 8);
    assertEquals(sut.contains(2), false);
  });

  it("閉区間[3,8]に9は含まれない", () => {
    const sut = new ClosedRange(3, 8);
    assertEquals(sut.contains(9), false);
  });

  it("閉区間[3,8]に3は含まれる", () => {
    const sut = new ClosedRange(3, 8);
    assertEquals(sut.contains(3), true);
  });

  it("閉区間[3,8]に8は含まれる", () => {
    const sut = new ClosedRange(3, 8);
    assertEquals(sut.contains(8), true);
  });
});

describe("閉区間の等価比較", () => {
  it("閉区間[3,8]と閉区間[3,8]は等しい", () => {
    const sut1 = new ClosedRange(3, 8);
    const sut2 = new ClosedRange(3, 8);
    assertEquals(sut1.equals(sut2), true);
  });

  it("閉区間[3,8]と閉区間[4,8]は等しくない", () => {
    const sut1 = new ClosedRange(3, 8);
    const sut2 = new ClosedRange(4, 8);
    assertEquals(sut1.equals(sut2), false);
  });
});

describe("閉区間を含むか比較", () => {
  it("閉区間[3,8]は閉区間[5,7]を含む", () => {
    const sut1 = new ClosedRange(3, 8);
    const sut2 = new ClosedRange(5, 7);
    assertEquals(sut1.includes(sut2), true);
  });

  it("閉区間[3,8]は閉区間[3,7]を含む", () => {
    const sut1 = new ClosedRange(3, 8);
    const sut2 = new ClosedRange(3, 7);
    assertEquals(sut1.includes(sut2), true);
  });

  it("閉区間[3,8]は閉区間[5,8]を含む", () => {
    const sut1 = new ClosedRange(3, 8);
    const sut2 = new ClosedRange(5, 8);
    assertEquals(sut1.includes(sut2), true);
  });

  it("閉区間[3,8]は閉区間[3,8]を含む", () => {
    const sut1 = new ClosedRange(3, 8);
    const sut2 = new ClosedRange(3, 8);
    assertEquals(sut1.includes(sut2), true);
  });

  it("閉区間[3,8]は閉区間[2,8]を含まない", () => {
    const sut1 = new ClosedRange(3, 8);
    const sut2 = new ClosedRange(2, 8);
    assertEquals(sut1.includes(sut2), false);
  });

  it("閉区間[3,8]は閉区間[3,9]を含まない", () => {
    const sut1 = new ClosedRange(3, 8);
    const sut2 = new ClosedRange(3, 9);
    assertEquals(sut1.includes(sut2), false);
  });
});
