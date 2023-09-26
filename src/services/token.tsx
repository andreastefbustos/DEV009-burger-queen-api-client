export function checkUnauthorize(response: Response): boolean {
  if (response.status == 401) {
    localStorage.removeItem("token")
    return true
  }

  return false
}




