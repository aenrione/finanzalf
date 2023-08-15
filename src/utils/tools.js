export const generateColors = (n) => {
  const saturation = 90; // keep it high to get bright colors
  const lightness = 60;  // a value around 50-70 should work well
  const colors = [];

  for (let i = 0; i < n; i++) {
    const hue = Math.floor(360 * i / n);
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }

  return colors;
}

export const generateColor = (n, i) => {
  const saturation = 90; // keep it high to get bright colors
  const lightness = 60;  // a value around 50-70 should work well
  const hue = Math.floor(360 * i / n);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}


