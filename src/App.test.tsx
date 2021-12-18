import { useState, useEffect } from "react";
import { DelayedLoading, DelayUntilSpinner } from "./DelayedLoading";
import { screen, act, render } from "@testing-library/react";

const TestApp = ({ mockLoadingTime }: any) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), mockLoadingTime);
  }, []);

  return (
    <div className="App">
      <DelayedLoading isLoading={isLoading}>
        <b>Content</b>
      </DelayedLoading>
    </div>
  );
};

describe("<DelayedLoading />", () => {
  const setup = ({ mockLoadingTime }: any) => {
    const utils = render(<TestApp mockLoadingTime={mockLoadingTime} />);

    const spinner = () => screen.queryByText("Loading");
    const content = () => screen.queryByText("Content");

    const fastForward = (by: number) =>
      act(() => jest.advanceTimersByTime(by) as any);

    return {
      spinner,
      content,
      fastForward,
    };
  };

  jest.useFakeTimers();

  test("When loading takes less than 1 second, user does not see loading message", () => {
    const { spinner, content, fastForward } = setup({ mockLoadingTime: 500 });

    expect(spinner()).not.toBeInTheDocument();

    fastForward(DelayUntilSpinner + 1);

    expect(content()).toBeInTheDocument();
  });

  test("When loading takes more than 2 seconds, user sees a spinner until content has loaded", () => {
    const { spinner, content, fastForward } = setup({ mockLoadingTime: 2300 });

    expect(spinner()).not.toBeInTheDocument();

    fastForward(DelayUntilSpinner + 1);

    expect(spinner()).toBeInTheDocument();
    expect(content()).not.toBeInTheDocument();

    fastForward(1300);

    expect(spinner()).not.toBeInTheDocument();
    expect(content()).toBeInTheDocument();
  });

  test("When loading takes more than 1 second but less than 2, user sees a spinner for 2 full seconds", () => {
    const { spinner, content, fastForward } = setup({ mockLoadingTime: 1500 });

    expect(spinner()).not.toBeInTheDocument();

    fastForward(DelayUntilSpinner + 1); // time: 1001

    expect(spinner()).toBeInTheDocument();
    expect(content()).not.toBeInTheDocument();

    fastForward(499); // time: 1500 -> loading finished

    expect(spinner()).toBeInTheDocument();
    expect(content()).not.toBeInTheDocument();

    fastForward(600); // time: 2001

    expect(spinner()).not.toBeInTheDocument();
    expect(content()).toBeInTheDocument();
  });
});
