import { initialiseAccessibilityChecking, analyseAccessibility, generateAccessibilityReports } from '../accessibility-checking.js'
import { continueJourney, ensureUrl, enterValueFor, loginIfRequired, navigateBack, selectCheckboxes, selectRadio, setAutocompleteField, setDatePartsField, setMonthYearField, setTextarea, startJourney, submitApplication } from '../journey-actions.js'

describe('example-grant-with-auth', () => {
  it('should analyse accessibility on all example-grant-with-auth pages', async () => {
    await initialiseAccessibilityChecking()

    await browser.url('/example-grant-with-auth/start')
    await loginIfRequired()

    // start
    await ensureUrl('start')
    await analyseAccessibility()
    await startJourney()

    // yes-no-field
    await ensureUrl('yes-no-field')
    await analyseAccessibility()
    await selectRadio('No')
    await continueJourney()

    // terminal-page
    await ensureUrl('terminal-page')
    await analyseAccessibility()
    await navigateBack()

    // yes-no-field
    await ensureUrl('yes-no-field')
    await analyseAccessibility()
    await selectRadio('Yes')
    await continueJourney()

    // autocomplete-field
    await ensureUrl('autocomplete-field')
    await analyseAccessibility()
    await setAutocompleteField('Country', 'England')
    await continueJourney()

    // radios-field
    await ensureUrl('radios-field')
    await analyseAccessibility()
    await selectRadio('Option one')
    await continueJourney()

    // conditional-page
    await ensureUrl('conditional-page')
    await analyseAccessibility()
    await continueJourney()

    // checkboxes-field
    await ensureUrl('checkboxes-field')
    await analyseAccessibility()
    await selectCheckboxes(
      'Option two',
      'Option three'
    )
    await continueJourney()

    // number-field
    await ensureUrl('number-field')
    await analyseAccessibility()
    await enterValueFor('100000', 'Enter amount')
    await continueJourney()

    // date-parts-field
    await ensureUrl('date-parts-field')
    await analyseAccessibility()
    const date = new Date()
    date.setDate(date.getDate() + 7)
    await setDatePartsField('datePartsField', date)
    await continueJourney()

    // month-year-field
    await ensureUrl('month-year-field')
    await analyseAccessibility()
    await setMonthYearField('monthYearField', '08', '2025')
    await continueJourney()

    // select-field
    await ensureUrl('select-field')
    await analyseAccessibility()
    await enterValueFor('Option three', 'Select option')
    await continueJourney()

    // multiline-text-field
    await ensureUrl('multiline-text-field')
    await analyseAccessibility()
    await setTextarea('multilineTextField', 'Loren ipsum')
    await continueJourney()

    // multi-field-form
    await ensureUrl('multi-field-form')
    await analyseAccessibility()
    await enterValueFor('James Test-Farmer', 'Name')
    await enterValueFor('cl-defra-gae-test-applicant-email@equalexperts.com', 'Email address')
    await enterValueFor('07777 123456', 'Mobile number')
    await enterValueFor('Test Farm', 'Address line 1')
    await enterValueFor('Cogenhoe', 'Address line 2 (optional)')
    await enterValueFor('Northampton', 'Town')
    await enterValueFor('Northamptonshire', 'County (optional)')
    await enterValueFor('NN7 1NN', 'Postcode')
    await continueJourney()

    // summary
    await ensureUrl('summary')
    await analyseAccessibility()
    await submitApplication()

    // status
    await ensureUrl('status')
    await analyseAccessibility()

    generateAccessibilityReports('example-grant-with-auth')
  });
});
