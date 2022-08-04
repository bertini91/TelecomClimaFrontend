import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import MenuHamburger from "./MenuHamburger";

const Header = () => {
  const [clientWindowHeight, setClientWindowHeight] = useState(0);
  const [backgroundTransparacy, setBackgroundTransparacy] = useState(0);
  //const [boxShadow, setBoxShadow] = useState(0);
  const [hamburgerVisible, setHamburgerVisible] = useState({});
  const [styleBoxMenu, setStyleBoxMenu] = useState({});
  //const [widthState, setWidthState] = useState(0);
  //const { width } = useWindowDimensions();
  const hamburgerClick = () => {
    const styleVisibility: any = {
      visibility: "visible",
      position: "fixed",
      width: "100%",
      top: "0",
      height: "100%",
      background: "rgba(0, 0, 0, 0.36)",
      transition: "all 0.5s",
      overflowY: "auto",
      left: "0",
    };
    const styleBox: any = {
      left: "0",
      transition: "all .5s",
      width: "420px",
      visibility: "visible",
      height: "100%",
      zIndex: "11",
    };
    setHamburgerVisible(styleVisibility);
    setStyleBoxMenu(styleBox);
  };
  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };
  const closeHamburger = () => {
    const closeStyle: any = {
      transition: "all .5s",
      visibility: "hidden",
    };
    setHamburgerVisible(closeStyle);
    setStyleBoxMenu(closeStyle);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  useEffect(() => {
    let backgroundTransparacyVar = clientWindowHeight / 600;

    if (backgroundTransparacyVar < 1) {
      //let boxShadowVar = backgroundTransparacyVar * 0.3;
      setBackgroundTransparacy(backgroundTransparacyVar + 0.5);
      //setBoxShadow(boxShadowVar);
    }
  }, [clientWindowHeight]);
  return (
    <div
      className="header"
      /* style={{
        background: `rgba(18, 18, 18, ${backgroundTransparacy})`,
        boxShadow: `rgb(0 0 0 / ${boxShadow}) 0px 0px 20px 6px`,
      }} */
    >
      <div className={"hamburger"}>
        <button className={"iconHamburger1"} onClick={hamburgerClick}></button>

        <NavLink to={"/"}>
          <a className={"logo1"}></a>
        </NavLink>
      </div>
      <div className={`${"menuHamburger"}`} style={hamburgerVisible}>
        <div
          style={hamburgerVisible && styleBoxMenu}
          className={`${"boxMenu"}`}
        >
          <div className={`${"boxMenuTitle"}`} onAuxClick={closeHamburger}>
            <NavLink to={"/"}>
              <a className={"logo1"}></a>
            </NavLink>
            <p>Telecom clima</p>
            <button
              className={`${"buttonClose"}`}
              onClick={closeHamburger}
            ></button>
          </div>
          <MenuHamburger
            closeHamburger={closeHamburger}
            hamburgerVisible={hamburgerVisible}
            styleBoxMenu={styleBoxMenu}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
