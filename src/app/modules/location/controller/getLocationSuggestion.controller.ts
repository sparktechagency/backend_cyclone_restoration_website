import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import axios from 'axios';
import { GOOGLE_MAP_API_KEY } from '../../../../data/environmentVariables';
import sendResponse from '../../../../shared/sendResponse';

export const getLocationSuggestionController = myControllerHandler(
  async (req, res) => {
    const { search_text } = req.query;
    const googleResponse = await axios.get(
      'https://maps.googleapis.com/maps/api/place/autocomplete/json',
      {
        params: {
          input: search_text,
          key: GOOGLE_MAP_API_KEY,
        },
      }
    );

    const myPredictions = googleResponse.data.predictions;
    const arrayOfSuggestions = [] as any;

    for (let i = 0; i < myPredictions.length; i++) {
      const singleData = myPredictions[i];
      arrayOfSuggestions.push(singleData.description);
    }

    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Cyclone Restoration App fetched successful',
      data: {
        suggestions: arrayOfSuggestions,
      },
    });
  }
);
