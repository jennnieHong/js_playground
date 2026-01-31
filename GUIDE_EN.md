# 📔 CSS Masterclass User Guide

This guide explains how to effectively learn modern CSS using the **CSS Masterclass** application.

---

## 🎯 Learning Goal
The goal is to move beyond passive reading. By **Live Editing** code and using **Interactive Controls**, you will visually understand how each CSS property affects layout and design.

## 🖥️ Interface Overview

### 1. Navigation Tree (Left Side)
20+ learning topics are organized into 5 logical groups:
- **CSS Basics**: Core Layout (Flex, Grid, Animation, Responsive, Position)
- **Advanced Topics**: Advanced Techniques (Container Queries, z-index, Performance, Selectors)
- **CSS Foundations**: Structural Core (Display, Box Model, Logical Properties, Float)
- **Visual & Design**: Aesthetic Elements (Colors, Typography)
- **Interaction**: Engagement (States, Pseudo-classes, Form Styling, A11y)

### 2. Integrated Live Editor (Center)
- **CSS/HTML Tabs**: Freely edit the styles and structure of examples.
- **Apply Button**: Instantly reflect your manual changes in the preview.
- **Reset Button**: Revert to the original exercise code at any time.
- **Preview**: A real-time sandbox area displaying your rendered code.

---

## 📚 Study Module Highlights

### 📏 Layout & Foundations
- **Flexbox & Grid**: Master 1D and 2D layout alignment and placement.
- **Logical Properties**: Learn direction-agnostic spacing (`inline-start`, `block-size`) for global web support.
- **Box Model (+ aspect-ratio)**: Understand `border-box` importance and how to fix aspect ratios for images/cards.
- **Position**: Master `relative`/`absolute` relationships and solve fixed position "traps."

### 🎨 Visuals & Interaction
- **Typography & Writing Mode**: Design typography systems and explore vertical-rl layouts.
- **Colors & Glassmorphism**: Experiment with modern trends like backdrop filters and complex gradients.
- **Form Styling**: Remove browser defaults and build accessible, custom form elements.
- **Interaction & :has()**: Experience the "CSS Game Changer" by controlling parents based on child states.

### 🚀 Performance & Advanced
- **Performance & Rendering**: Learn to reduce Repaint/Reflow and skip rendering for off-screen elements (`content-visibility`).
- **Container Queries**: Build components that react to their parent size rather than the viewport.
- **Modern Selectors**: Precision-manage specificity using `:is()`, `:where()`, and `:not()`.
- **Stacking Context**: Conquer complex layering issues and `z-index` bugs.

---

## ❓ Troubleshooting & Tips

- **White screen or missing menu?**:
  - Ensure the backend server (`/backend`) is running.
  - Ensure you've initialized the DB using `node scripts/resetMenus.js`.
- **Changes not applying?**:
  - You must click the **Apply** button to update the preview from code.
- **Learning Tip**:
  - Open DevTools (F12), turn on 'Paint flashing' in the Rendering tab, and watch what happens when you interact with the Performance Study module.

---
Become a CSS Master with practical, hands-on experience! 🚀
