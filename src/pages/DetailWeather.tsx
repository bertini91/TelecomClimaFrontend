import moment from "moment";
import "moment/locale/es";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import { fetchBasic } from "../helpers/fetch";

interface iCityForecast {
  list: [
    {
      weather: [{ icon: string }];
      main: {
        temp: string;
        temp_max: string;
        temp_min: string;
        humidity: string;
      };
    }
  ];
}

const DetailWeather = () => {
  const location = useLocation();
  const state: { name: string } | any = location?.state;
  const navigate = useNavigate();
  moment.locale("es");
  const [useCityForecast, setCityForecast] = useState<iCityForecast>({
    list: [
      {
        weather: [{ icon: "" }],
        main: {
          temp: "",
          temp_max: "",
          temp_min: "",
          humidity: "",
        },
      },
    ],
  });
  const locationByPlace = async () => {
    try {
      const res = await fetchBasic("/forecast", {
        params: state.name,
      });
      if (res) {
        setCityForecast(res);
      } else {
        /* Se deberia crear una ventana emergente para mostrar el 404 */
        console.log("Lugar no encontrado");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    locationByPlace();
  }, []);
  return (
    <div className="home detailWeather">
      <Header />

      <h1 className="text-center mt-5 title fw-bold">
        {`${state.name} en los próximos 5 dias`}
      </h1>
      <div className="px-5">
        <button
          type="button"
          className="btn-return"
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            src="https://www.nicolas-bertini.com.ar/assets/e2b95feb2e859aaea8913552ca948d19.png"
            alt=""
            width={40}
            height={40}
          />
        </button>
      </div>
      <div className="d-flex">
        <div className="justify-content-center contentResult">
          {useCityForecast &&
            useCityForecast.list?.map((climate, index) => (
              <div className="contentResult_item">
                {/* Como mejora, esto debe ser un componente porque es reutilizado en Home */}
                <p className="day_name">{`${moment()
                  .add(index, "days")
                  .format("dddd")}`}</p>

                <div className="containerCard ">
                  <img
                    src={`http://openweathermap.org/img/wn/${climate?.weather[0]?.icon}@2x.png`}
                    alt="."
                  />
                  <div className="ms-3">
                    <h4 className="fw-bold text-center">
                      T {climate.main?.temp}°C
                    </h4>
                    <div className="d-flex">
                      <label>Maxima: </label>
                      <p className="ms-2">{climate.main?.temp_max}°C</p>
                    </div>
                    <div className="d-flex">
                      <label>Minima: </label>
                      <p className="ms-2">{climate.main?.temp_min}°C</p>
                    </div>
                    <div className="d-flex">
                      <label>Humedad del: </label>
                      <p className="ms-2">{climate.main?.humidity}%</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailWeather;
