import { UserDocument } from "../../models/user.model";

declare global {
  declare namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends UserDocument {}
  }
}
