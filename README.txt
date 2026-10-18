LOYALTY APP

1. OVERVIEW
- Loyalty app showing a member's loyalty card and their available offers.
- Home screen shows the member's name, points and tier, plus a list of offers.
- Tapping an offer opens a detail screen with the description, status and terms.
- "Redeem Offer" opens a bottom-sheet modal with a barcode.
- Pull to refresh on the offers list.
- Data comes from a mock API that simulates network delay and random failures.

2. GETTING STARTED
- Requirements: Node 18+, React Native environment set up for iOS and/or Android.
- Install dependencies: npm install
- iOS only, install pods: cd ios && pod install && cd ..
- Start Metro: npm start
- Run the app: npm run ios  (or)  npm run android
- Run the tests: npm test
- Note: This app is tested only for iOS.

3. KEY DECISIONS
- Structure:
  - Feature implementation is in modules/loyalty, split into screens, components, hooks, mocks, types and utils.
  - Navigation lives in navigation/AppNavigator.tsx (native stack: Home -> OfferDetail).
  - Each component keeps its styles in a separate *.styled.ts file.
- State:
  - Data fetching and UI state are in custom hooks (useMemberData, useOffersHook, useOfferHook, useLoyaltyHook).
  - Screens read state from a hook and decide what to render.
  - The selected offer is passed to the detail screen via route params.
- Loading and errors:
  - Every screen handles four states the same way: loading -> SkeletonLoader, error -> ErrorState, no data -> EmptyState, otherwise content.
  - Errors show a message with a "Try again" button that calls the hook's retry.
  - Raw errors are logged with console.error (a place to plug in Sentry or similar).
  - Refreshing uses a separate isRefreshing flag, so the list stays on screen instead of being replaced by the skeleton.
- Mock API:
  - Random 500-1200ms delay and a 10% failure rate, so loading and error states can be seen in the app.
- Testing:
  - Jest + React Native Testing Library.
  - Hooks are tested with renderHook and a mocked API.
  - Screens are tested with their data hook mocked, so each state can be set directly.
  - The mock API is tested with fake timers and a fixed Math.random, so tests are fast and not flaky.

4. TRADE-OFFS AND NEXT STEPS
- No real backend. The mock API stands in for one.
- Offer Redeem is UI only: the barcode value is hard-coded and points are not deducted.
- Expired offers are hidden while each row renders. If all offers are expired, the user sees an empty list.
- The barcode library is mocked in tests for the same reason.
- invalid expired dates are treated as available offers.
- With more time:
  - Real API client with caching (e.g. React Query).
  - Real redeem flow: generate a code, deduct points, track redeemed offers.
  - Filter expired offers before rendering and show the empty state when none are left.
  - No member found means no offers as well. This case should be implemented.
  - Accessibility labels and testIDs on interactive elements (e.g. the modal backdrop).
  - Error tracking (Sentry) and end-to-end tests (Detox or Maestro).
  - Add unit tests for all files. eg: Components

5. AI TOOLS
- Used it to write the unit tests.
- Reviewed and trimmed the generated tests (e.g. naming style, removing cases that weren't needed).
- Used it to mock API delay.
- Used it to mock data (Member, Offers).
- Used it to fix issues (eg: failing tests, linting issues etc).


Please note: React Native is not upgraded and is running on 0.76 in this environment.