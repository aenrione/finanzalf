import { Colors } from 'src/styles';
//Format Currencies
export const curStyle = (amount) => {
  if (!amount) { return { color: Colors.WHITE } }
  let result = amount >= 0 ? { color: Colors.SUCCESS } : { color: Colors.ALERT }
  return result
};

export const formatCurrency = (amount, currency) => {
  let locale;
  let calcAmount = amount ? amount : 0;

  switch (currency) {
    case 'USD':
      locale = 'en-US'; // Use 'en-US' for US Dollar
      break;
    case 'EUR':
      locale = 'en-GB'; // Use 'en-GB' for Euro (Europe)
      break;
    case 'CLP':
      locale = 'es-CL'; // Use 'es-CL' for Chilean Peso (CLP)
      break;
    case 'BTC':
      locale = 'en-US'; // Use 'en-US' for Bitcoin (BTC)
      break;
    default:
      locale = undefined; // Use default locale for other currencies
  }

  return calcAmount.toLocaleString(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: currency === 'CLP' ? 0 : 2,
    maximumFractionDigits: currency === 'BTC' ? 8 : 2, // Adjust for Bitcoin (BTC)
  });
};
// App Currencies
export const currencies = [
  {
    name: 'Dollar',
    symbol: '$',
    code: 'USD'
  },
  {
    name: 'Euro',
    symbol: '€',
    code: 'EUR'
  },
  {
    name: 'Bitcoin',
    symbol: '₿',
    code: 'BTC'
  },
  {
    name: 'Chilean Peso',
    symbol: '$',
    code: 'CLP'
  },
]

