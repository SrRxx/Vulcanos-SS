/* eslint-disable no-unused-vars */
import "./App.css";
import "./css/List.css";
import icon_sgc from "./assets/sgc_icon.png";
import List from "./components/List";
import Item from "./components/Item";
import { useState, useEffect } from "react";
import { TvIcon, MoonIcon, VideoCameraIcon } from "@heroicons/react/20/solid";
import Map from "./components/Map";

function App() {
  const [ListTools, setListTools] = useState([]);
  const [Loading, setLoading] = useState(true);
  //const [itemMove, setItemMove] = useState(null);
  const [positionsVolcan] = useState({
    1: [1.2216782380409654, -77.35828899355492],
    2: [0.82111111, -77.935],
    3: [0.95583333333333, -77.883333333333],
  });
  const [positionMap, setPositionMap] = useState(positionsVolcan[1]);
  const [selectTool, setSelectTool] = useState(null);
  const [visibleMenu, setVisibleMenu] = useState(false);

  const changePositionMap = (e) => {
    setPositionMap(positionsVolcan[e.target.value]);
  };

  useEffect(() => {
    if (Loading) {
      setListTools([
        { id: 1, icon: <TvIcon className="tool-icon" />, text: "Tool 1" },
        { id: 2, icon: <MoonIcon className="tool-icon" />, text: "Tool 2" },
        {
          id: 3,
          icon: <VideoCameraIcon className="tool-icon" />,
          text: "Tool 3",
        },
      ]);

      setLoading(false);

      window.addEventListener("mousemove", () => {
        //console.log(itemMove);
      });
    }
  }, [Loading]);

  return (
    <>
      <div className="menu-tools">
        <section className="icon-divider">
          <img
            draggable={false}
            src={icon_sgc}
            className="icon-sgc"
            alt="Servicio Geológico Colombiano"
          />
        </section>
        <section className="select-volcan">
          <select
            className="selector-volcan"
            name="selector-volcan"
            id="selector-volcan"
            onChange={changePositionMap}
          >
            <option value="1">Volcan Galeras</option>
            <option value="2">Volcan Chiles</option>
            <option value="3">Volcan Cumbal</option>
          </select>
        </section>
        <section className="tools-menu">
          <List
            title={"Herramientas"}
            items={ListTools.map((tool, index) => (
              <Item
                key={"tool-" + index}
                icon={tool.icon}
                text={tool.text}
                data-id={tool.id}
                onClick={(e) => {
                  /*if(!e.target.hasAttribute("data-id")) {
                    const parent = e.target.parentNode;
                    console.log(parent);
                  } else {
                    console.log(e.target);
                  }*/
                  setSelectTool(tool);
                }}
              />
            ))}
          />
        </section>
      </div>
      <div className="map">
        <Map
          centerPosition={positionsVolcan[1]}
          setPositionMap={setPositionMap}
          positionMap={positionMap}
          selectTool={selectTool}
          setSelectTool={setSelectTool}
          visibleMenu={visibleMenu}
          setVisibleMenu={setVisibleMenu}
        />
      </div>
    </>
  );
}

export default App;
