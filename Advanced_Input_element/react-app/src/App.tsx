import React, { useState, useEffect } from "react";
import { ControlledInput } from "./ControlledInputModal"

// Mock API for the Search Filter usecase
const FRUITS = [
  "Apple",
  "Banana",
  "Blueberry",
  "Cherry",
  "Dragonfruit",
  "Grape",
  "Mango",
  "Orange",
];

export default function App() {
  // States to keep track of asynchronous operations in our advanced components
  const [searchTerm, setSearchTerm] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Filter fruits list whenever the search term changes
  const filteredFruits = FRUITS.filter((fruit) =>
    fruit.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        maxWidth: "700px",
        margin: "40px auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        background: "#fafafa",
        color: "#333",
      }}
    >
      <header style={{ borderBottom: "1px solid #ddd", paddingBottom: "15px" }}>
        <h1 style={{ margin: 0, color: "#111" }}>
          Advanced <code>ControlledInput</code> Use Cases
        </h1>
        <p style={{ margin: "5px 0 0", color: "#666" }}>
          Demonstrating decoupling state logic from visual markup.
        </p>
      </header>

      {/* 🚀 USE CASE 1: REAL-TIME SEARCH FILTER */}
      <section style={cardStyle}>
        <h3 style={titleStyle}>1. Real-Time Search & Data Filter</h3>
        <p style={descStyle}>
          As you type, the search phrase updates instantly, filtering a static
          data matrix completely under the hood.
        </p>

        <form
          onChange={(e) => {
            // Capturing bubble events from ControlledInput to trigger local states
            const target = e.target as HTMLInputElement;
            setSearchTerm(target.value);
          }}
        >
          <ControlledInput initialValue="" type="search" name="searchQuery" />
        </form>

        <div style={{ marginTop: "15px" }}>
          <strong style={{ fontSize: "0.85rem" }}>
            Results ({filteredFruits.length}):
          </strong>
          <ul
            style={{
              margin: "5px 0 0",
              paddingLeft: "20px",
              fontSize: "0.9rem",
            }}
          >
            {filteredFruits.map((fruit) => (
              <li key={fruit}>{fruit}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 🚀 USE CASE 2: LIVE DEBOUNCED AUTO-SAVE ELEMENT */}
      <section style={cardStyle}>
        <h3 style={titleStyle}>2. Auto-Saving Content Field</h3>
        <p style={descStyle}>
          Simulates cloud auto-saving. Type a biography; after you stop typing
          for 1 second, it saves automatically.
        </p>

        <div
          onInput={(e) => {
            // Intercept input event stream to kick off an asynchronous saving effect
            const target = e.target as HTMLInputElement;
            setIsSaving(true);

            // Debounce mechanism
            const timeoutId = (window as any).saveTimeout;
            if (timeoutId) 
              clearTimeout(timeoutId);

            (window as any).saveTimeout = setTimeout(() => {
              setIsSaving(false);
              setLastSaved(new Date().toLocaleTimeString());
            }, 1000);
          }}
        >
          <ControlledInput
            initialValue="I love developing clean UI architectures with TypeScript..."
            type="text"
            name="biography"
          />
        </div>

        <div
          style={{
            marginTop: "12px",
            fontSize: "0.85rem",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {isSaving ? (
            <span style={{ color: "#e67e22", fontWeight: "bold" }}>
              ⏳ Syncing with cloud...
            </span>
          ) : lastSaved ? (
            <span style={{ color: "#2ecc71" }}>
              ✅ Changes saved at {lastSaved}
            </span>
          ) : (
            <span style={{ color: "#7f8c8d" }}>No recent changes</span>
          )}
        </div>
      </section>

      {/* 🚀 USE CASE 3: INLINE VALIDATION & ERROR RECOGNITION */}
      <section style={cardStyle}>
        <h3 style={titleStyle}>3. Immediate Form Validation Field</h3>
        <p style={descStyle}>
          We wrap our input inside a local listener block that validates
          password complexity criteria in real-time.
        </p>

        <div id="password-validator-container">
          <ControlledInput
            initialValue=""
            type="password"
            name="securePassword"
          />

          {/* Injecting a monitoring function via regular DOM events */}
          <div
            style={{ marginTop: "10px" }}
            ref={(el) => {
              if (!el) return;
              const input = el.parentElement?.querySelector("input");
              if (!input) return;

              // Set up a dynamic direct sync listener
              input.oninput = () => {
                const val = input.value;
                const errEl = document.getElementById("err-box");
                if (!errEl) return;

                if (val.length > 0 && val.length < 8) {
                  errEl.innerText =
                    "❌ Password must be at least 8 characters long.";
                  errEl.style.color = "#e74c3c";
                } else if (val.length >= 8) {
                  errEl.innerText = "🚀 Strong Password Secure!";
                  errEl.style.color = "#2ecc71";
                } else {
                  errEl.innerText = "";
                }
              };
            }}
          >
            <span
              id="err-box"
              style={{ fontSize: "0.85rem", fontWeight: "500" }}
            ></span>
          </div>
        </div>
      </section>
    </div>
  );
}

// Inline Shared Styles for Presentable Dashboard Grid Cards
const cardStyle: React.CSSProperties = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  border: "1px solid #eee",
};

const titleStyle: React.CSSProperties = {
  margin: "0 0 5px 0",
  fontSize: "1.15rem",
  color: "#2c3e50",
};

const descStyle: React.CSSProperties = {
  margin: "0 0 15px 0",
  fontSize: "0.88rem",
  color: "#7f8c8d",
  lineHeight: "1.4",
};
