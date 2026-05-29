export function adjustColorOpacity(hexColor, opacity) {
  const hex = hexColor.replace('#', '')
  const normalized =
    hex.length === 3
      ? hex
          .split('')
          .map((char) => char + char)
          .join('')
      : hex

  const red = parseInt(normalized.substring(0, 2), 16)
  const green = parseInt(normalized.substring(2, 4), 16)
  const blue = parseInt(normalized.substring(4, 6), 16)

  return `rgba(${red}, ${green}, ${blue}, ${opacity / 100})`
}
