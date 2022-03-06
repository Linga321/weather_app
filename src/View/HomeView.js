import React, { useState } from "react";
import {
  CAlert,
  CCol,
  CFormInput,
  CContainer,
  CButton,
  CForm,
  CRow,
  CFormFeedback,
} from "@coreui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import useAction from "../hooks/useAction";
import WeatherInfoCard from "../components/WeatherInfoCard";

function HomeView() {
  const [setLocation, reqDataByCityName, reqDataByKey, state] = useAction();
  const [visible, setVisible] = useState(false);
  const [validated, setValidated] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      console.log(" event.stopPropagation()");
    } else {
      await setLocation(form.city.value);
      if (!state) {
        setVisible(true);
      }
    }
    setValidated(true);
  };

  return (
    <CContainer fluid>
      <CRow className="mt-3">
        <CForm
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <CCol md={6}>
            <CFormInput
              type="text"
              id="city"
              defaultValue=""
              placeholder="Enter name of a city"
              aria-describedby="inputGroupPrepend"
              required
            />
            <CFormFeedback invalid>
              Please choose a valid city name.
            </CFormFeedback>
          </CCol>
          <CCol md={3}>
            <CButton color="primary" type="submit" id="basic-addon2">
              Show Weather Info
            </CButton>
          </CCol>
        </CForm>
      </CRow>
      <CRow className="mt-3">
        {state ? (
          <WeatherInfoCard data={reqDataByCityName} by_key={reqDataByKey} />
        ) : (
          visible && (
            <CCol md={6}>
              <CAlert color="danger" variant="solid">
                Please check your city name!
              </CAlert>
            </CCol>
          )
        )}
      </CRow>
    </CContainer>
  );
}

export default HomeView;
