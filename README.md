# Character Map App

A interactive React application that allows users to create customizable characters and navigate them across different types
of maps using keyboard controls. This portfolio project demonstrates clean architecture, TypeScript proficiency, and
integration with external APIs.

![React](https://img.shields.io/badge/react-19.1.1-61dafb.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.9.2-3178c6.svg)
![Vite](https://img.shields.io/badge/vite-7.1.7-646cff.svg)

## ✨ Features

### Core Functionality

- **Interactive Character Creation**: Full character customization with name, color selection, and avatar types
- **Real-time Color Recognition**: Automatic color name detection using TheColorAPI
- **Multi-Map Support**: Choose between topographic maps (OpenStreetMap) and pixel art gaming maps
- **Keyboard Navigation**: Smooth character movement with arrow keys
- **Address Search**: Find and navigate to real-world locations using geocoding

### Advanced Features

- **Internationalization (i18n)**: Full support for English and Polish languages
- **Responsive Design**: Optimized for different screen sizes
- **Real-time Position Tracking**: Live coordinate display and position management
- **Theme Variety**: Multiple map themes including light/dark modes and retro gaming styles
- **Error Handling**: Comprehensive error management with user-friendly messages
- **Local Storage**: Persistent character and map preferences

## 🎮 Map Types

### 🗺️ Topographic Maps

- **OpenStreetMap Standard**: Traditional street map view
- **Light Theme**: Minimalist, clean design
- **Dark Theme**: Elegant dark mode for better visibility

### 🎨 Pixel Art Maps

- **Forest Map**: Seasonal forest environments
- **USA Map**: Stylized USA map in pixel art
- **Pokémon Map**: Retro-style Pokémon world map
- **Ocean Map**: Pixel art ocean environment
- **RPG Map**: Classic retro game dungeon style

## 🛠️ Tech Stack

### Core Technologies

- **React 19.1.1** - Modern UI library with latest features
- **TypeScript 5.9.2** - Type-safe JavaScript
- **Vite 7.1.7** - Fast build tool and development server

### Key Dependencies

- **Leaflet 1.9.4** - Interactive maps library
- **Axios 1.12.2** - HTTP client for API requests
- **i18next** - Internationalization framework

### Development Tools

- **ESLint 9.36.0** - Code linting with React-specific rules
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript-aware linting
- **Vite Plugin SVGR** - SVG handling as React components

## 🔌 External APIs

### TheColorAPI

- **Purpose**: Real-time color name recognition
- **Usage**: Converts hex color codes to human-readable color names
- **Error Handling**: Comprehensive timeout and network error management

### OpenStreetMap Nominatim

- **Purpose**: Geocoding and address search
- **Usage**: Convert addresses to coordinates for map navigation
- **Features**: Address suggestions and location search

## 🏗️ Architecture

### Clean Code Principles

- **Component Separation**: Logical division between UI and business logic
- **Custom Hooks**: Separated state management and side effects
- **Type Safety**: Comprehensive TypeScript coverage
- **Error Boundaries**: Graceful error handling throughout the app

### Project Structure

```
src/
├── components/         # Reusable UI components
├── hooks/             # Custom React hooks
├── utils/             # Utility functions and API clients
├── types/             # TypeScript type definitions
├── i18n/              # Internationalization setup and translations
├── data/              # Static data and configuration
└── assets/            # Static assets (SVGs, images)
```

### Key Hooks

- **useCharacter**: Character state management and movement
- **useMap**: Map configuration and theme handling
- **useKeyboard**: Keyboard event handling for character movement
- **useColorName**: Color API integration with caching
- **useDebounce**: Performance optimization for API calls

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd character-map-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser** Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint code analysis

## 🎯 Usage

1. **Character Setup**
   - Enter your character's name
   - Select a color using the color picker
   - View the automatically detected color name
   - Choose your preferred character avatar

2. **Map Selection**
   - Choose between topographic and pixel art maps
   - Use the address search for real-world locations
   - Toggle between different themes and styles

3. **Navigation**
   - Use arrow keys (↑↓←→) to move your character
   - Character position is displayed in real-time
   - Character and name appear in your selected color

4. **Language**
   - Switch between English and Polish using the language selector
   - All UI elements and messages are fully translated

## 🔧 Development Features

### Code Quality

- **Strict TypeScript**: Full type coverage with strict mode
- **ESLint Configuration**: React-specific rules and best practices
- **Prettier Integration**: Consistent code formatting
- **Component Testing**: Ready for test implementation

### Performance

- **Debounced API Calls**: Optimized network requests
- **Lazy Loading**: Efficient resource management
- **Memoization**: Optimized re-renders

### Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Friendly**: Proper ARIA labels
- **High Contrast**: Dark mode support

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:

- Desktop computers
- Tablets
- Mobile devices

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
