# PremiereNight
A cross-platform “Premiere Night” app that helps curators surface the right films for Mytheresa’s private screening events. The experience should focus on cinematic discovery and a simple watchlist.

![React Native](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![TMDb API](https://img.shields.io/badge/TMDb%20API-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
--
[![wakatime](https://wakatime.com/badge/user/c9dbeee1-35ba-48e9-a5b4-4357d3278db3/project/96a3cc26-45ff-461f-bdad-f35b50483825.svg)](https://wakatime.com/badge/user/c9dbeee1-35ba-48e9-a5b4-4357d3278db3/project/96a3cc26-45ff-461f-bdad-f35b50483825)

## Overview

**Premiere Night** is a mobile application built with **React Native** for both Android and iOS.
It allows users to **browse, discover, and save movies** using **[The Movie Database (TMDb)](https://www.themoviedb.org/)** API.

The project emphasizes **clean architecture**, **SOLID principles**, and **scalable state management** using **Redux Toolkit**.

### Prerequisites
- Node.js 18+
- React Native CLI
- Xcode (iOS) or Android Studio (Android)

## Installation

```bash
# Install dependencies
npm install

# Run the app on Android
npm run android

# Run the app on iOS
cd ios && pod install && cd ..
npm run ios
```
---

## Architecture
```
┌─────────────────────────────────────┐
│           App (Redux)               │
│     (Loads watchlist on startup)    │
└──────────────┬──────────────────────┘
               │
        ┌──────┴──────┐
        │  Bottom Tab │
        └──────┬──────┘
               │
       ┌───────┴────────┐
       │                │
   ┌───▼───┐      ┌─────▼─────┐
   │ Films │      │ Watchlist │
   └───┬───┘      └─────┬─────┘
       │                │
       └────────┬───────┘
                │
           ┌────▼───────┐
           │   Detail   │
           │   Modal    │
           └────────────┘
```

**Data Flow:**
```
UI → Redux Action → Axios API Call → Redux State → UI Update
                                   ↓
                            AsyncStorage (Watchlist)
```

---

## Tech Stack

| Tech |
|------|
| **React Native 0.80** |
| **TypeScript** |
| **Redux Toolkit** |
| **Axios** |
| **React Navigation** |
| **AsyncStorage** |

---

## Structure
```
src/
├── api/           # Axios + TMDb calls
├── components/    # Reusable UI
├── navigation/    # Tab + Stack types
├── screens/       # Home, Detail, Watchlist
├── store/         # Redux slices
└── theme/         # Theme, responsive, typography
```

---

## Notes & Future Improvements

**Current Implementation:**
- **Watchlist:** Saved locally with AsyncStorage, loaded automatically on app startup
- **Language:** English only (i18n can be added for international purpose)
- **Deeplinks:** Architecture is setup with linking but must be handled while the app is opened and/or closed and the navigation shouldn't be block afterwards.
- **Testing:** Detox setup ready but not fully implemented due to time constraints

**Planned Enhancements:**
- **UX Improvements:**
  - Swipe left gesture on cards to delete from watchlist
  - Card press animations for visual feedback when opening details
  - VOD trailer player integration with the API data

- **Features:**
  - Offline mode with cached movie data
  - Top rated and upcoming movie categories
  - User authentication for cross-device watchlist sync

- **Technical:**
  - Deep linking easy to implement via movie.id in detailscreen route params
  - Complete E2E test coverage with Detox (with testID sets on Views) testing, scrollviews and movie details onClick

--

## Development Process

**GitHub Pull Requests:**

You can view the development history and how the codebase was built incrementally through these PRs:

- [PR #5 - Redux Store & API Calls](https://github.com/MathieuVce/PremiereNight_Challenge/pull/5) - State management with Redux Toolkit and Axios integration
- [PR #4 - TMDB API Configuration](https://github.com/MathieuVce/PremiereNight_Challenge/pull/4) - API client setup and endpoints configuration
- [PR #3 - Components & Screens Architecture](https://github.com/MathieuVce/PremiereNight_Challenge/pull/3) - Reusable components and screens implementation
- [PR #2 - React Navigation Setup](https://github.com/MathieuVce/PremiereNight_Challenge/pull/2) - Bottom tabs and stack navigation structure


## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage
```

### Running Specific Tests
```bash
# Run a specific test file
npm test -- Button.test.tsx

# Run tests matching a pattern
npm test -- --testNamePattern="Watchlist"

# Run tests in a specific folder
npm test -- __tests__/components/
```

### Adding New Tests

Tests are located in the `__tests__` directory, mirroring your source code structure:
```
__tests__/
└── api/
    └── client.test.ts
├── components/
│   ├── Button.test.tsx
│   ├── Card.test.tsx
│   ├── LoadingSpinner.test.tsx
│   └── MovieCard.test.tsx
├── store/
│   ├── moviesSlice.test.ts
│   └── watchlistSlice.test.ts
```

**To add a new test:**

1. Create a file with the `.test.tsx` or `.test.ts` extension in the `__tests__` folder
2. Import the component/function you want to test
3. Write your test cases using `describe` and `it` blocks
4. Run `npm test` to verify your tests pass

**Example test structure:**
```typescript
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import MyComponent from '@/components/MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    const {getByText} = render(<MyComponent title="Test" />);
    expect(getByText('Test')).toBeTruthy();
  });

  it('should handle press event', () => {
    const mockOnPress = jest.fn();
    const {getByTestId} = render(
      <MyComponent onPress={mockOnPress} testID="my-component" />
    );

    fireEvent.press(getByTestId('my-component'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
```
---

## 🔗 Testing Deep Links

### iOS Simulator

To test deep links on iOS simulator:
```bash
# Basic deep link to movie details
xcrun simctl openurl booted "premierenight://movie/507244"

# Deep link to home screen
xcrun simctl openurl booted "premierenight://home"

# Deep link to watchlist
xcrun simctl openurl booted "premierenight://watchlist"
```

### Android Emulator/Device

To test deep links on Android:
```bash
# Basic deep link to movie details
adb shell am start -W -a android.intent.action.VIEW -d "premierenight://movie/507244" com.premierenightchallenge

# Deep link to home screen
adb shell am start -W -a android.intent.action.VIEW -d "premierenight://home" com.premierenightchallenge

# Deep link to watchlist
adb shell am start -W -a android.intent.action.VIEW -d "premierenight://watchlist" com.premierenightchallenge
```