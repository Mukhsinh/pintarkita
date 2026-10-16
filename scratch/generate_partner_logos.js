const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'assets', 'icons', 'partners');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const partners = [
  {
    file: 'lampung.svg',
    primary: '#0A8754',
    secondary: '#FFC107',
    icon: `<path d="M22,64 L50,16 L78,64 Z M36,64 L50,32 L64,64 Z" fill="#FFC107"/><circle cx="50" cy="50" r="8" fill="#D90429"/>`
  },
  {
    file: 'batiling.svg',
    primary: '#0052D4',
    secondary: '#10B981',
    icon: `<path d="M50,15 L80,35 L80,70 L50,85 L20,70 L20,35 Z" fill="#0052D4"/><path d="M44,35 H56 V45 H66 V57 H56 V67 H44 V57 H34 V45 H44 Z" fill="#FFFFFF"/>`
  },
  {
    file: 'kerinci.svg',
    primary: '#059669',
    secondary: '#F59E0B',
    icon: `<path d="M50,15 L85,75 L15,75 Z" fill="#059669"/><path d="M50,28 L72,70 L28,70 Z" fill="#10B981"/><path d="M50,45 L58,65 L42,65 Z" fill="#F59E0B"/>`
  },
  {
    file: 'sumut-haji.svg',
    primary: '#1E3A8A',
    secondary: '#10B981',
    icon: `<circle cx="50" cy="50" r="35" fill="#1E3A8A"/><path d="M50,25 C62,25 72,35 72,50 C72,65 62,75 50,75 C44,75 38,72 34,68 C44,65 50,56 50,50 C50,42 44,35 34,32 C38,28 44,25 50,25 Z" fill="#10B981"/><circle cx="35" cy="50" r="5" fill="#FBBF24"/>`
  },
  {
    file: 'brebes-bumiayu.svg',
    primary: '#2563EB',
    secondary: '#DC2626',
    icon: `<circle cx="50" cy="50" r="34" fill="#2563EB"/><ellipse cx="50" cy="50" rx="20" ry="26" fill="#DC2626"/><ellipse cx="50" cy="50" rx="14" ry="18" fill="#FEF3C7"/><path d="M46,38 H54 V46 H62 V54 H54 V62 H46 V54 H38 V46 H46 Z" fill="#2563EB"/>`
  },
  {
    file: 'abdya.svg',
    primary: '#047857',
    secondary: '#F59E0B',
    icon: `<path d="M50,15 C70,15 82,32 82,50 C82,72 50,85 50,85 C50,85 18,72 18,50 C18,32 30,15 50,15 Z" fill="#047857"/><path d="M50,25 L65,58 L35,58 Z" fill="#F59E0B"/><circle cx="50" cy="42" r="6" fill="#FFFFFF"/>`
  },
  {
    file: 'ngawi.svg',
    primary: '#B45309',
    secondary: '#1D4ED8',
    icon: `<path d="M50,15 L80,30 L80,68 L50,85 L20,68 L20,30 Z" fill="#1D4ED8"/><rect x="35" y="40" width="30" height="30" fill="#B45309"/><path d="M30,40 L50,25 L70,40 Z" fill="#FBBF24"/>`
  },
  {
    file: 'muaro-jambi.svg',
    primary: '#0D9488',
    secondary: '#D97706',
    icon: `<path d="M50,18 C72,18 82,35 82,55 C82,75 50,85 50,85 C50,85 18,75 18,55 C18,35 28,18 50,18 Z" fill="#0D9488"/><path d="M38,62 L50,30 L62,62 Z" fill="#D97706"/><circle cx="50" cy="42" r="5" fill="#FFFFFF"/>`
  },
  {
    file: 'tegal.svg',
    primary: '#1E40AF',
    secondary: '#10B981',
    icon: `<path d="M50,15 L82,32 L75,75 L50,85 L25,75 L18,32 Z" fill="#1E40AF"/><circle cx="50" cy="50" r="18" fill="#10B981"/><path d="M45,40 H55 V46 H61 V54 H55 V60 H45 V54 H39 V46 H45 Z" fill="#FFFFFF"/>`
  },
  {
    file: 'purbalingga.svg',
    primary: '#0369A1',
    secondary: '#E11D48',
    icon: `<path d="M50,15 L80,32 L80,70 L50,85 L20,70 L20,32 Z" fill="#0369A1"/><path d="M50,25 L70,45 L50,70 L30,45 Z" fill="#E11D48"/><circle cx="50" cy="48" r="8" fill="#FFFFFF"/>`
  },
  {
    file: 'pekalongan.svg',
    primary: '#0A3F97',
    secondary: '#FF6A00',
    icon: `<circle cx="50" cy="50" r="34" fill="#0A3F97"/><path d="M32,58 C40,40 60,40 68,58 Z" fill="#FF6A00"/><circle cx="50" cy="38" r="8" fill="#FFFFFF"/>`
  },
  {
    file: 'sungai-bahar.svg',
    primary: '#0284C7',
    secondary: '#10B981',
    icon: `<circle cx="50" cy="50" r="34" fill="#0284C7"/><path d="M44,32 H56 V44 H68 V56 H56 V68 H44 V56 H32 V44 H44 Z" fill="#10B981"/><circle cx="50" cy="50" r="6" fill="#FFFFFF"/>`
  },
  {
    file: 'sungai-penuh.svg',
    primary: '#4338CA',
    secondary: '#F59E0B',
    icon: `<path d="M50,16 L80,32 L80,72 L50,85 L20,72 L20,32 Z" fill="#4338CA"/><path d="M34,60 C42,42 58,42 66,60 Z" fill="#F59E0B"/><circle cx="50" cy="42" r="7" fill="#FFFFFF"/>`
  },
  {
    file: 'bpkp.svg',
    primary: '#0F766E',
    secondary: '#D97706',
    icon: `<circle cx="50" cy="50" r="34" fill="#0F766E" stroke="#D97706" stroke-width="3"/><path d="M35,35 L65,35 L65,50 L50,50 L65,65 L50,65 L35,50 Z" fill="#FFFFFF"/>`
  },
  {
    file: 'kemendagri.svg',
    primary: '#991B1B',
    secondary: '#FBBF24',
    icon: `<circle cx="50" cy="50" r="34" fill="#991B1B" stroke="#FBBF24" stroke-width="3"/><path d="M50,22 L72,36 L72,64 L50,78 L28,64 L28,36 Z" fill="#FBBF24"/><circle cx="50" cy="50" r="12" fill="#991B1B"/><path d="M47,44 H53 V56 H47 Z M47,38 H53 V41 H47 Z" fill="#FFFFFF"/>`
  },
  {
    file: 'kemenkes.svg',
    primary: '#0284C7',
    secondary: '#10B981',
    icon: `<circle cx="50" cy="50" r="34" fill="#0284C7" stroke="#10B981" stroke-width="3"/><path d="M45,30 H55 V45 H70 V55 H55 V70 H45 V55 H30 V45 H45 Z" fill="#FFFFFF"/>`
  }
];

partners.forEach(p => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <defs>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="100" height="100" rx="22" fill="#FFFFFF"/>
  <rect x="3" y="3" width="94" height="94" rx="19" fill="none" stroke="#E2E8F0" stroke-width="2"/>
  <g filter="url(#glow)">
    ${p.icon}
  </g>
</svg>`;
  fs.writeFileSync(path.join(targetDir, p.file), svg);
});

console.log('16 Partner SVG logos generated successfully!');
