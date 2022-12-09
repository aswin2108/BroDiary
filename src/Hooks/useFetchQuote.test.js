import useFetchQuote from "./useFetchQuote";

import { act, renderHook } from "@testing-library/react";

describe("GetQuote", () => {
  it("Get quotes and authors", () => {
    const { result } = renderHook(useFetchQuote);

    expect(result.current.quotes).toBe("");
    act(() => {
      result.current.getQuote();
    });
    expect(result.current.quotes).not.toBe(null);
  });
});