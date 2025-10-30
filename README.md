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

| Tech | Why |
|------|-----|
| **React Native 0.80** | Stable, good TS support |
| **TypeScript** | Type safety |
| **Redux Toolkit** | Simple state management |
| **Axios** | Better than fetch for APIs |
| **React Navigation** | Bottom tabs + modal |
| **AsyncStorage** | Persist watchlist |

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
- **Platform:** iOS has network authorization issues (might be some Bearer Auth or Network Setup on iOS only for few API calls), Android implementation complete
- **Testing:** Jest and Detox setup ready but not fully implemented due to time constraints

**Planned Enhancements:**
- **UX Improvements:**
  - Swipe left gesture on cards to delete from watchlist
  - Card press animations for visual feedback when opening details
  - VOD trailer player integration with the API data
  
- **Features:**
  - Pagination for infinite scroll on movie lists
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







  
