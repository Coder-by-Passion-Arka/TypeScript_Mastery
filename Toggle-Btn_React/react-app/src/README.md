```ini
1. RENDER PHASE (FaqAccordion runs)
┌────────────────────────────────────────────────────────────────────────┐
│ FaqAccordion()                                                          │
│   │                                                                    │
│   │  Hey React! Render <Toggle>, and pass this function                │
│   │  as its "children" prop.                                           │
│   ▼                                                                    │
│   children: ({ on, toggle }) => ( <div>...</div> )                     │
└───────│────────────────────────────────────────────────────────────────┘
        │
        ▼ (React passes control to Toggle)
        
2. LOGIC PHASE (Toggle runs)
┌────────────────────────────────────────────────────────────────────────┐
│ Toggle(props)                                                          │
│   │                                                                    │
│   ├─► 1. state setup: [on, setOn] = useState(false) <-- (default value)│
│   ├─► 2. method setup: toggle() { setOn(!on) }                         │
│   │                                                                    │
│   ├─► 3. Payload Created:                                              │
│   │      const controls = { on: false, toggle: function }              │
│   │                                                                    │
│   │   4. Checking Props & The Handshake:                               │
│   │      "children" in props? YES!                                     │
│   ▼                                                                    │
│   return props.children( controls ); ───┐                              │
└─────────────────────────────────────────│──────────────────────────────┘
                                          │
        ┌─────────────────────────────────┘
        ▼ (Data is injected back into your function)

3. LAYOUT PAINT PHASE (Your function executes)
┌────────────────────────────────────────────────────────────────────────┐
│ ({ on, toggle }) => (                                                  │
│      │     │                                                           │
│      │     └─► Bound to <h3 onClick={toggle}>                          │
│      ▼                                                                 │
│   {on ? '▼' : '►'} ──► Resolves to '►' (because on is false)           │
│                                                                        │
│   Returns: This final visual HTML block to the screen!                 │
└────────────────────────────────────────────────────────────────────────┘
```