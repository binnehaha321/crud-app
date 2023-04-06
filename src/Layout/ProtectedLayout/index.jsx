import { Navigate } from 'react-router'
import { getToken } from '~/utils/request'

const ProtectedLayout = ({ children }) => {
  const auth = getToken();

  return (
    <div>
      {auth ? children : <Navigate to={"/sign-in"} replace={true} />}
    </div>
  )
}

export default ProtectedLayout