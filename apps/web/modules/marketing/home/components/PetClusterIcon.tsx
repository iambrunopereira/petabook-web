export default function PetClusterIcon(size: number) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <circle cx="75" cy="75" r="75" fill="#1100ff" stroke="#1100ff" stroke-width="2"/>
      <text x="50%" y="55%" text-anchor="middle" font-size="18" font-weight="bold" fill="black">
        ${size / 10}
      </text>
    </svg>
  `;
}