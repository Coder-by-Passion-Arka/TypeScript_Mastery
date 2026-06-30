import React, { useState } from "react";

// 1. Define the data and functions to be exposed to the UI components
type ToggleControls = {
  on: boolean;
  toggle: () => void;
};

// 2. Strict Either/Or types for render mechanism
type RenderCallback = {
  render: (controls: ToggleControls) => React.JSX.Element;
};

type ChildrenCallback = {
  children: (controls: ToggleControls) => React.JSX.Element;
};

// 3. Combine base props with exclusive union
type ToggleProps = {
  initialState?: boolean;
} & (ChildrenCallback | RenderCallback);

const Toggle = (props: ToggleProps) => {
  const { initialState = false } = props;

  // The on variable is used to decide if the Dark Mode is "on" or not.
  const [on, setOn] = useState<boolean>(initialState);

  // Definition of Toggle function
  const toggle = () =>
    setOn((prevState) => {
      return !prevState;
    });

  const controls: ToggleControls = { on, toggle }; // This object is the "Payload" (ToggleControls) to be sent back to the Parent <Toggle/> react component

  function selectCallBack(props: ToggleProps): React.JSX.Element | null {
    return "render" in props
      ? props.render(controls)
      : "children" in props
        ? props.children(controls)
        : null;
  }

  // Invoke the function so it returns the executed JSX, not the function itself
  return selectCallBack(props);
};

// Implementation - 1: A Dark Mode Toggle Button
export const DarkModeTheme = () => {
  return (
    <Toggle
      // Passing the arguements to Toggle function as props
      initialState={false} // props.initialState
      // props.render
      render={(renderElement: ToggleControls) =>
        // ( // First bracket means, it entails an element which must be returned immediately, no logic is allowed
        {
          const { on, toggle } = renderElement;
          return (
            <div
              style={{
                background: on ? "#333" : "#fff",
                color: on ? "#fff" : "#333",
                padding: "20px",
              }}
            >
              <p>The theme is {on ? "Dark" : "Light"}</p>
              <button onClick={toggle}>Switch Theme</button>
            </div>
          );
          // ) // It is allowed if we want to rerturn an element immediatelyt without any logical processing
        }
      }
    />
  );
};

// Implementation - 2: FAQ Dropdown
export const FAQDrop = () => {
  return (
    <Toggle
      // When we pass "no exclusive prop" name like "render", React bundles them as a "children prop"
      children={({ on, toggle }: ToggleControls) => (
        <div style={{ border: "1px solid #ccc", margin: "10px 0" }}>
          <h3
            onClick={toggle}
            style={{ cursor: "pointer", background: "#eee", padding: "10px" }}
          >
            {on ? "▼" : "►"} Is this pattern type-safe?
          </h3>

          {/* If 'on' apply the effect*/}
          {on && (
            <div style={{ padding: "10px" }}>
              <p>
                Yes! TypeScript ensures you can't misuse the props or access
                missing state.
              </p>
            </div>
          )}
        </div>
      )}
    />
  );
};

// Implementation - 3: Modal Overlay
export const ModalExample = () => {
  return (
    <Toggle>
      {({ on, toggle }) => (
        <div>
          <button onClick={toggle}>Open Secret Document</button>

          {on && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  padding: "30px",
                  borderRadius: "8px",
                }}
              >
                <h2>Top Secret 🤫</h2>
                <p>Render Props are incredibly versatile!</p>
                <button onClick={toggle}>Close Modal</button>
              </div>
            </div>
          )}
        </div>
      )}
    </Toggle>
  );
};
