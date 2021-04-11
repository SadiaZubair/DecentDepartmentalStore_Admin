import React from "react";
import "./Breadcrumbs.css";
import {
  Breadcrumbs as MUIBreadcrumbs,
  Link,
  Typography
} from "@material-ui/core";
import { withRouter,NavLink } from "react-router-dom";

const Breadcrumbs = props => {
  const {
    history,
    location: { pathname }
  } = props;
  const pathnames = pathname.split("/").filter(x => x);
  return (
    <MUIBreadcrumbs aria-label="breadcrumb" >
        <div className='bread'>
      {pathnames.length > 0 ? (
        <NavLink className="nav-link1" to="/" >Home</NavLink>
      ) : (
        <Typography className="nav-link1" > Home </Typography>
      )}
      </div>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
            <div className='bread' >
          <Typography className="nav-link1"  key={name}>{name}</Typography>
          </div>
        ) : (
            <div className='bread'>
          <NavLink className="nav-link1"  to={routeTo}>{name}</NavLink>
          
          </div>
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default withRouter(Breadcrumbs);
