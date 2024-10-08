//Kollar ifall ens input är en valid (en siffra).
export function validateInput(
  input: string,
  min: number,
  max: number
): number | null {
  const parsed = parseInt(input, 10);
  return isNaN(parsed) || parsed < min || parsed > max ? null : parsed;
}
