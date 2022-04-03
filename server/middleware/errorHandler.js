async function errorHandler(err, req, res, next) {
  const msg = err.toString();
  console.error(msg);
  switch (err.name) {
    case "ValidationError":
      if (err.details.length > 0) {
        return res.status(400).json(err.details.map((obj) => obj.message));
      }

    case "SequelizeDatabaseError":
      return res.status(500).json({ msg });

    case "SequelizeForeignKeyConstraintError":
      return res.status(400).json({
        msg: "SequelizeForeignKeyConstraintError",
      });

    case "TypeError":
      return res.status(400).json({ msg });
  }
  res.status(500).json({ msg: "Server error, try again." });
}

module.exports.errorHandler = errorHandler;
