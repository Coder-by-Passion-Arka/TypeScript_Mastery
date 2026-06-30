import React from "react";
// Assuming your implementations are imported or in the same file
import { DarkModeTheme, FAQDrop, ModalExample } from "./ToggleUtilities";

export default function App() {
  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        maxWidth: "600px",
        margin: "40px auto",
        padding: "0 20px",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      <header
        style={{
          textAlign: "center",
          borderBottom: "2px solid #eaeaea",
          paddingBottom: "20px",
        }}
      >
        <h1 style={{ margin: 0, color: "#111" }}>Render Props Demo</h1>
        <p style={{ color: "#666", margin: "8px 0 0" }}>
          One shared <code>Toggle</code> state machine powering 3 different
          components.
        </p>
      </header>

      {/* Implementation 1: Dark Mode Box */}
      <section>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "12px", color: "#444" }}>
          1. Render Prop Variant (Explicit Block Body)
        </h2>
        <DarkModeTheme />
      </section>

      {/* Implementation 2: FAQ Dropdown */}
      <section>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "12px", color: "#444" }}>
          2. Children Prop Variant (Explicit Prop Syntax)
        </h2>
        <FAQDrop />
      </section>

      {/* Implementation 3: Modal Overlay */}
      <section>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "12px", color: "#444" }}>
          3. Nested Children Variant (Implicit/Idiomatic React Syntax)
        </h2>
        <div
          style={{
            padding: "20px",
            background: "#f9f9f9",
            borderRadius: "6px",
            textAlign: "center",
          }}
        >
          <ModalExample />
        </div>
      </section>
    </div>
  );
}
