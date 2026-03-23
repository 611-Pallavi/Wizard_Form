export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
const apiUrlStates = import.meta.env.VITE_API_URL;
const apiUrlCountry = import.meta.env.VITE_API_URL_COUNTRY

console.log(apiUrlCountry);
export const fetchCountries = async () => {
  const res = await fetch(
    apiUrlCountry
  );

  const data = await res.json();

  return data.data.map((c: any) => c.name);
};

export const fetchStatesByCountry = async (
  country: string
) => {
  if (!country) return [];

  const res = await fetch(apiUrlStates, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      country,
    }),
  });

  const data = await res.json();

  return data.data.states.map((s: any) => s.name);
};