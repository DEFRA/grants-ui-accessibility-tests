import { initialiseAccessibilityChecking, analyseAccessibility, generateAccessibilityReports } from '../accessibility-checking.js'
import { continueJourney, ensureUrl, loginIfRequired, navigateBack, selectRadio, startJourney, submitApplication } from '../journey-actions.js'

describe('example-grant', () => {
  it('should analyse accessibility on all example-grant pages', async () => {
    await initialiseAccessibilityChecking()

    await browser.url('/example-grant/start')
    await loginIfRequired()

    // start
    await ensureUrl('start')
    await analyseAccessibility()
    await startJourney()

    // are-you-in-england
    await ensureUrl('are-you-in-england')
    await analyseAccessibility()
    await selectRadio('No')
    await continueJourney()

    // you-must-be-in-england
    await ensureUrl('you-must-be-in-england')
    await analyseAccessibility()
    await navigateBack()

    // are-you-in-england
    await ensureUrl('are-you-in-england')
    await selectRadio('Yes')
    await continueJourney()

    // what-is-your-business
    await ensureUrl('what-is-your-business')
    await analyseAccessibility()
    await selectRadio('A grower or producer of agricultural or horticultural produce'),
    await continueJourney()

    // summary
    await ensureUrl('summary')
    await analyseAccessibility()
    await submitApplication()

    // status
    await ensureUrl('status')
    await analyseAccessibility()

    generateAccessibilityReports('example-grant')
  });
});
