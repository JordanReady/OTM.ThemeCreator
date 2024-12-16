module.exports = {
  experimental: {
    forceSwcTransforms: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(js|mjs)$/,
      include: /node_modules\/undici/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["next/babel"],
          plugins: ["@babel/plugin-proposal-private-methods"],
        },
      },
    });
    return config;
  },
};
