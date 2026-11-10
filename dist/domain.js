const rupiah = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });
const digits = new Intl.NumberFormat('id-ID');
export const money = amount => rupiah.format(amount);
export const number = value => digits.format(value);
export const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

export function mortgage(price, downPayment, years, rate) {
  const principal = price - downPayment;
  const months = years * 12;
  const monthlyRate = rate / 1200;
  const installment = monthlyRate ? principal * monthlyRate / -Math.expm1(-months * Math.log1p(monthlyRate)) : principal / months;
  return { principal, installment, interest: Math.max(0, installment * months - principal) };
}

export function recommendations(listings, city, budget, priority) {
  const matches = listings.filter(home => (!city || home.city === city) && home.price <= budget);
  if (priority === 'balance') return matches.sort((a, b) => a.price / a.building - b.price / b.building || a.price - b.price);
  return matches.sort(priority === 'space'
    ? (a, b) => b.building - a.building || a.price - b.price
    : (a, b) => a.price - b.price);
}

export async function onDevicePick(matches, model = globalThis.LanguageModel) {
  if (!model || matches.length < 2) return null;
  const language = { type: 'text', languages: ['en'] };
  const options = { expectedInputs: [language], expectedOutputs: [language] };
  let session;
  try {
    if (await model.availability(options) !== 'available') return null;
    session = await model.create(options);
    const choices = matches.slice(0, 6).map(({ price, building, land, rooms }, index) => ({ index, price, building, land, rooms }));
    const response = await session.prompt(
      'Select the home with the best balance of affordability and usable living space for a first-time buyer. Use only these options. Return the index. ' + JSON.stringify(choices),
      { responseConstraint: { type: 'integer', minimum: 0, maximum: choices.length - 1 } },
    );
    const index = JSON.parse(response);
    return Number.isInteger(index) && index >= 0 && index < choices.length ? matches[index] : null;
  } catch {
    return null;
  } finally {
    session?.destroy();
  }
}
