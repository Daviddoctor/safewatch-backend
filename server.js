const app = require("./app")

app.listen(app.get('port'), () => {
    console.log("\n==========================================================================");
    console.log(`"Server listening on port" ${app.get("port")}`);
    console.log("==========================================================================\n");
  });