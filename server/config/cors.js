const DEFAULT_ORIGINS = [
  "http://localhost:3000",
  "https://stisv.vercel.app",
  "https://stisv.onrender.com",
  "https://materials.iisc.ac.in",
  "https://stisv-1.onrender.com",
];

function allowedOrigins() {
  const configured = (process.env.CORS_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return new Set([...DEFAULT_ORIGINS, ...configured]);
}

function corsOptions() {
  const origins = allowedOrigins();

  return {
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    origin(origin, callback) {
      // Requests without an Origin include server-to-server calls and local tooling.
      if (!origin || origins.has(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin is not allowed by CORS"));
    },
  };
}

module.exports = { allowedOrigins, corsOptions };
