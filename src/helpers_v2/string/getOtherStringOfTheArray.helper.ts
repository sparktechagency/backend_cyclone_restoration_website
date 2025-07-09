export const getOtherString = (
  users: string[],
  currentUser: string
): string => {
  return users[0] === currentUser ? users[1] : users[0];
};
