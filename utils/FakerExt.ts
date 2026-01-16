export async function getFaker() {
  const { faker } = await import("@faker-js/faker");
  return faker;
}
