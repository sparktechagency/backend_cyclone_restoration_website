export type Role = 'admin' | 'technician' | 'company';

const allRoles: Record<Role, string[]> = {
  admin: ['admin', 'common'],
  technician: ['technician', 'common'],
  company: ['company', 'common'],
};

const roles = Object.keys(allRoles) as Array<keyof typeof allRoles>;

// Map the roles to their corresponding rights
const roleRights = new Map<Role, string[]>(
  Object.entries(allRoles) as [Role, string[]][]
);

export { roles, roleRights };
