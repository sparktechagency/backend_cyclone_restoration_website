import { RestorationApplicationModel } from '../../app/modules/restoration_application/model/RestorationApplication.model';

export const getTotalNumberOfTaskOfATeam = async (teamId: string) => {
  const totalNumberOfTasks = await RestorationApplicationModel.countDocuments({
    assignedTeamId: teamId,
  });
  return totalNumberOfTasks;
};
