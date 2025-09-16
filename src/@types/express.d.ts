import { UserDoc } from "../models/users";

declare global {
  namespace Express {
    interface Request {
      user?: UserDoc;
    }
  }
}
