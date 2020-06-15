const Express = require("express");
const router = Express.Router();
const { validateBody, schemas } = require("../Helpers/RouteHelper");
const userController = require("../Controllers/UserController");
const verify = require("../VerifyToken");

router
  .route("/signin")
  .post(validateBody(schemas.authSchema), userController.signIn);

router
  .route("/signup")
  .post(validateBody(schemas.dataEntrySchema), userController.signUp);

router.route("/all").get(verify, userController.all);

module.exports = router;
