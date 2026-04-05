/**
 * Access levels:
 * Admin: Full Access
 * Analyst: Read records, Read dashboards
 * Viewer: Read dashboards ONLY
 */

const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Your role (${req.user.role}) does not have permission to perform this action. Required roles: [${roles}]`
      });
    }

    next();
  };
};

module.exports = authorize;
