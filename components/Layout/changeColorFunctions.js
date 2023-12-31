import tinycolor from "tinycolor2";

// I find this functions, i write it not self

//-----------------------------COMPLEMENTARY COLOR FUNCTION------------------------------

export function getComplementaryColor(color) {
  const hex = color.slice(1);
  // console.log(color);
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const complementaryR = 255 - r;
  const complementaryG = 255 - g;
  const complementaryB = 255 - b;
  const complementaryHex = `#${complementaryR
    .toString(16)
    .padStart(2, "0")}${complementaryG
    .toString(16)
    .padStart(2, "0")}${complementaryB.toString(16).padStart(2, "0")}`;
  return complementaryHex;
}

export function getSecondaryColor(color) {
  const hex = color.slice(1);
  // console.log(color);
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  const shift = 180;

  const hsl = rgbToHsl(r, g, b);

  const shiftedHue = (hsl.h + shift) % 360;

  const shiftedRgb = hslToRgb(shiftedHue, hsl.s, hsl.l);

  const shiftedHex = `#${shiftedRgb.r
    .toString(16)
    .padStart(2, "0")}${shiftedRgb.g
    .toString(16)
    .padStart(2, "0")}${shiftedRgb.b.toString(16).padStart(2, "0")}`;

  return shiftedHex;
}

const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h, s, l;

  l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

const hslToRgb = (h, s, l) => {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
};

//-----------------------------LIGHTEN COLOR FUNCTION------------------------------

export function getLightenColor(color, amount) {
  const hsl = tinycolor(color).toHsl();

  const newLightness = Math.min(hsl.l + amount, 1);

  const newColor = tinycolor({ ...hsl, l: newLightness }).toHexString();

  return newColor;
}

//-----------------------------ANALOGOUS COLOR FUNCTION------------------------------

export function getAnalogousColor(color) {
  const angle = 30;

  const hsl = tinycolor(color).toHsl();

  const newHue = (hsl.h + angle) % 360;
  const newColor = tinycolor({ ...hsl, h: newHue }).toHexString();

  return newColor;
}

//--------------

// export function getSecondaryColorLuminosity1(color) {
//   const hex = color.slice(1);
//   console.log("hex", hex);
//   const r = parseInt(hex.substr(0, 2), 16);
//   const g = parseInt(hex.substr(2, 2), 16);
//   const b = parseInt(hex.substr(4, 2), 16);

//   const shift = 180;

//   const hsl = rgbToHsl(r, g, b);
//   console.log("hsl", hsl);

//   console.log("hsl.l", hsl.l);

//   // Ajustar la luminosidad del color secundario
//   let adjustedLuminosity;

//   if (hsl.l > 25 && hsl.l < 55 && hsl.s > 50 && hsl.s < 55) {
//     // Realizar el cálculo de ajuste para este rango
//     adjustedLuminosity = hsl.l;

//     const shiftedHue = (hsl.h + shift) % 360;

//     const shiftedRgb = hslToRgb(shiftedHue, hsl.s, adjustedLuminosity);

//     const shiftedHex = `#${shiftedRgb.r
//       .toString(16)
//       .padStart(2, "0")}${shiftedRgb.g
//       .toString(16)
//       .padStart(2, "0")}${shiftedRgb.b.toString(16).padStart(2, "0")}`;

//     return shiftedHex;
//   } else if (hsl.l < 25) {
//     // Devolver un color amarillo claro
//     return "#FFFF99"; // Puedes ajustar este valor según tus preferencias
//   } else {
//     // Devolver un color naranja oscuro
//     return "#FF8C00"; // Puedes ajustar este valor según tus preferencias
//   }
// }

// export function getSecondaryColorLuminosity(hexColor) {
//   // Convert hex color to HSL using tinycolor
//   const hslColor = tinycolor(hexColor).toHsl();

//   // Calculate the complementary color
//   const hslComplementary = {
//     h: (hslColor.h + 180) % 360, // Add 180 to hue
//     s: Math.round(100 - hslColor.s), // Invert saturation
//     l: Math.round(100 - hslColor.l) / 100, // Invert luminosity
//   };

//   console.log("comp", hslComplementary);

//   // Convert HSL complementary color to hex
//   const hexComplementary = tinycolor(hslComplementary).toHexString();

//   return hexComplementary;
// }
