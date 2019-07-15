const populate = (id, config) => {
  return config.map(p => {
    const { provider, key } = p;
    if (key) {
      return provider(id[key]).catch(() => null);
    }
    return provider(id).catch(() => null);
  });
};

export { populate };
