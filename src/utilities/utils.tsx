export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function getFormData(request: Request) {
  return Object.fromEntries(await request.formData());
}
