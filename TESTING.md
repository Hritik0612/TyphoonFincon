# Testing Environment Setup

## 🧪 Testing Stack

Your TyphoonFincon project now has a comprehensive testing environment set up with:

- **Vitest** - Fast unit testing framework (Vite-native)
- **React Testing Library** - Component testing utilities
- **Jest DOM** - Custom matchers for DOM testing
- **User Event** - User interaction simulation
- **Coverage reporting** - Code coverage analysis

## 📁 Test Structure

```
src/
├── components/
│   └── __tests__/
│       ├── Navbar.test.tsx
│       └── Footer.test.tsx
├── pages/
│   └── __tests__/
│       ├── Home.test.tsx
│       ├── CustomerApplication.test.tsx
│       └── AdminLogin.test.tsx
├── App.test.tsx
├── setupTests.ts
└── test-utils.tsx
```

## 🚀 Available Test Commands

```bash
# Run tests in watch mode (recommended for development)
npm run test

# Run tests once
npm run test:run

# Run tests with coverage report
npm run test:coverage

# Open Vitest UI (visual test runner)
npm run test:ui

# Run tests in watch mode
npm run test:watch
```

## 📊 Test Coverage

The tests cover:

### ✅ Components
- **Navbar**: Logo, navigation links, mobile menu toggle
- **Footer**: Contact info, quick links, office hours, copyright

### ✅ Pages
- **Home**: Hero section, services, testimonials, contact form
- **CustomerApplication**: Form validation, field requirements, file upload
- **AdminLogin**: Authentication, credential validation, error handling

### ✅ Features Tested
- Form validation (email, phone, PAN, Aadhaar, loan amount)
- User interactions (clicks, typing, file uploads)
- Navigation and routing
- Authentication flow
- Error handling and loading states
- Responsive design elements

## 🔧 Test Configuration

### Vitest Config (`vitest.config.ts`)
- JSDOM environment for browser-like testing
- React plugin integration
- Global test utilities

### Setup Files
- `src/setupTests.ts` - Global test setup and mocks
- `src/test-utils.tsx` - Custom render function with providers

### Mocked APIs
- `localStorage` and `sessionStorage`
- `window.matchMedia`
- `IntersectionObserver` and `ResizeObserver`
- File uploads
- React Router navigation

## 📝 Writing New Tests

### Example Component Test:
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { render as customRender } from '../test-utils';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  test('renders correctly', () => {
    customRender(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Example Form Test:
```typescript
import userEvent from '@testing-library/user-event';

test('validates form input', async () => {
  const user = userEvent.setup();
  render(<MyForm />);
  
  const input = screen.getByLabelText(/email/i);
  await user.type(input, 'invalid-email');
  
  expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
});
```

## 🎯 Best Practices

1. **Use descriptive test names** - "should display error when email is invalid"
2. **Test user interactions** - Click, type, upload files
3. **Mock external dependencies** - APIs, localStorage, navigation
4. **Test accessibility** - Screen readers, keyboard navigation
5. **Keep tests focused** - One assertion per test when possible
6. **Use data-testid sparingly** - Prefer accessible queries

## 🚨 Common Issues & Solutions

### Issue: "window is not defined"
**Solution**: Ensure JSDOM environment is configured in vitest.config.ts

### Issue: "Cannot find module"
**Solution**: Check import paths and ensure test files are in correct directories

### Issue: "localStorage is not defined"
**Solution**: Mock localStorage in setupTests.ts (already configured)

### Issue: "React Router navigation not working"
**Solution**: Use custom render function from test-utils.tsx

## 📈 Coverage Goals

Aim for:
- **80%+ line coverage**
- **70%+ branch coverage**
- **90%+ function coverage**

Run `npm run test:coverage` to see current coverage.

## 🔄 Continuous Integration

For CI/CD pipelines, use:
```bash
npm run test:run -- --coverage --reporter=verbose
```

This ensures tests run once with coverage reporting suitable for CI environments.

