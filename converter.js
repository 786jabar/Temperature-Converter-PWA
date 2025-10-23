const inputField = document.getElementById('input-temp');
const fromUnitField = document.getElementById('input-unit');
const toUnitField = document.getElementById('output-unit');
const outputField = document.getElementById('output-temp');
const form = document.getElementById('converter');
const swapBtn = document.getElementById('swapBtn');

function convertTemp(value, fromUnit, toUnit) {
  if (isNaN(value)) return NaN;
  if (fromUnit === toUnit) return value;
  // Celsius
  if (fromUnit === 'c') {
    if (toUnit === 'f') return value * 9 / 5 + 32;
    if (toUnit === 'k') return value + 273.15;
  }
  // Fahrenheit
  if (fromUnit === 'f') {
    if (toUnit === 'c') return (value - 32) * 5 / 9;
    if (toUnit === 'k') return (value + 459.67) * 5 / 9;
  }
  // Kelvin
  if (fromUnit === 'k') {
    if (toUnit === 'c') return value - 273.15;
    if (toUnit === 'f') return value * 9 / 5 - 459.67;
  }
  return NaN;
}

function updateOutput() {
  const v = parseFloat(inputField.value);
  const from = fromUnitField.value;
  const to = toUnitField.value;
  const out = convertTemp(v, from, to);
  if (isNaN(out)) {
    outputField.value = '—';
  } else {
    const rounded = Math.round(out * 100) / 100;
    const unitLabel = to === 'c' ? '°C' : to === 'f' ? '°F' : 'K';
    outputField.value = `${rounded} ${unitLabel}`;
  }
}

form.addEventListener('input', updateOutput);
form.addEventListener('reset', () => {
  setTimeout(updateOutput, 0);
});

swapBtn.addEventListener('click', () => {
  const from = fromUnitField.value;
  const to = toUnitField.value;
  fromUnitField.value = to;
  toUnitField.value = from;
  updateOutput();
});

// initial render
updateOutput();
