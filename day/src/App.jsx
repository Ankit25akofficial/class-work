import React, { useState } from "react";

// Child Component that receives and displays all kinds of props
function ChildComponent({
  stringValue,
  numberValue,
  booleanValue,
  arrayValue,
  objectValue,
  onCallback,
  children,
}) {
  return (
    <div className="card child-card">
      <div className="card-title">
        <span className="dot"></span>
        Child Component (PropsShowcase)
      </div>

      <div className="child-content-wrapper">
        {/* String Prop */}
        <div className="prop-card">
          <span className="prop-badge badge-string">string</span>
          <div className="prop-name">stringValue</div>
          <div className="prop-value">
            {stringValue || (
              <em style={{ color: "var(--text-muted)" }}>empty</em>
            )}
          </div>
        </div>
        {/* Number Prop */}
        <div className="prop-card">
          <span className="prop-badge badge-number">number</span>
          <div className="prop-name">numberValue</div>
          <div
            className="prop-value"
            style={{ fontFamily: "Fira Code, monospace" }}
          >
            {numberValue}
          </div>
        </div>
        {/* Boolean Prop */}
        <div className="prop-card">
          <span className="prop-badge badge-boolean">boolean</span>
          <div className="prop-name">booleanValue</div>
          <div className="prop-value">
            <span
              style={{
                display: "inline-block",
                padding: "0.2rem 0.6rem",
                borderRadius: "20px",
                fontSize: "0.85rem",
                fontWeight: "600",
                background: booleanValue
                  ? "rgba(16, 185, 129, 0.15)"
                  : "rgba(244, 63, 94, 0.15)",
                color: booleanValue ? "#34d399" : "#fb7185",
                border: booleanValue
                  ? "1px solid rgba(16, 185, 129, 0.25)"
                  : "1px solid rgba(244, 63, 94, 0.25)",
              }}
            >
              {booleanValue ? "TRUE" : "FALSE"}
            </span>
          </div>
        </div>
        {/* Array Prop */}
        <div className="prop-card">
          <span className="prop-badge badge-array">array</span>
          <div className="prop-name">arrayValue</div>
          <div className="prop-list">
            {arrayValue.length > 0 ? (
              arrayValue.map((item, idx) => (
                <span key={idx} className="prop-item-tag">
                  {item}
                </span>
              ))
            ) : (
              <span
                className="prop-value"
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.9rem",
                  fontStyle: "italic",
                }}
              >
                Empty array []
              </span>
            )}
          </div>
        </div>
        /{/* Object Prop */}
        <div className="prop-card">
          <span className="prop-badge badge-object">object</span>
          <div className="prop-name">objectValue</div>
          <div className="obj-grid">
            <span className="obj-key">name:</span>
            <span className="obj-val">"{objectValue.name}"</span>

            <span className="obj-key">role:</span>
            <span className="obj-val">"{objectValue.role}"</span>

            <span className="obj-key">experience:</span>
            <span className="obj-val">{objectValue.experience} years</span>
          </div>
        </div>
        {/* Function Prop */}
        <div className="prop-card">
          <span className="prop-badge badge-func">function</span>
          <div className="prop-name">onCallback (event handler)</div>
          <button
            className="action-btn"
            onClick={() =>
              onCallback(
                `Message sent from Child at ${new Date().toLocaleTimeString()}`,
              )
            }
          >
            Trigger Callback
          </button>
        </div>
        {/* Children Prop */}
        <div className="prop-card">
          <span className="prop-badge badge-children">children</span>
          <div className="prop-name">nested children</div>
          <div className="custom-child">{children}</div>
        </div>
      </div>
    </div>
  );
}

