/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "../css/Map.css";
import { CONFIG } from "../config/config";

export default function Map({
  centerPosition,
  positionMap,
  setPositionMap,
  selectTool,
  setSelectTool,
  setVisibleMenu,
  visibleMenu,
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const ctxMenu = useRef(null);

  const [zoom] = useState(14);
  const [markers, setMarkers] = useState([]);
  maptilersdk.config.apiKey = CONFIG.apiKey;

  useEffect(() => {
    if (map.current) {
      map.current.on("click", (e) => {
        if (!selectTool) return;

        const newMarker = {
          id: markers.length + 1,
          lng: e.lngLat.lng,
          lat: e.lngLat.lat,
          text: selectTool.text,
        };

        setMarkers([...markers, newMarker]);
        //setSelectTool(null);
      });

      map.current.on("contextmenu", (e) => {
        const { x, y } = e.point;

        ctxMenu.current.style.left = x + "px";
        ctxMenu.current.style.top = y + "px";

        setVisibleMenu(true);
      });

      window.addEventListener("click", () => {
        if (visibleMenu) setVisibleMenu(false);
      });
    }

    if (map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: "hybrid",
      center: positionMap.reverse(), //lng, lat
      zoom: zoom,
      terrainControl: true,
    });

    /*const marker = new maptilersdk.Marker({ color: "#FF0000" })
      .setLngLat([139.7525, 35.6846])
      .setPopup(new maptilersdk.Popup().setHTML("Message"))
      .addTo(map.current);

    marker.togglePopup();
    marker.on("contextmenu", () => {
      console.log("show options");
    });*/
  }, [
    zoom,
    selectTool,
    centerPosition,
    positionMap,
    markers,
    setVisibleMenu,
    visibleMenu,
  ]);

  useEffect(() => {
    markers.forEach((mark) => {
      const marker = new maptilersdk.Marker({ color: "#FF0000" })
        .setLngLat([mark.lng, mark.lat])
        .setPopup(new maptilersdk.Popup().setHTML(mark.text))
        .addTo(map.current);
      marker.togglePopup();
    });
  });

  return (
    <>
      <div className="map-wrap">
        <div ref={mapContainer} className="map" />
      </div>
      <div
        className={visibleMenu ? "ctx-menu visible" : "ctx-menu"}
        role="menu"
        ref={ctxMenu}
      >
        <ul className="ctx-options">
          <li className="option-menu">Crear emplazamiento</li>
          <li className="option-menu">Crear sensor</li>
          <li className="option-menu">Mostrar sensores</li>
          <li className="option-menu">Administrar sensores</li>
          <li className="option-menu">Opciones mapa</li>
        </ul>
      </div>
    </>
  );
}
