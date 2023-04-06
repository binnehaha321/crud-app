import Forbidden from '~/Pages/Forbidden/Forbidden';
import { getRole } from '~/utils/request';

const RoleLayout = ({ children }) => {
  const admin = getRole();

  return (
    <div>
      {admin ? children : <Forbidden />}
    </div>
  )
}

export default RoleLayout