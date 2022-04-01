export const translateToCelsiusFormula = (degree) => Math.round((degree - 32) * 5 / 9)
export const translateToFahrenheitFormula = (degree) => Math.round(degree * 9 / 5 + 32)
export const isBrokenClouds = cloudiness => cloudiness > 50 && cloudiness < 80
