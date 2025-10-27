import { getBackendAuthorizationToken } from './backend-auth-helper'

class Backend {
  async deleteState(sbi, grantCode) {
    const response = await fetch(`${browser.options.baseBackendUrl}/state?sbi=${sbi}&grantCode=${grantCode}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getBackendAuthorizationToken()}`
      }
    })
    await expect(response.status === 200 || response.status === 404).toBe(true)
  }
}

export default new Backend()
