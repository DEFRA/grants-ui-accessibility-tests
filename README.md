# Grants UI Accessibility Tests

This is an automated accessibility test suite for Defra's `grants-ui` platform, maintained by the Grants Application Enablement (GAE) team.

## Overview

This test suite generates accessibility reports for:

- Non-land based grant application journeys served by `grants-ui`
- Reusable `grants-ui` components maintained by GAE

The tests do not assert but generate detailed reports of WCAG violations and recommendations for each journey. The suite uses WebdriverIO with the Defra WCAG Checker.

## Technology Stack

- **WebdriverIO** - Browser automation framework
- **Mocha** - Test framework
- **Defra WCAG Checker** - Defra accessibility testing component using Axe Core and Wave
- **Node.js** - Runtime environment

## Prerequisites

- Node.js (version as specified in package.json)
- npm (included with Node.js)
- Chrome browser
- Access to a running `grants-ui` instance

## Quick Start

**Clone and install:**

```bash
git clone https://github.com/DEFRA/grants-ui-accessibility-tests.git
cd grants-ui-accessibility-tests
npm install
```

**Configure environment:**

Copy `.env.example` to `.env` and update with your configuration values:

```bash
cp .env.example .env
```

Required environment variables:
- `DEFRA_ID_USER_PASSWORD` - Password for Defra ID authentication
- `GRANTS_UI_BACKEND_AUTH_TOKEN` - Backend authentication token
- `GRANTS_UI_BACKEND_ENCRYPTION_KEY` - Backend encryption key

**Run tests:**

```bash
# Run tests locally against localhost:3000
npm run test:local

# Run tests in portal against hosted Chrome
npm run test
```

## Test Environments

Two configuration files support different environments:

1. **Local Development** (`wdio.local.conf.js`)
   - Runs tests against localhost:3000
   - Uses local Chrome instance
   - Requires environment variables to be set

2. **CDP Portal** (`wdio.conf.js`)
   - Used for running tests in the portal
   - Uses hosted Chrome instance
   - Configured for CI/CD environments

## Project Structure

```
grants-ui-accessibility-tests/
├── test/
│   ├── specs/                    # Test specifications
│   │   ├── example-grant-with-auth.spec.js
│   │   └── example-tasklist.spec.js
│   ├── accessibility-checking.js # Accessibility testing logic
│   ├── journey-actions.js        # Reusable journey actions
│   ├── backend-auth-helper.js    # Backend authentication
│   └── backend.js                # Backend service integration
├── reports/                      # Generated accessibility reports
├── wdio.conf.js                  # Portal configuration
├── wdio.local.conf.js            # Local configuration
└── .env                          # Environment variables (not in repo)
```

## Test Journeys

The suite currently tests the following journeys:

- **example-grant-with-auth** - Full grant application journey with Defra ID authentication
- **example-tasklist** - Tasklist example journey

## Accessibility Reports

After running tests, accessibility reports are generated in the `reports/` directory. Reports detail:

- WCAG violations and their severity
- Affected HTML elements
- Recommendations for remediation

## Development Commands

```bash
# Clean reports directory
npm run clean

# Run portal tests
npm run test

# Run local tests
npm run test:local
```

## Writing New Tests

When adding new accessibility tests:

1. Create a new spec file in `test/specs/`
2. Use the pattern from existing spec files
3. Import required utilities from `accessibility-checking.js` and `journey-actions.js`
4. Structure tests to visit all pages in a journey
5. Call `analyseAccessibility()` on each page
6. Generate reports at the end with `generateAccessibilityReports()`
7. Submit a PR to the Grants Application Enablement (GAE) team

Example test structure:

```javascript
import { initialiseAccessibilityChecking, analyseAccessibility, generateAccessibilityReports } from '../accessibility-checking.js'
import { startJourney, continueJourney } from '../journey-actions.js'

describe('my-journey', () => {
  it('should analyse accessibility on all pages', async () => {
    await initialiseAccessibilityChecking()

    // Navigate and test each page
    await browser.url('/my-journey/start')
    await analyseAccessibility()
    await startJourney()

    // ... test remaining pages

    generateAccessibilityReports('my-journey')
  })
})
```

## Support & Contributing

For support or questions, contact the GAE team.

When contributing:

- Follow existing code patterns and structure
- Test locally before submitting PRs
- Ensure all pages in a journey are covered
- Document any new journey actions or utilities
- Keep accessibility reports out of version control

### Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government licence v3

#### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable
information providers in the public sector to license the use and re-use of their information under a common open
licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
