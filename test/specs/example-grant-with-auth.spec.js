import { initialiseAccessibilityChecking, analyseAccessibility, generateAccessibilityReports } from '../accessibility-checking.js'
import { continueJourney, ensureUrl, enterValueFor, loginIfRequired, navigateBack, selectCheckboxes, selectRadio, setAutocompleteField, setDatePartsField, setMonthYearField, startJourney } from '../journey-actions.js'

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
    await selectCheckboxes(
      'Option two',
      'Option three'
    )
    await continueJourney()

    // number-field
    await ensureUrl('number-field')
    await enterValueFor('100000', 'Enter amount')
    await continueJourney()

    // date-parts-field
    await ensureUrl('date-parts-field')
    const date = new Date()
    date.setDate(date.getDate() + 7)
    await setDatePartsField('datePartsField', date)
    await continueJourney()

    // month-year-field
    await ensureUrl('month-year-field')
    await setMonthYearField('monthYearField', '08', '2025')
    await continueJourney()

    // select-field
    await ensureUrl('select-field')
    await enterValueFor('Option three', 'Select option')
    await continueJourney()

        // # multiline-text-field
        // Then the user should be at URL "multiline-text-field"
        // When the user enters "Lorem ipsum" for MultilineTextField "MultilineTextField Example"
        // And continues

        // # multi-field-form
        // Then the user should be at URL "multi-field-form"
        // When the user enters the following
        //     | FIELD                     | VALUE                                              |
        //     | Name                      | James Test-Farmer                                  |
        //     | Email address             | cl-defra-gae-test-applicant-email@equalexperts.com |
        //     | Mobile number             | 07777 123456                                       |
        //     | Address line 1            | Test Farm                                          |
        //     | Address line 2 (optional) | Cogenhoe                                           |
        //     | Town                      | Northampton                                        |
        //     | County (optional)         | Northamptonshire                                   |
        //     | Postcode                  | NN7 1NN                                            |
        // And continues

        // # summary
        // Then the user should be at URL "summary"
        // And should see the following answers
        //     | QUESTION         | ANSWER                                             |
        //     | Yes or No        | Yes                                                |
        //     | Country          | England                                            |
        //     | Radio option     | Option one                                         |
        //     | Checkbox options | Option two                                         |
        //     |                  | Option three                                       |
        //     | Enter amount     | 100000                                             |
        //     | Date             | 30 July 2025                                       |
        //     | Month and year   | August 2025                                        |
        //     | Select option    | Option three                                       |
        //     | Description      | Lorem ipsum                                        |
        //     | Name             | James Test-Farmer                                  |
        //     | Email address    | cl-defra-gae-test-applicant-email@equalexperts.com |
        //     | Mobile number    | 07777 123456	                                    |
        //     |Address           | Test Farm                                          |
        //     |                  | Cogenhoe                                           |
        //     |                  | Northampton                                        |
        //     |                  | Northamptonshire                                   |
        //     |                  | NN7 1NN                                            |
        // When the user chooses to change their summary answer to question "Country"

        // # autocomplete-field
        // Then the user should be at URL "autocomplete-field"
        // When the user selects "Wales" for AutocompleteField "Country"
        // And continues

        // # summary
        // Then the user should be at URL "summary"
        // And should see the following answers
        //     | QUESTION         | ANSWER                                             |
        //     | Yes or No        | Yes                                                |
        //     | Country          | Wales                                              |
        //     | Radio option     | Option one                                         |
        //     | Checkbox options | Option two                                         |
        //     |                  | Option three                                       |
        //     | Enter amount     | 100000                                             |
        //     | Date             | 30 July 2025                                       |
        //     | Month and year   | August 2025                                        |
        //     | Select option    | Option three                                       |
        //     | Description      | Lorem ipsum                                        |
        //     | Name             | James Test-Farmer                                  |
        //     | Email address    | cl-defra-gae-test-applicant-email@equalexperts.com |
        //     | Mobile number    | 07777 123456	                                    |
        //     |Address           | Test Farm                                          |
        //     |                  | Cogenhoe                                           |
        //     |                  | Northampton                                        |
        //     |                  | Northamptonshire                                   |
        //     |                  | NN7 1NN                                            |
        // When the user submits their form
        
        // # status
        // Then the user should be at URL "status"
        // And should see heading "Form submitted"

    generateAccessibilityReports('example-grant-with-auth')
  });
});
