module.exports = {
  webpack: config => {
    const originalEntry = config.entry
    config.entry = async () => {
      const entries = await originalEntry()

      return entries
    }

    return config
  }
}
