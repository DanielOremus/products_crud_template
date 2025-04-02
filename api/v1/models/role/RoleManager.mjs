import MongooseCRUDManager from "../MongooseCRUDManager.mjs"
import Role from "./Role.mjs"

class RoleManager extends MongooseCRUDManager {}

export default new RoleManager(Role)
