const { Router } = require("express");
const router = Router();

const UserAccountRoutes = require("./apis/User-Account/useraccount.route")

router.use("/user-accounts", UserAccountRoutes)

module.exports = router;