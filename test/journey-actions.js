import Backend from './backend'

export async function clearStorageForSbiAndGrant(sbi, grantCode) {
  await Backend.deleteState(sbi, grantCode)
}

export async function confirmAndSend() {
    await $(`//button[contains(text(),'Confirm and send')]`).click()
}

export async function continueJourney() {
    await $(`aria/Continue`).click()
}

export async function ensureUrl(url) {
    await expect(browser).toHaveUrl(expect.stringContaining(url))
}

export async function enterValueFor(text, label) {
    const selector = `//label[contains(text(),'${label}')]/following::*[name()='input' or name()='select'][1]`
    const tag = await $(selector).getTagName()
    if (tag === 'select') {
        await $(selector).selectByVisibleText(text)
    } else {
        await $(selector).setValue(text)
    }
}

export async function loginAsCrn(crn) {
    await $(`//input[@id='crn']`).setValue(crn)
    await $(`//input[@id='password']`).setValue(process.env.DEFRA_ID_USER_PASSWORD)
    await $(`//button[@type='submit']`).click()
}

export async function navigateBack() {
    await $(`//a[@class='govuk-back-link']`).click()
}

export async function selectCheckboxes(...options) {
    await Promise.all(
        await $$(`//input[@type='checkbox' and @checked]`)
            .map(async (e) => await e.click())
    )

    for (let option of options) {
        await $(`aria/${option}`).click()
    }
}

export async function selectRadio(option) {
    await $(`aria/${option}`).click()
}

export async function setAutocompleteField(label, value) {
    const inputSelector = $(`//label[contains(text(),'${label}')]/following::input[@type='text']`)
    const optionSelector = $(`//label[contains(text(),'${label}')]/following::ul/li[text()='${value}']`)

    await inputSelector.click()
    await browser.keys('Backspace')
    await inputSelector.click()
    await browser.keys(value.split(''))
    await optionSelector.click()
}

export async function setDatePartsField(id, date) {
    const daySelector = $(`//input[@id='${id}__day']`)
    const monthSelector = $(`//input[@id='${id}__month']`)
    const yearSelector = $(`//input[@id='${id}__year']`)

    await daySelector.setValue(date.getUTCDate())
    await monthSelector.setValue(date.getUTCMonth() + 1)
    await yearSelector.setValue(date.getUTCFullYear())
}

export async function setMonthYearField(id, month, year) {
    const monthSelector = $(`//input[@id='${id}__month']`)
    const yearSelector = $(`//input[@id='${id}__year']`)

    await monthSelector.setValue(month)
    await yearSelector.setValue(year)
}

export async function setTextarea(id, value) {
    await $(`//textarea[@id='${id}']`).setValue(value)
}

export async function startJourney() {
    await $(`aria/Start now`).click()
}

export async function selectTask(taskName) {
    await $(`//h2[@class='govuk-heading-m']/following-sibling::ul/li/div/a[contains(text(),'${taskName}')]`).click()
}

export async function submitApplication() {
    await $(`aria/Send`).click()
}
