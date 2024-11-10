module.exports = {
  default: {
    tags: process.env.npm_config_TAGS || "@smoke",
    bwsr: process.env.npm_config_BWSR || "chrome",
    env: process.env.npm_config_ENV || "local",
    apps: process.env.npm_config_APPS || "BlackBoard",
    formatOptions: { snippetInterface: "async-await" },
    paths: ["src/test/features/**/*.feature"],
    dryRun: false,
    require: ["src/test/steps/**/*.ts", "src/hooks/*.ts"],
    requireModule: ["ts-node/register"],
    format: [
      "html:test-result/reports/cucumber_report.html",
      "json:test-result/reports/cucumber_report.json",
    ],
    timeout: 100000,
    globalTimeout: 100000,
  },
};
