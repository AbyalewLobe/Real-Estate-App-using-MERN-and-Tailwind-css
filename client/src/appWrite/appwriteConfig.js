import { Client, Account, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67d6b7f6000819140036");

const account = new Account(client);
const storage = new Storage(client);

export { client, account, storage };
