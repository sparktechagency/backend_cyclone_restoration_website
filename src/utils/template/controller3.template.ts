import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../controller/myControllerHandler.utils';

export const myController = myControllerHandler(async (req, res) => {
  const myResponse = {
    message: 'Fetched Successful.',
    success: true,
    data: {},
  };
  res.status(StatusCodes.OK).json(myResponse);
});
