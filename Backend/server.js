import app from "./src/app.js"
import dbconnect from "./src/config/dbconfig.js";

dbconnect();


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})