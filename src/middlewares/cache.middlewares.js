const NodeCache = require("node-cache");

const cache = new NodeCache();

const duration = (seconds) => (req, res, next) => {
  // Check GET request
  if (req.method !== "GET") {
    console.log("Non-GET method");
    return next(); // Call `next` to move to the next middleware or route handler
  }

  // Check if key exists in cache
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    // If key exists in cache, send the cached response
    console.log(`Cache hit for ${key}`);
    res.send(cachedResponse);
  } else {
    // If key not present, override `res.send` to cache the response
    console.log(`Cache miss for ${key}`);
    res.originalSend = res.send;
    res.send = (body) => {
      res.originalSend(body);
      cache.set(key, body, seconds);
    };
    next();
  }
};

module.exports = duration;
