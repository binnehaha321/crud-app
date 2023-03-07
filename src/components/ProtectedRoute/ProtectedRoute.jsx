// import { Route, Redirect } from "react-router-dom";

// function ProtectedRoute({ component: Component, roles, ...rest }) {
//   // const { isAuthenticated, user } = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         if (!isAuthenticated) {
//           return (
//             <Redirect
//               to={{ pathname: "/login", state: { from: props.location } }}
//             />
//           );
//         }

//         if (roles && roles.indexOf(user.role) === -1) {
//           return <Redirect to={{ pathname: "/403" }} />;
//         }

//         return <Component {...props} />;
//       }}
//     />
//   );
// }

// export default ProtectedRoute;
