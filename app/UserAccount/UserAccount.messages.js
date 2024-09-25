import { messageHandler } from "../../common/messageHandler.js";
import {
  successMessages,
  errorMessages,
} from "../../constants/responseMessages.constants.js";
import {
  successStatusCodes,
  errorStatusCodes,
} from "../../constants/responseStatus.constants.js";

const { createdMessage, userLoggedInSuccessfully } = successMessages;
const { conflictMessage, notFoundMessage,internalErrorMessage,unauthorizedMessage } = errorMessages;
const { ok, created, noContent } = successStatusCodes;
const { conflict,notFound,internalError,unauthorized } = errorStatusCodes;

export const userAccountMessages = {
  SIGNUPSUCCESS: new messageHandler(created, createdMessage),
  USERPRESENT: new messageHandler(conflict, conflictMessage),
  LOGINSUCCESS: new messageHandler(ok, userLoggedInSuccessfully),
  LOGINFAILURE: new messageHandler(notFound, notFoundMessage),
  USERDETAILSADDED : new messageHandler(created,createdMessage),
  USERDETAILSADDITIONFAILED : new messageHandler(internalError,internalErrorMessage),
  UNAUTHORIZED : new messageHandler(unauthorized,unauthorizedMessage)
};
