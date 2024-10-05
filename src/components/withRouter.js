// withRouter.js
import { useParams, useNavigate } from 'react-router-dom';

export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let params = useParams(); // Get the route parameters
    let navigate = useNavigate(); // Get the navigate function
    return <Component {...props} params={params} navigate={navigate} />;
  }
  return ComponentWithRouterProp;
}
