import mongoose from "mongoose";
import app from "./app";
import { configs } from "./app/configs";
import { startEmailReplyListener } from "./app/utils/emailReplyListener";
async function main() {
  await mongoose.connect(configs.db_url!);
  app.listen(configs.port, () => {
    console.log(`Server listening on port ${configs.port}`);
  });
      // Start IMAP listener AFTER server starts
    startEmailReplyListener();

}
main().catch((err) => console.log(err));
