import { UserDoc } from "../models/users";

declare global {
    namespace Express {
      interface Request {
        user?: any; // or better, your JWT payload type
      }
    }
  }
  