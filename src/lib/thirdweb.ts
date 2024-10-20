import { createThirdwebClient } from "thirdweb";
require("dotenv").config();

const client = createThirdwebClient({
  // use `secretKey` for server side or script usage
  secretKey: process.env.THIRDWEB_SECRET_KEY || "",
});
