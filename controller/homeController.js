const BigPromise = require("../middleware/bigPromise");
exports.home = (req, res) => {
  res.status(200).json({
    success: true,
    greeting: "Hello from API",
  });
};

exports.homeDummay = async (req, res) => {
  res.status(200).json({
    success: true,
    greeting: "Hello form home dummay controller",
  });
};
