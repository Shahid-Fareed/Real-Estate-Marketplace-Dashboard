import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

const CustomMaps = ({
  setLatitude,
  setLongitude,
  areaData,
  areaLong,
  areaLang,
  modalOpen,
  setModalOpen,
}) => {
  const [markerPosition, setMarkerPosition] = useState([]);

  useEffect(()=>{
    setMarkerPosition(areaData);
  },[])

  // useEffect(() => {
  //   console.log("area data: ", areaData)
  //   const latDecimal = areaLang;
  //   const lngDecimal = areaLong;
  //   setMarkerPosition(areaData);
  //   setLatitude(areaData.lat);
  //   setLongitude(areaData.lng);
  // }, [areaLong, areaLang]);

  const handleMapClick = (event) => {
    const { lat, lng } = event;
    console.log("ali lat value: ", lat)
    setLatitude(lat);
    setLongitude(lng);
    setMarkerPosition({ lat, lng });
  };

  const convertDMSToDecimal = (dms) => {
    const dmsParts = dms.split(/[^\d\w.]+/);
    const degrees = parseFloat(dmsParts[1]);
    const minutes = parseFloat(dmsParts[2]);
    const seconds = parseFloat(dmsParts[3]);

    let decimal = degrees + minutes / 60 + seconds / 3600;
    if (dms.includes("S") || dms.includes("W")) {
      decimal = -decimal;
    }

    return decimal;
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Pin your exact location
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div style={{ height: "400px", width: "100%" }}>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: "AIzaSyB_X_leqFCrEXS06iTPXBW_DY3MPHM6RLQ",
                  }}
                  defaultCenter={markerPosition}
                  center={markerPosition}
                  defaultZoom={14}
                  onClick={handleMapClick}
                >
                  <Marker
                    lat={markerPosition.lat}
                    lng={markerPosition.lng}
                    draggable={true}
                    onDragEnd={(event) =>
                      setMarkerPosition({ lat: event.lat, lng: event.lng })
                    }
                  />
                </GoogleMapReact>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Marker = ({ lat, lng, draggable, onDragEnd }) => (
  <div
    style={{
      position: "absolute",
      transform: "translate(-50%, -50%)",
      top: "50%",
      left: "50%",
      width: "50px",
      height: "50px",
    }}
    draggable={draggable}
    onDragEnd={(event) => onDragEnd(event)}
    lat={lat}
    lng={lng}
  >
    <img
      alt=""
      src="/assets/images/LocationandPurposeIcon.png"
      style={{ width: "100%", height: "100%" }}
    />
  </div>
);

export default CustomMaps;
