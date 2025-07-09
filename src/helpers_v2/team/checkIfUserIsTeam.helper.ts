import { UserType } from '../../app/modules/auth_v2/model/user.model';

export const checkIfUserIsTeam = (userData: UserType) => {
  if (userData.role !== 'team') {
    throw new Error('requested user is not team, invalid user');
  }
};
