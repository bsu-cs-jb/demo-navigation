import React from "react";
import TestRenderer, { ReactTestRenderer } from "react-test-renderer";

import App from "./App";

jest.useFakeTimers();

describe("<App/>", () => {
  let renderer: ReactTestRenderer;

  beforeEach(() => {
    renderer = TestRenderer.create(<App />);
  });
  afterEach(() => {
    renderer.unmount();
  });
  it("compiles and has children", () => {
    const tree = renderer.toJSON();
    jest.runOnlyPendingTimers();
    expect(tree).toBeDefined();
    expect(tree).not.toBeNull();
    expect(Array.isArray(tree)).toBeFalsy();
    if (tree === null || tree === undefined || Array.isArray(tree)) {
      throw new Error("tree was not defined or was an array");
    }
    expect(tree.children).toBeDefined();
    expect(tree.children).not.toBeNull();
    expect(tree.children?.length).toBeGreaterThan(0);
  });
});
