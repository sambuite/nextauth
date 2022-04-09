import { useAuthContext } from '../contexts/AuthContext';
import { validateUserPermission } from '../utils/validateUserPermission';

interface UseCanProps {
  permissions?: string[];
  roles?: string[];
}

export function useCan({ permissions, roles }: UseCanProps) {
  const { user, isAuthenticated } = useAuthContext();

  if (!isAuthenticated) return false;

  const userHasValidPermissions = validateUserPermission({
    user,
    permissions,
    roles,
  });

  return userHasValidPermissions;
}
