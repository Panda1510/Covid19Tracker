import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

function InfoBox({ title, cases, total }) {
  return (
    <Card className="infoBox">
      <CardContent>
        {/* Title */}
        <Typography color="textSecondary" className="infoBox__title">
          {title}
        </Typography>

        {/* no.of cases */}
        <h2 className="infoBox__cases">{cases}</h2>

        {/* total cases */}
        <Typography color="textSecondary" className="infoBox__total">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
