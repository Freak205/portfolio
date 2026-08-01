import next from "eslint-config-next";

/** eslint-config-next 16 ships a flat config array — no FlatCompat needed. */
const eslintConfig = [
  ...next,
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
