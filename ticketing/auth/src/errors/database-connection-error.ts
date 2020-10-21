import { CustomError } from "./custom-error";
export class DataBaseConnectionError extends CustomError {
  statusCode = 400;
  constructor() {
    super("Error while connecting with database");

    Object.setPrototypeOf(this, DataBaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: "Error while connecting with database" }];
  }
}
