import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'design_handoff_terminal_portfolio/**'],
  },
];

export default eslintConfig;
