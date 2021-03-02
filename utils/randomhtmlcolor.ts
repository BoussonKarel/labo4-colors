// @ts-nocheck
import colors from '../assets/colorData';

export const generateRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
}