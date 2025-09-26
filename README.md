# MAONO Agricultural Platform

A modern agricultural intelligence platform built with React and TypeScript, following React Native design patterns and best practices.

## Features

- **Weather Monitoring**: Real-time weather data and forecasts
- **Market Prices**: Track agricultural commodity prices across markets
- **Farm Management**: Manage multiple farms and crop data
- **Data Visualization**: Interactive charts and maps
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Technology Stack

- **React 18** with TypeScript
- **Material-UI (MUI)** for UI components
- **React Context API** for state management
- **Custom Hooks** for data fetching and state management
- **React Leaflet** for maps
- **React Globe.gl** for 3D globe visualization

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── WeatherCard.tsx
│   └── MarketPriceCard.tsx
├── screens/            # Main application screens
│   └── HomeScreen.tsx
├── hooks/              # Custom React hooks
│   ├── useWeatherData.ts
│   └── useMarketPrices.ts
├── context/            # React Context providers
│   └── AgriculturalContext.tsx
├── types/              # TypeScript type definitions
│   └── index.ts
├── services/           # API services
├── utils/              # Utility functions
└── App.tsx            # Main application component
```

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd maono-agricultural-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

### Code Style

This project follows React Native patterns and best practices:

- **Functional Components**: Use functional components with hooks
- **TypeScript**: Full TypeScript support with strict typing
- **Custom Hooks**: Extract reusable logic into custom hooks
- **Context API**: Use React Context for global state management
- **Component Composition**: Build complex UIs through component composition
- **Responsive Design**: Mobile-first approach with Material-UI

## Architecture

### State Management

The application uses React Context API for global state management, following React Native patterns:

```typescript
// Context provides global state
const { user, weatherData, marketPrices, actions } = useAgricultural();

// Custom hooks for specific data
const { weather, loading, error } = useWeatherData(location);
const { prices, loading, error } = useMarketPrices();
```

### Component Design

Components follow React Native design principles:

- **Props Interface**: Clear TypeScript interfaces for component props
- **Event Handlers**: Optional onPress handlers for interactive components
- **Styling**: Material-UI styling with custom theme
- **Accessibility**: Built-in accessibility features

### Data Flow

1. **Context Provider**: Wraps the entire app with global state
2. **Custom Hooks**: Fetch and manage specific data types
3. **Components**: Display data with proper loading and error states
4. **Services**: Handle API calls and data transformation

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Built following React Native documentation and best practices
- Material-UI for component library
- React community for excellent documentation and examples
