import("../payload.config.ts").then(async (cfg) => {
  const c = await (cfg.default?.default ? cfg.default.default : cfg.default || cfg);
  import("payload/node").then((m) => m.generateTypes(c));
});
