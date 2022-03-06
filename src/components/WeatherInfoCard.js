import React from "react";
import {
  Alert,
  CCard,
  CCardBody,
  CContainer,
  CCardSubtitle,
  CCardTitle,
  CCardText,
  CButton,
  CImage,
} from "@coreui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const WeatherInfoCard = ({ data, by_key }) => {
  
  const path = (by_key.DailyForecasts[0].Day.IconPhrase.replace("/", "")).toLowerCase()+".png";
  const tryRequire = (path) => {
    try {
     return require(`../assets/images/${path}`);
    } catch (err) {
     return require("../assets/images/template.png");;
    }
  };
  var image_url = tryRequire(path);

  const tem = ((by_key.DailyForecasts[0].Temperature.Minimum.Value - 32) / 1.8).toFixed(0);

  return (
    <CContainer fluid>
      <CCard style={{ width: "18rem" }}>
        <CCardBody>
          <CCardTitle className="h1" size="9xl">
            {data.LocalizedName}
            <CButton
              className="mb-3"
              size="sm"
              color="warning"
              shape="rounded-pill"
            >
              {data.Country.ID}
            </CButton>
          </CCardTitle>
          <div className="row text-medium-emphasis">
              <div className="column xxl">{tem}</div>
              <div className="column2 sm">0</div>
              <div className="column xl">c</div>
            </div>
          <CImage fluid src={image_url} />
          <CCardSubtitle className="mb-2 text-medium-emphasis">
            {by_key.DailyForecasts[0].Day.IconPhrase}
          </CCardSubtitle>
          <CCardText>{by_key.Headline.Text}</CCardText>
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default WeatherInfoCard;
