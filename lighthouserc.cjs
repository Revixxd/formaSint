module.exports = {
  ci: {
    collect: {
      url: ['https://forma-sint-steel.vercel.app'],
      numberOfRuns: 1,
    },
    upload: {
      target: 'filesystem',
      outputDir: './docs/lighthouse-report',
    },
  },
};
