export class Util {
  randomNum(min: number, max: number, decimals = 0): number {
    const num = Math.random() * (max - min) + min;
    if (decimals === 0) return Math.floor(num);
    if (decimals < 0) return num;
    return parseFloat(num.toFixed(decimals));
  }
}