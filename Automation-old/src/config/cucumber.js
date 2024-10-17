module.exports = {
  default: {
    tags: process.env.npm_config_TAGS || "@ghubci",
    bwsr: process.env.npm_config_BWSR || "chrome",
    env: process.env.npm_config_ENV || "local",
    formatOptions: {
      snippetInterface: "async-await",
    },
    paths: ["src/test/features/**/*.feature"],
    dryRun: false,
    require: ["src/test/steps/**/*.ts"],
    requireModule: ["ts-node/register"],
    colors: true,
    timeout: 300000,
    globalTimeout: 300000,
  },
};