// Parent Component
function App() {
  // Parent States that will be passed as props
  const [stringValue, setStringValue] = useState("Hello React!");
  const [numberValue, setNumberValue] = useState(42);
  const [booleanValue, setBooleanValue] = useState(true);
  const [newTag, setNewTag] = useState("");
  const [arrayValue, setArrayValue] = useState([
    "React",
    "Props",
    "Vite",
    "JSX",
  ]);
  const [objectValue, setObjectValue] = useState({
    name: "Ankit",
    role: "Frontend Engineer",
    experience: 2,
  });

  // Callback trigger logs
  const [logs, setLogs] = useState([]);
  const [activeTab, setActiveTab] = useState("parent"); // 'parent' or 'child'

  const handleCallback = (message) => {
    setLogs((prev) => [message, ...prev.slice(0, 4)]);
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && newTag.trim()) {
      setArrayValue([...arrayValue, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setArrayValue(arrayValue.filter((_, idx) => idx !== indexToRemove));
  };

  const updateObject = (key, value) => {
    setObjectValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Generate dynamic syntax highlighted markup for display
  const renderParentJSX = () => {
    return (
      <code>
        <span className="token comment">
          {"// 1. In Parent: Render child and pass state as props"}
        </span>
        {"\n"}
        <span className="token keyword">import</span> ChildComponent{" "}
        <span className="token keyword">from</span>{" "}
        <span className="token string">'./ChildComponent'</span>;{"\n\n"}
        <span className="token keyword">function</span>{" "}
        <span className="token component">Parent</span>() {"{"}
        {"\n"}
        {"  "}...{"\n"}
        {"  "}
        <span className="token keyword">return</span> ({"\n"}
        {"    "}
        <span className="token tag">&lt;</span>
        <span className="token component">ChildComponent</span>
        {"\n"}
        {"      "}
        <span className="token attr-name">stringValue</span>=
        <span className="token attr-value">"{stringValue}"</span>
        {"\n"}
        {"      "}
        <span className="token attr-name">numberValue</span>={"{"}
        <span className="token number">{numberValue}</span>
        {"}"}
        {"\n"}
        {"      "}
        <span className="token attr-name">booleanValue</span>={"{"}
        <span className="token keyword">{booleanValue ? "true" : "false"}</span>
        {"}"}
        {"\n"}
        {"      "}
        <span className="token attr-name">arrayValue</span>={"{"}[
        <span className="token string">
          {arrayValue.map((v) => `'${v}'`).join(", ")}
        </span>
        ]{"}"}
        {"\n"}
        {"      "}
        <span className="token attr-name">objectValue</span>={"{"}
        {"{"} <span className="token attr-name">name</span>:{" "}
        <span className="token string">'{objectValue.name}'</span>,{" "}
        <span className="token attr-name">role</span>:{" "}
        <span className="token string">'{objectValue.role}'</span>,{" "}
        <span className="token attr-name">experience</span>:{" "}
        <span className="token number">{objectValue.experience}</span> {"}"}
        {"}"}
        {"\n"}
        {"      "}
        <span className="token attr-name">onCallback</span>={"{"}handleCallback
        {"}"}
        {"\n"}
        {"    "}
        <span className="token tag">&gt;</span>
        {"\n"}
        {"      "}
        <span className="token tag">&lt;</span>
        <span className="token tag">div</span>{" "}
        <span className="token attr-name">className</span>=
        <span className="token attr-value">"custom-child"</span>
        <span className="token tag">&gt;</span>
        {"\n"}
        {"        "}
        <span className="token tag">&lt;</span>
        <span className="token tag">h4</span>
        <span className="token tag">&gt;</span>I am passed as a child element!
        <span className="token tag">&lt;/</span>
        <span className="token tag">h4</span>
        <span className="token tag">&gt;</span>
        {"\n"}
        {"      "}
        <span className="token tag">&lt;/</span>
        <span className="token tag">div</span>
        <span className="token tag">&gt;</span>
        {"\n"}
        {"    "}
        <span className="token tag">&lt;/</span>
        <span className="token component">ChildComponent</span>
        <span className="token tag">&gt;</span>
        {"\n"}
        {"  "});{"\n"}
        {"}"}
      </code>
    );
  };

  const renderChildCode = () => {
    return (
      <code>
        <span className="token comment">
          {"// 2. In Child: Receive props via destructuring & display them"}
        </span>
        {"\n"}
        <span className="token keyword">function</span>{" "}
        <span className="token component">ChildComponent</span>({"{"}
        {"\n"}
        {"  "}
        <span className="token prop-destructure">stringValue</span>,{"\n"}
        {"  "}
        <span className="token prop-destructure">numberValue</span>,{"\n"}
        {"  "}
        <span className="token prop-destructure">booleanValue</span>,{"\n"}
        {"  "}
        <span className="token prop-destructure">arrayValue</span>,{"\n"}
        {"  "}
        <span className="token prop-destructure">objectValue</span>,{"\n"}
        {"  "}
        <span className="token prop-destructure">onCallback</span>,{"\n"}
        {"  "}
        <span className="token prop-destructure">children</span>
        {"\n"}
        {"}"}) {"{"}
        {"\n"}
        {"  "}
        <span className="token keyword">return</span> ({"\n"}
        {"    "}
        <span className="token tag">&lt;</span>
        <span className="token tag">div</span>{" "}
        <span className="token attr-name">className</span>=
        <span className="token attr-value">"child-card"</span>
        <span className="token tag">&gt;</span>
        {"\n"}
        {"      "}
        <span className="token comment">{`{/* Rendering values directly or mapping over lists */}`}</span>
        {"\n"}
        {"      "}
        <span className="token tag">&lt;</span>
        <span className="token tag">h1</span>
        <span className="token tag">&gt;</span>
        {"{"}
        <span className="token prop-destructure">stringValue</span>
        {"}"}
        <span className="token tag">&lt;/</span>
        <span className="token tag">h1</span>
        <span className="token tag">&gt;</span>
        {"\n"}
        {"      "}
        <span className="token tag">&lt;</span>
        <span className="token tag">p</span>
        <span className="token tag">&gt;</span>Count: {"{"}
        <span className="token prop-destructure">numberValue</span>
        {"}"}
        <span className="token tag">&lt;/</span>
        <span className="token tag">p</span>
        <span className="token tag">&gt;</span>
        {"\n"}
        {"      "}
        {"\n"}
        {"      "}
        <span className="token comment">{`{/* Rendering boolean conditional elements */}`}</span>
        {"\n"}
        {"      "}
        {"{"}
        <span className="token prop-destructure">booleanValue</span> ?{" "}
        <span className="token string">'Active'</span> :{" "}
        <span className="token string">'Inactive'</span>
        {"}"}
        {"\n"}
        {"      "}
        {"\n"}
        {"      "}
        <span className="token comment">{`{/* Rendering lists using .map() with keys */}`}</span>
        {"\n"}
        {"      "}
        {"{"}
        <span className="token prop-destructure">arrayValue</span>.
        <span className="token keyword">map</span>((item, idx) =&gt; ({"\n"}
        {"        "}
        <span className="token tag">&lt;</span>
        <span className="token tag">span</span>{" "}
        <span className="token attr-name">key</span>={"{"}idx{"}"}
        <span className="token tag">&gt;</span>
        {"{"}item{"}"}
        <span className="token tag">&lt;/</span>
        <span className="token tag">span</span>
        <span className="token tag">&gt;</span>
        {"\n"}
        {"      "})){"}"}
        {"\n"}
        {"      "}
        {"\n"}
        {"      "}
        <span className="token comment">{`{/* Accessing nested object properties */}`}</span>
        {"\n"}
        {"      "}
        <span className="token tag">&lt;</span>
        <span className="token tag">div</span>
        <span className="token tag">&gt;</span>Name: {"{"}
        <span className="token prop-destructure">objectValue</span>.name{"}"}
        <span className="token tag">&lt;/</span>
        <span className="token tag">div</span>
        <span className="token tag">&gt;</span>
        {"\n"}
        {"      "}
        {"\n"}
        {"      "}
        <span className="token comment">{`{/* Executing function prop callbacks on user actions */}`}</span>
        {"\n"}
        {"      "}
        <span className="token tag">&lt;</span>
        <span className="token tag">button</span>{" "}
        <span className="token attr-name">onClick</span>={"{"}() =&gt;{" "}
        <span className="token prop-destructure">onCallback</span>(
        <span className="token string">'Hi!'</span>){"}"}
        <span className="token tag">&gt;</span>Click
        <span className="token tag">&lt;/</span>
        <span className="token tag">button</span>
        <span className="token tag">&gt;</span>
        {"\n"}
        {"      "}
        {"\n"}
        {"      "}
        <span className="token comment">{`{/* Displaying children elements */}`}</span>
        {"\n"}
        {"      "}
        {"{"}
        <span className="token prop-destructure">children</span>
        {"}"}
        {"\n"}
        {"    "}
        <span className="token tag">&lt;/</span>
        <span className="token tag">div</span>
        <span className="token tag">&gt;</span>
        {"\n"}
        {"  "});{"\n"}
        {"}"}
      </code>
    );
  };

  return (
    <div className="app-container">
      <header>
        <h1 className="title-gradient">React Props Playground</h1>
        <p className="subtitle">
          Learn how to declare, pass, receive, and render props in React
          dynamically.
        </p>
      </header>

      <div className="dashboard-grid">
        {/* Left Column: Parent Panel & Controls */}
        <div className="card parent-card">
          <div className="card-title">
            <span className="dot"></span>
            Parent State Controls
          </div>

          {/* String Value Controls */}
          <div className="control-group">
            <label>1. String Prop (`stringValue`)</label>
            <input
              type="text"
              className="input-text"
              value={stringValue}
              onChange={(e) => setStringValue(e.target.value)}
              placeholder="Type string value..."
            />
          </div>

          {/* Number Value Controls */}
          <div className="control-group">
            <label>2. Number Prop (`numberValue`)</label>
            <div className="input-number-wrapper">
              <button
                className="input-number-btn"
                onClick={() => setNumberValue((prev) => prev - 1)}
              >
                −
              </button>
              <div className="input-number-value">{numberValue}</div>
              <button
                className="input-number-btn"
                onClick={() => setNumberValue((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Boolean Value Controls */}
          <div className="control-group">
            <label>3. Boolean Prop (`booleanValue`)</label>
            <div className="toggle-wrapper">
              <span style={{ fontSize: "0.95rem" }}>Toggle Boolean Status</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={booleanValue}
                  onChange={(e) => setBooleanValue(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          {/* Array Value Controls */}
          <div className="control-group">
            <label>4. Array Prop (`arrayValue`)</label>
            <div className="tag-input-container">
              {arrayValue.map((tag, idx) => (
                <span key={idx} className="tag-badge">
                  {tag}
                  <button onClick={() => handleRemoveTag(idx)}>&times;</button>
                </span>
              ))}
              <input
                type="text"
                className="tag-input"
                placeholder="Press Enter to add tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleAddTag}
              />
            </div>
          </div>

          {/* Object Value Controls */}
          <div className="control-group">
            <label>5. Object Prop (`objectValue`)</label>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <input
                type="text"
                className="input-text"
                value={objectValue.name}
                onChange={(e) => updateObject("name", e.target.value)}
                placeholder="Developer name"
              />
              <select
                className="input-select"
                value={objectValue.role}
                onChange={(e) => updateObject("role", e.target.value)}
              >
                <option value="Frontend Engineer">Frontend Engineer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Fullstack Specialist">
                  Fullstack Specialist
                </option>
                <option value="DevOps Specialist">DevOps Specialist</option>
              </select>
              <div
                className="input-number-wrapper"
                style={{ marginTop: "0.2rem" }}
              >
                <button
                  className="input-number-btn"
                  onClick={() =>
                    updateObject(
                      "experience",
                      Math.max(0, objectValue.experience - 1),
                    )
                  }
                >
                  −
                </button>
                <div className="input-number-value">
                  {objectValue.experience} Yrs Experience
                </div>
                <button
                  className="input-number-btn"
                  onClick={() =>
                    updateObject("experience", objectValue.experience + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Callback Notifications Panel */}
          {logs.length > 0 && (
            <div className="control-group" style={{ marginTop: "0.5rem" }}>
              <label>Callback Notifications (onCallback)</label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                }}
              >
                {logs.map((log, index) => (
                  <div key={index} className="toast-log">
                    <span>⚡ {log}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Center Column: Live Code Display */}
        <div className="card code-card">
          <div className="card-title">
            <span className="dot"></span>
            Dynamic Code View
          </div>
          <div className="tabs">
            <button
              className={`tab-btn ${activeTab === "parent" ? "active" : ""}`}
              onClick={() => setActiveTab("parent")}
            >
              1. Parent JSX Code
            </button>
            <button
              className={`tab-btn ${activeTab === "child" ? "active" : ""}`}
              onClick={() => setActiveTab("child")}
            >
              2. Child Component implementation
            </button>
          </div>
          <div className="code-container">
            <pre className="code-block">
              {activeTab === "parent" ? renderParentJSX() : renderChildCode()}
            </pre>
          </div>
        </div>

        {/* Right Column: Rendered Child Component Output */}
        <ChildComponent
          stringValue={stringValue}
          numberValue={numberValue}
          booleanValue={booleanValue}
          arrayValue={arrayValue}
          objectValue={objectValue}
          onCallback={handleCallback}
        >
          {/* This is passed as 'children' */}
          <div style={{ textAlign: "center" }}>
            <h4
              style={{
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "#e0e7ff",
                marginBottom: "0.25rem",
              }}
            >
              👶 Children Node
            </h4>
            <p style={{ fontSize: "0.8rem", color: "#93c5fd" }}>
              Passed between tags:
              <br />
              <code>&lt;Child&gt;This node&lt;/Child&gt;</code>
            </p>
          </div>
        </ChildComponent>
      </div>
    </div>
  );
}

export default App;
