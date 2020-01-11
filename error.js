'use strict';

const notFoundHandler = (req, res) => {
  res.status(404).send("Not Found");
};

const errorHandler = (err, req, res) => {
  res.status(500).send(err.message);
}

// Export an object from this module with the key/value pairs
// being the 2 functions that we created above.
module.exports = { notFoundHandler, errorHandler }
