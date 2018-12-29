module.exports = (api) => {
  api.cache(true);
  
  const presets = [
      "@babel/preset-env", {
        "targets": {
          "browsers": ["last 2 versions", "firefox >= 50"]
        }
      },
      "@babel/preset-react"
  ]
  
  const plugins = [];
  
  return {
    presets: [
      "@babel/preset-env",
      "@babel/preset-react"
    ]
  };
  
  /* "presets": [
    [
      "@babel/preset-env", {
        "targets": {
          "browsers": ["last 2 versions", "firefox >= 50"]
        }
      },
      "@babel/preset-react"
    ]
  ] */
}
