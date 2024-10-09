import { useParams, useNavigate } from 'react-router-dom';
export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let params = useParams(); 
    let navigate = useNavigate();  
    return <Component {...props} params={params} navigate={navigate} />;
  }
  return ComponentWithRouterProp;
}
