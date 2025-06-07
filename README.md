# Popup Editor

A drag-and-drop popup editor built with Vue.js 3 and Tailwind CSS that allows users to create and customize interactive popups with real-time preview.

## ✨ Features

- **Drag & Drop Interface**: Freely position elements anywhere within the canvas
- **Element Types**: Text, buttons, input fields, and SVG icons (stars, hearts)
- **Real-time Customization**:
  - Background color picker
  - Text editing and styling
  - Element properties (colors, sizes, positioning)
- **Responsive Design**:
  - Desktop and mobile preview modes
  - Auto-scaling for mobile devices
- **Persistence**: Local storage for saving/loading designs
- **Animations**: CSS3 entry effects and smooth transitions
- **Template**: Pre-built default popup design based on Figma specifications

## 🚀 Quick Start

```sh
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🏗️ Project Structure

```
src/
├── components/          # Vue components
│   ├── DesignCanvas.vue    # Main editing canvas
│   ├── ElementProperties.vue # Property panel
│   ├── PreviewDialog.vue   # Popup preview modal
│   └── ...
├── composables/         # Vue composables
│   ├── useDesignState.ts   # State management
│   ├── useDragAndDrop.ts   # Drag & drop logic
│   └── useElementOperations.ts
├── lib/                 # Utilities and services
├── types/               # TypeScript interfaces
└── assets/              # Static assets
```

## 🛠️ Tech Stack

- **Frontend**: Vue.js 3 (Composition API), TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide Vue
- **Storage**: Browser LocalStorage
- **Testing**: Vitest
- **Code Quality**: ESLint, Prettier

## 📱 Usage

1. **Add Elements**: Use the sidebar to add text, buttons, inputs, or SVG icons
2. **Customize**: Select elements to modify properties in the right panel
3. **Drag & Drop**: Click and drag elements to reposition them
4. **Style**: Change background colors, text properties, and element styles
5. **Preview**: Click "Preview" to see your popup with animations
6. **Save**: Use "Save" to persist your design locally

## 🎨 Default Template

The editor includes a pre-built popup template featuring:

- Orange/red background (#E07A5F)
- Yellow star rating system
- Email signup form
- Call-to-action button
- Descriptive text elements

All elements are fully customizable and can be repositioned via drag & drop.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
