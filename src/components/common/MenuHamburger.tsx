import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { fetchBasic } from "../../helpers/fetch";
import { RootState } from "../../store";
import { setCityData } from "../../store/city";
interface iProps {
  closeHamburger: () => void;
  hamburgerVisible: {};
  styleBoxMenu: {};
}
export const MenuHamburger = ({
  closeHamburger,
  hamburgerVisible,
  styleBoxMenu,
}: iProps) => {
  const cities = useSelector((st: RootState) => st.cities.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const locationByPlace = async (placeSearch: { city: string }) => {
    try {
      closeHamburger();
      const res = await fetchBasic("/current", {
        params: placeSearch,
      });
      if (res) {
        dispatch(setCityData(res));
      } else {
        console.log("Lugar no encontrado");
        /* El texto 404 debo hacerlo como hooks global asi lo muestro en home */
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onClick = (element: any) => {
    
    navigate(`/city/${element.target.id}`, {
      state: { id: element.target.id, name: element.target.innerText },
    });
  };
  return (
    <div className={`${"menuHamburger"}`} style={hamburgerVisible}>
      <div style={hamburgerVisible && styleBoxMenu} className={`${"boxMenu"}`}>
        <div className={`${"boxMenuTitle"}`} onAuxClick={closeHamburger}>
          <NavLink to={"/"}>
            <a className={"logo1"}></a>
          </NavLink>
          <p>Clima</p>
          <button
            className={`${"buttonClose"}`}
            onClick={closeHamburger}
          ></button>
        </div>
        <div>
          <Formik
            initialValues={{ city: "" }}
            onSubmit={(values) => {
              locationByPlace(values);
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
                  style={{ width: "100%" }}
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
          <ul className={`${"boxMenuList"}`}>
            {cities &&
              cities?.map((city) => (
                <li
                  key={city.data.id}
                  id={city.data.id}
                  /* onClick={() =>
                    navigate(
                      `/${document.getElementById(`cod-${index}`).key}`
                    )
                    console.log(this.element.id)
                  } */
                  onClick={onClick}
                >
                  {city.data.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MenuHamburger;
