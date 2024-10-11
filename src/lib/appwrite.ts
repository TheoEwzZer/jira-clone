import "server-only";

import { Account, Client } from "node-appwrite";

export async function createAdminClient(): Promise<{
  readonly account: Account;
}> {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APP_APPWRITE_KEY!);

  return {
    get account(): Account {
      return new Account(client);
    },
  };
}
