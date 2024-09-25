import jwtTokenChecking from "../common/utils.js";
import { messageHandler, responseHandler } from "../common/messageHandler.js";
import { errorMessages } from "../constants/responseMessages.constants.js";
import { errorStatusCodes } from "../constants/responseStatus.constants.js";

const { verifyToken } = jwtTokenChecking;
const { jwtInvalid, unauthenticatedJwtToken } = errorMessages;
const { unauthorized } = errorStatusCodes;

const ENTERJWTTOKEN = new messageHandler(unauthorized, unauthenticatedJwtToken);
const JWTINVALID = new messageHandler(unauthorized, jwtInvalid);

export const authenticateJwtToken = async (req, res, next) => {
  try {
    const header = req?.headers["authorization"];
    if (!header) {
      res
        .status(ENTERJWTTOKEN.statusCode)
        .send(new responseHandler(null, ENTERJWTTOKEN));
    } else {
      const result = await verifyToken(header);
      
      if (!result.success) {
        res
          .status(JWTINVALID.statusCode)
          .send(new responseHandler(null, JWTINVALID));
      } else {
        res.locals = result.data;
        next();
      }
    }
  } catch (error) {
    throw error;
  }
};
