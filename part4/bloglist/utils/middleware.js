const logger = require("../utils/logger");

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  console.log(authorization);
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).send({ error: "invalid token" });
  }

  next(error);
};

module.exports = {
  errorHandler,
  tokenExtractor
};
