import UserManager from "../api/v1/models/user/UserManager.mjs"
import JWTHelper from "../utils/JWTHelper.mjs"

export const getPermissionChecker =
  (model) => (requiredPermission) => (req, res, next) => {
    if (!req.user)
      return res.status(401).json({ success: false, msg: "Unauthorized" })

    if (!req.user?.role.permissions[model][requiredPermission])
      return res.status(403).json({ success: false, msg: "Forbidden" })
    next()
  }

export const ensureAuthenticated = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization
    const token = JWTHelper.parseBearer(bearer, req.headers)
    req.user = await UserManager.getOne({ email: token.email }, null, ["role"])
    next()
  } catch (error) {
    res.status(401).json({ success: false, msg: "Unauthorized" })
  }
}
