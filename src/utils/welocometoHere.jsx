import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function WelocomeToHere({children}) {
    let location = useLocation();
    const target = encodeURIComponent(location.pathname);
  return (
    <Link to={`/welcome?n=${target}`}>{children}</Link>
  )
}
