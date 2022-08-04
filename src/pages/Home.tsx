import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/common/Header";
import { fetchBasic } from "../helpers/fetch";
import { setCityData } from "../store/city";
import { Formik, Form, Field, ErrorMessage, FormikState } from "formik";
import * as Yup from "yup";
import FavoriteSVG from "../components/common/Favorite";
import Footer from "../components/common/Footer";
import { Link } from "react-router-dom";
import { RootState } from "../store";

const Home = () => {
  const [useIcon, setIcon] = useState("01d");
  const [useText404, setText404] = useState("");
  const dispatch = useDispatch();
  const city = useSelector((st: RootState) => st.city.data);
  const locationByIP = async () => {
    try {
      const res = await fetchBasic("/location");
      console.log(res);
      dispatch(setCityData(res));
      setIcon(res?.weather[0]?.icon);
    } catch (error) {
      console.log(error);
    }
  };
  const locationByPlace = async (
    placeSearch: { city: string },
    resetForm: (
      nextState?:
        | Partial<
            FormikState<{
              city: string;
            }>
          >
        | undefined
    ) => void
  ) => {
    try {
      const res = await fetchBasic("/current", {
        params: placeSearch,
      });
      if (res) {
        dispatch(setCityData(res));
        setIcon(res?.weather[0]?.icon);
      } else {
        console.log("Lugar no encontrado");
        /* Esto deberia ser una ventana de error que se muestre al cliente */
        setText404("Lugar no encontrado! :(");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const search = (
    data: { city: string },
    resetForm: (
      nextState?:
        | Partial<
            FormikState<{
              city: string;
            }>
          >
        | undefined
    ) => void
  ) => {
    console.log(data);
    locationByPlace(data, resetForm);
    console.log("Buscando...");
  };

  useEffect(() => {
    locationByIP();
  }, []);
  return (
    <div className="home">
      <Header />
      <h1 className="text-center mt-5 title fw-bold">
        Bienvenido a Telecom Clima
      </h1>
      <div className="d-flex justify-content-center mt-5">
        <Formik
          initialValues={{ city: "" }}
          onSubmit={(values, { resetForm }) => {
            search(values, resetForm);
            //resetForm();
          }}
          validationSchema={Yup.object({
            city: Yup.string().required("Requerido"),
          })}
        >
          <Form className={"formSearch"}>
            <div>
              <Field
                type="text"
                className={`${"locationInput"}`}
                placeholder="Ingresa una ubicación..."
                name="city"
              />
              <div className="text-center">
                <ErrorMessage name="city" component={"span"} />
              </div>
            </div>
            <button className={"buttonSearch"} type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#ffffff"
              >
                <path
                  id="search_icon"
                  fillRule="evenodd"
                  d="M10.474,15.955 C7.452,15.955 4.993,13.496 4.993,10.474 C4.993,7.452 7.452,4.993 10.474,4.993 C13.496,4.993 15.955,7.452 15.955,10.474 C15.955,13.496 13.496,15.955 10.474,15.955 M20.691,19.282 L16.411,15.002 C17.371,13.744 17.948,12.178 17.948,10.474 C17.948,6.346 14.601,3 10.474,3 C6.346,3 3,6.346 3,10.474 C3,14.601 6.346,17.948 10.474,17.948 C12.178,17.948 13.744,17.371 15.002,16.411 L19.282,20.691 C19.672,21.081 20.303,21.081 20.691,20.691 C21.081,20.303 21.081,19.672 20.691,19.282"
                />
              </svg>
            </button>
          </Form>
        </Formik>
      </div>

      <div className="d-flex justify-content-center mt-4 favoriteContent">
        <Link to={""} id="iconLocation" />
        <p className="ms-2">{`Actualmente en ${city?.name}`}</p>
        {/* Icono de favorito */}
        {city?.name ? <FavoriteSVG /> : <></>}
      </div>
      {/* Lo debo hacer compónente y con un parametro opcional que sean los dias. En este caso NO */}
      <div className="d-flex justify-content-center">
        <div className="containerCard ">
          <img
            src={`http://openweathermap.org/img/wn/${useIcon}@2x.png`}
            alt="."
          />
          <div className="ms-3">
            <h4 className="fw-bold text-center">T {city.main?.temp}°C</h4>
            <div className="d-flex">
              <label>Maxima: </label>
              <p className="ms-2">{city.main?.temp_max}°C</p>
            </div>
            <div className="d-flex">
              <label>Minima: </label>
              <p className="ms-2">{city.main?.temp_min}°C</p>
            </div>
            <div className="d-flex">
              <label>Humedad del: </label>
              <p className="ms-2">{city.main?.humidity}%</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
