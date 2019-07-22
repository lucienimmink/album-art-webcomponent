const populate = (id, config) => {
  return config.map(p => {
    const { provider, key } = p;
    if (key) {
      return provider(id[key]);
    }
    return provider(id);
  });
};

export { populate };
