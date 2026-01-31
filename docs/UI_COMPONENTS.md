# UI Components Documentation

## CollapsibleSection

A reusable section component that can be toggled open or closed.

### Shared Controls
All `CollapsibleSection` components on a page can be toggled simultaneously using the controls in the `PageHeader`.

- **Event Name**: `COLLAPSE_ALL_SECTIONS`
- **Payload**: `{ detail: { open: boolean } }`

### Components Involved

- **[PageHeader](file:///d:/workspace/css_playground/frontend/src/components/PageHeader.jsx)**: Dispatches the global toggle event.
- **[CollapsibleSection](file:///d:/workspace/css_playground/frontend/src/components/CollapsibleSection.jsx)**: Listens for the event and updates its internal state.

### Usage
This feature is automatically available on any page that uses both `PageHeader` and `CollapsibleSection`. No manual per-page configuration is required.
