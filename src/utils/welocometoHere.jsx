import { Link, useLocation } from 'react-router-dom';

export default function WelocomeToHere({children,...props}) {
    let location = useLocation();
    const target = encodeURIComponent(location.pathname);
  return (
    <Link to={`/welcome?n=${target}`} {...props}>{children}</Link>
  )
}