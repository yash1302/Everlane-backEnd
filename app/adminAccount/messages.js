import { messageHandler } from "../../common/messageHandler.js";
import {
  errorMessages,
  successMessages,
} from "../../constants/responseMessages.constants.js";
import {
  errorStatusCodes,
  successStatusCodes,
} from "../../constants/responseStatus.constants.js";
const { created } = successStatusCodes;
const { createdMessage } = successMessages;
const {
  notFoundMessage,
  conflictMessage,
  unauthorizedMessage,
  resourceNotFoundMessage,
} = errorMessages;
const { notFound, conflict, unauthorized } = errorStatusCodes;

export const adminAccountMessages = {
  SIGNUPSUCCESS: new messageHandler(created, createdMessage),
  LOGINFAILURE: new messageHandler(notFound, notFoundMessage),
  ADMINPRESENT: new messageHandler(conflict, conflictMessage),
  UNAUTHORIZED: new messageHandler(unauthorized, unauthorizedMessage),
  PRODUCTNOTFOUND: new messageHandler(notFound, resourceNotFoundMessage),
};
