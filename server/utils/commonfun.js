exports.CalculateNextUrl = (req, page, limit, total) => {
  let nextUrl = null;
  if (page * limit < total) {
    const queryParams = { ...req.query, page: Number(page) + 1, limit };
    nextUrl = `${req.baseUrl}${req.path}?${new URLSearchParams(queryParams)}`;
  }

  return nextUrl;
};

/**
 * Sends a response with the given status, message, and data.
 *
 * @param {Object} res - the response object
 * @param {number} status - the status code
 * @param {string} message - the message to send
 * @param {any} data - the data to send
 * @return {void}
 */
module.exports.SendSuccessResponse = (res, status, message, data) => {
  res.status(status).send({
    status: status,
    message: message,
    data: data,
  });
};

/**
 * Sends an error response with the given status and error message.
 *
 * @param {Object} res - The response object
 * @param {number} status - The status code of the response
 * @param {string} error - The error message
 * @return {void}
 */
module.exports.SendErrorResponse = (res, status, error) => {
  let message = "Internal Server Error";

  switch (status) {
    case 400:
      message = "Bad Request: Missing or invalid parameters";
      break;
    case 401:
      message = "Unauthorized: Access denied";
      break;
    case 403:
      message = "Forbidden: You don't have permission to access this resource";
      break;
    case 404:
      message = "Not Found: The requested resource was not found";
      break;
    case 409:
      message =
        "Conflict: The requested resource already exists or is in a conflicting state.";
      break;
    case 500:
      message = "Internal Server Error: Something went wrong on the server";
      break;

    default:
      break;
  }

  res.status(status).send({
    status: status,
    message: message,
    error: error,
  });
};