import app from "./src/app.js"
import dbconnect from "./src/config/dbconfig.js";
import { testAi } from "./src/services/ai.service.js";

dbconnect();
 

const port = process.env.PORT || 3000;
testAi()
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})