// middleware/automationBypass.js
const automationBypass = (req, res, next) => {
  const secret = req.headers["x-vercel-secret"]; // or however you plan to send it

  if (!secret || secret !== process.env.VERCEL_AUTOMATION_BYPASS_SECRET) {
    return res.status(403).json({
      success: false,
      message: "Forbidden: Invalid automation bypass secret",
    });
  }

  next();
};

module.exports = automationBypass;
