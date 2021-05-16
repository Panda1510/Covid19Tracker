import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./InfoBox.css";

function InfoBox({ title, isRed, isGrey, cases, active, total, ...props }) {
  // console.log(title)
  return (
    <Card
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      } ${isGrey && "infoBox--grey"}`}
      onClick={props.onClick}
    >
      <CardContent>
        {/* Title */}
        <Typography color="textSecondary">
          <h1 className = 'infoBox__title'>{title}</h1>
        </Typography>

        {/* no.of cases */}
        <h2
          className={`infoBox__cases ${!isRed && "infoBox__cases--green"} ${
            isGrey && "infoBox__cases--grey"
          }`}
        >
          {props.isloading ? <i className="fa fa-cog fa-spin fa-fw" /> : cases}
        </h2>

        {/* total cases */}
        <Typography color="textSecondary" className="infoBox__total">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
