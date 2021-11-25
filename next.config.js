const withPreact = require("next-plugin-preact");
//nextjs build analyzer
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const withTM = require("next-transpile-modules")(["react-syntax-highlighter"]); // pass the modules you would like to see transpiled

module.exports = withTM(
  withBundleAnalyzer(
    withPreact({
      reactStrictMode: true,
      experimental: { esmExternals: true },
    })
  )
);
