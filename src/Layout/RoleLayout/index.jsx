import Forbidden from '~/Pages/Forbidden/Forbidden';
import { getRole } from '~/utils/request';

const RoleLayout = ({ children }) => {
  const admin = getRole();
  console.log(admin);

  return (
    <div>
      {admin ? children : <Forbidden />}
    </div>
  )
}

export default RoleLayout