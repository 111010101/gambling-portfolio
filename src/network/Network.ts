//TODO: IN PROGRESS

const lines: number[][] = [
  [0, 0, 0]

]
export const MockServer = {
  getWinLine(): number[] {
    return lines[Math.floor(Math.random() * lines.length)];
  }
}
