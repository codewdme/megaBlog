/* eslint-disable no-useless-catch */
import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    // eslint-disable-next-line no-useless-catch
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call login method;

        return this.logIn({ email, password });
      }
    } catch (e) {
      throw e;
    }
  }

  async logIn({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (e) {
      throw e;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (e) {
      console.log("Appwrite service error :: getCurrentUser :: error ", e);
    }
    return null;
  }

  async logOut() {
    try {
      this.account.deleteSessions();
    } catch (e) {
      console.log("Appwrite service error :: logout :: error ", e);
    }
  }
}

const authService = new AuthService();

export default authService;
