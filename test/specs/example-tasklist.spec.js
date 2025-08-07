import { initialiseAccessibilityChecking, analyseAccessibility, generateAccessibilityReports } from '../accessibility-checking.js'
import { continueJourney, ensureUrl, loginIfRequired, selectRadio, selectTask } from '../journey-actions.js'

describe('example-tasklist', () => {
  it('should analyse accessibility on sample example-tasklist pages', async () => {
    await initialiseAccessibilityChecking()

    await browser.url('/example-tasklist/tasklist')
    await loginIfRequired()

    // tasklist
    await ensureUrl('tasklist')
    await analyseAccessibility()
    await selectTask('Business status')

    // business-status/nature-of-business
    await ensureUrl('business-status/nature-of-business')
    await analyseAccessibility()
    // await continueJourney()
    // await analyseAccessibility('[validation]')
    await selectRadio('A grower or producer of agricultural or horticultural produce')
    await continueJourney()

    // business-status/legal-status
    await ensureUrl('business-status/legal-status')
    await analyseAccessibility()
    // await continueJourney()
    // await analyseAccessibility('[validation]')
    await selectRadio('Sole trader')
    await continueJourney()

    // business-status/country
    await ensureUrl('business-status/country')
    await analyseAccessibility()
    // await continueJourney()
    // await analyseAccessibility('[validation]')
    await selectRadio('Yes')
    await continueJourney()

    // business-status/summary
    await ensureUrl('business-status/summary')
    await analyseAccessibility()

    generateAccessibilityReports('example-tasklist')
  });
});
