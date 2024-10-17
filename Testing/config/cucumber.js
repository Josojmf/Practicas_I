module.exports = {
  default: {
    tags: process.env.npm_config_TAGS || "@testPortaldeServicios",
    bwsr: process.env.npm_config_BWSR || "chrome",
    env: process.env.npm_config_ENV || "local",
    apps: process.env.npm_config_APPS || "portaldeServicios",
    formatOptions:{
        snippetInterface: "async-await",
    },
    paths:[
        "src/test/features/**/*.feature"
    ],
    dryRun: false,
    require:[
        "src/test/steps/**/*.ts",
        "src/hooks/hooks.ts",
    ],
    requireModule: ["ts-node/register"],
    format: [
        "html:test-result/reports/cucumber_report.html",
        "json:test-result/reports/cucumber_report.json",
    ],
    "timeout": 60000,
    "globalTimeout": 90000,
  },
};
