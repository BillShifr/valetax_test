# Currency Converter by VLADISLAV TATYANKIN


### Core Functionality
- **Real-time Exchange Rates**: Live currency conversion using VATComply API
- **Offline Support**: Cached data with 5-minute expiry for offline usage
- **Currency Selection**: Searchable modal with 20+ supported currencies
- **Amount Input**: Supports both "." and "," as decimal separators
- **Currency Swap**: One-click swap between "From" and "To" currencies
- **Live Updates**: Results recalculate while typing with 250ms debounce

### User Experience
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Network Status**: Visual indicators for online/offline status
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Loading States**: Skeleton loaders and smooth transitions
- **Accessibility**: Keyboard navigation and screen reader support

### Performance
- **Memoization**: React.memo, useMemo, and useCallback optimizations
- **Lazy Loading**: Code splitting for heavy components
- **Caching**: localStorage with automatic expiry and background refresh
- **Debouncing**: Input handling with 250ms debounce

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Strict typing for better development experience
- **Vite** - Fast build tool and development server
- **SCSS** - Advanced CSS with variables and mixins
- **ESLint** - Code quality and consistency

## Setup Instructions

### Prerequisites
- Node.js (v18.18.0 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd valetax_test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` (or the URL shown in terminal)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Environment Variables

The application uses the VATComply API which doesn't require an API key. However, if you want to use a different API provider, you can create a `.env` file:

```env
# Optional: For alternative API providers
VITE_API_BASE_URL=https://api.vatcomply.com
VITE_API_KEY=your_api_key_here
```

## Architecture & Key Decisions

### Project Structure
```
src/
├── components/          # React components
│   ├── CurrencyConverter.tsx
│   ├── CurrencySelector.tsx
│   ├── ConversionResult.tsx
│   ├── NetworkStatus.tsx
│   ├── ErrorBoundary.tsx
│   └── LoadingSkeleton.tsx
├── hooks/              # Custom React hooks
│   └── useCurrencyConverter.ts
├── services/           # API and external services
│   └── api.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   └── conversion.ts
├── styles/             # SCSS stylesheets
│   ├── variables.scss
│   ├── global.scss
│   └── [component].scss
└── App.tsx
```

### Key Architectural Decisions

#### 1. API Choice: VATComply
- **Reason**: Free, reliable, and doesn't require API keys
- **Base Currency**: EUR (handled with cross-rate calculations)
- **Rate Calculation**: `rate(A→B) = rate(Base→B) / rate(Base→A)`

#### 2. Caching Strategy
- **Storage**: localStorage for persistence across sessions
- **Expiry**: 5-minute cache with automatic background refresh
- **Offline Support**: Graceful degradation with cached data
- **Cache Key**: `currency_converter_cache`

#### 3. State Management
- **Approach**: Custom hook with useState and useCallback
- **Benefits**: No external dependencies, full TypeScript support
- **Persistence**: Automatic localStorage sync for user preferences

#### 4. Performance Optimizations
- **Memoization**: React.memo for components, useMemo/useCallback for functions
- **Lazy Loading**: Suspense with code splitting for heavy components
- **Debouncing**: 250ms delay for input handling
- **Re-render Prevention**: Careful dependency arrays and state structure

#### 5. Responsive Design
- **Mobile First**: Base styles for mobile (≤480px)
- **Desktop**: Enhanced layout for desktop (≥1024px)
- **Breakpoints**: 480px, 768px, 1024px, 1280px
- **Grid System**: CSS Grid for desktop layout

#### 6. Error Handling
- **Error Boundaries**: React ErrorBoundary for component errors
- **API Errors**: Graceful fallback to cached data
- **Network Errors**: Clear user feedback with retry options
- **Validation**: Input validation with user-friendly messages

### Component Architecture

#### CurrencyConverter (Main Component)
- Orchestrates the entire application
- Manages state through custom hook
- Handles error states and loading states
- Responsive layout with CSS Grid

#### CurrencySelector
- Modal-based currency selection
- Search functionality with real-time filtering
- Keyboard navigation (↑/↓, Enter, Escape)
- Accessible with proper ARIA labels

#### NetworkStatus
- Real-time online/offline detection
- Last updated timestamp display
- Manual refresh functionality
- Visual status indicators

#### ConversionResult
- Displays conversion results
- Shows exchange rates and inverse rates
- Formatted currency display
- Disclaimer text

### Styling Architecture

#### SCSS Variables
- Centralized color palette
- Typography scale
- Spacing system
- Breakpoint definitions

#### Component Styles
- BEM methodology for class naming
- Scoped styles per component
- Responsive mixins
- Animation and transition utilities

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: < 200KB gzipped

## Development Guidelines

### Code Quality
- **TypeScript**: Strict mode enabled
- **ESLint**: Configured with React and TypeScript rules
- **Naming**: PascalCase for components, camelCase for functions
- **File Structure**: One component per file with matching SCSS

### Testing Strategy
- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: Hook testing with custom render
- **E2E Tests**: Cypress for user workflows
- **Performance**: Lighthouse CI for metrics

## Deployment

### Vercel (Recommended)
1. Connect GitHub repository
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automatically on push

### Netlify
1. Connect repository
2. Build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
3. Deploy with continuous integration

### Manual Deployment
1. Run `npm run build`
2. Upload `dist` folder to web server
3. Configure server for SPA routing

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

