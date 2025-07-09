import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { checkIfUserRequestingAdmin3 } from '../../../../helpers/checkIfRequestedUserAdmin';
import { validateMissing } from '../../../../helpers_v2/validate-missing/validateMissing';
import { RestorationApplicationModel } from '../model/RestorationApplication.model';
import { UserModel } from '../../auth_v2/model/user.model';

export const assignTeamToRestorationController = myControllerHandler(
  async (req, res) => {
    validateMissing(
      [
        { name: 'restoration_id', naturalName: 'Restoration Id' },
        { name: 'team_id', naturalName: 'Team Id' },
      ],
      req.body
    );
    await checkIfUserRequestingAdmin3(req);
    const { restoration_id, team_id } = req.body;

    const restorationApplicationData =
      await RestorationApplicationModel.findOne({ id: restoration_id });
    if (!restorationApplicationData) {
      throw new Error(
        'restoration application does not exist with this restoration id'
      );
    }
    const teamData = await UserModel.findOne({ id: team_id, role: 'team' });
    if (!teamData) {
      throw new Error('team does not exist with this team id');
    }

    restorationApplicationData.assignedTeamId = teamData.id;
    restorationApplicationData.status = 'assigned';
    await restorationApplicationData.save();

    const myResponse = {
      message: 'Team Assigned Successful.',
      success: true,
      data: {
        data: restorationApplicationData,
      },
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
