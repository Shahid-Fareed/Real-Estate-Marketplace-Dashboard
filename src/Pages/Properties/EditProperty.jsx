import React, { useState, useEffect, useRef } from "react";
import MyHelmet from "../../Reuseable/Helmet";
import PageTitle from "../../Reuseable/PageTitle";
import AddAmenity from "./Modal";
import propertiesDashService from "../../Services/propertiesDashService";
import ImageUpload from "../../Reuseable/Uploaders/ImageUpload";
import CustomMaps from "./CustomMaps";
import { useNavigate, useParams } from "react-router-dom";
import { notifySuccess } from "../../utils/toast";

const EditProperty = () => {
  const { id } = useParams();
  const [isSearching, setIsSeraching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const autocompleteRef = useRef(null);
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [areaData, setAreaData] = useState(null);
  const search = (input) => {
    if (input.length < 3) {
      setResults([]);
      setShowResults(false);

      return;
    }
    setIsSeraching(true);
    propertiesDashService
      .areaByCity(null, selectCityId, input)
      .then((res) => {
        setResults(res.data);
        setShowResults(true);
        setIsSeraching(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    search(input);

    const handleClickOutside = (event) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target)
      ) {
        setResults([]);
        setShowResults(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [input]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleClickChange = (e, data) => {
    e.preventDefault();
    setInput(data.name);
    setAreaData(data.geography);
    setSelectedArea(data.name);
    setSelectedAreaId(data.id);
    setLatitude(data.geography.lat);
    setLongitude(data.geography.lng);
    setShowResults(false);
  };

  const navigate = useNavigate();
  const [userid, setUserid] = useState("");
  const [isRent, setIsRent] = useState(true);
  const [activeTab, setActiveTab] = useState("tab-1");
  const [selectedValue, setSelectedValue] = useState("");
  const [images, setImages] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectCityId, setSelectedCityId] = useState("");
  const [selectAreaId, setSelectedAreaId] = useState("");
  const [selectCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [areas, setAreas] = useState([]);

  const [name, setName] = useState("");
  const [bath, setBath] = useState("");
  const [garage, setGarage] = useState("");
  const [bed, setBed] = useState("");
  const [price, setPrice] = useState("");
  const [propertySize, setPropertSize] = useState("");
  const [propertyAreaUnit, setPropertyAreaUnit] = useState("");
  const [propertyDetails, setPropertyDetails] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [personName, setPersonName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [areaLang, setAreaLang] = useState("");
  const [areaLong, setAreaLong] = useState("");

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  //ademnities studd

  let userId = null;
  const authUser = localStorage.getItem("authUser");
  if (authUser) {
    const parsedAuthUser = JSON.parse(authUser);
    userId = parsedAuthUser?.id;
  }

  let userType = null;
  const authUsers = localStorage.getItem("authUser");
  if (authUsers) {
    const parsedAuthUser = JSON.parse(authUsers);
    userType = parsedAuthUser?.user_type;
  }

  const [data, setData] = useState({
    PrimaryFeatures: {
      Build_Year: null,
      Tv_Lounge: 0,
      Store_Room: 0,
      Laundry_Room: 0,
      Kitchen: 0,
      Central_heating: null,
      Central_cooling: null,
      Elevator_Lift: null,
      Public_parking: null,
      CCTV_camera: null,
      Accessing_boulevard: null,
    },
    Utilities: {
      Sewerage: null,
      Electricity: null,
      Water_Supply: null,
      Gas: null,
      Security: null,
    },
    Communication: {
      Internet_access: null,
      Satellite_or_cable_TV: null,
    },
    Public_Facilities_Nearby: {
      Park: null,
      Schools: null,
      Hospitals: null,
      Mosque: null,
      Restaurants: null,
    },
    Secondary_Features: {
      Backup_generator: null,
      Maintenance: null,
      Number_of_Floors: 0,
      Which_Floor_is_your_unit_on: 0,
    },
  });

  const handlePhoneNumberChange = (event) => {
    const newValue = event.target.value.replace(/\D/g, "").slice(0, 11);
    setPhoneNumber(newValue);
  };

  const getDetailsProperty = () => {
    propertiesDashService
      .getPropertyId(id, null)
      .then((res) => {
        const data = res.data[0];
        if (data.typ === "sell") {
          setIsRent(false);
        } else {
          setIsRent(true);
        }
        setAreaData({
          lat: parseFloat(data.latitude),
          lng: parseFloat(data.longitude),
        });
        setSelectedCity(data.city);
        setSelectedArea(data.location);
        setUserid(data.user_id);
        setSelectedCityId(data.city_id);
        setSelectedAreaId(data.location_id);
        setName(data.name);
        setBath(data.bathroom);
        setGarage(data.garage_space);
        setBed(data.bedroom);
        setPrice(data.price);
        setPropertyDetails(data.description);
        setPhoneNumber(data.seller_mobile_no);
        setPersonName(data.seller_name);
        setPropertSize(data.area_size);
        setPropertyAreaUnit(data.area_unit);
        setData(data.ameneties);
        setActiveTab(data.selectedTab);
        if (data.selectedTab) {
          setTimeout(() => {
            const element = document.querySelector(`.${data.selectedTab}`);
            if (element) {
              element.click();
              setSelectedValue(`${data.property_category_id}`);
            } else {
              console.log(
                "Element not found with selector: ",
                `.${data.selectedTab}`
              );
            }
          }, 100); // Adjust the delay as needed
        }
        let iamgesUrlsnew = [];
        const imagesss = data.property_images;
        for (let i = 0; i < imagesss.length; i++) {
          const element = imagesss[i].image_name;
          const obj = {
            uid: ++i,
            name: element,
            status: "done",
            url: process.env.REACT_APP_API_PROPERTY_IMAGE_URL + element,
          };
          iamgesUrlsnew.push(obj);
        }
        console.log(iamgesUrlsnew);
        setImages(iamgesUrlsnew);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (section, field, value) => {
    setData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleItemClick = (event) => {
    const value = event.target.textContent;
    setPropertyAreaUnit(value);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSelectedValue("");
  };

  const handleButtonClick = (value) => {
    setSelectedValue(value);
  };

  const handelAreas = (e) => {
    setSelectedAreaId(e.target.value);
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[e.target.selectedIndex];
    setSelectedArea(e.target.options[selectedIndex].text);
    const lat = selectedOption.getAttribute("lat");
    const lng = selectedOption.getAttribute("lag");
    setAreaLang(lat);
    setAreaLong(lng);
    setModalOpen(true);
  };

  const handelSetCity = (e) => {
    const selectedIndex = e.target.selectedIndex;
    setSelectedCity(e.target.options[selectedIndex].text);
    setSelectedCityId(e.target.value);
  };
  const getCitties = () => {
    propertiesDashService
      .allCities()
      .then((res) => {
        const data = res.data;
        setCities(data);
      })
      .catch((err) => {
        console.log("ERrpor on fecthing cities");
      });
  };

  const getAreas = (id) => {
    propertiesDashService
      .areaByCity(null, id)
      .then((res) => {
        const data = res.data;
        setAreas(data);
      })
      .catch((err) => {
        console.log("Error on fecthing cities");
      });
  };

  useEffect(() => {
    getDetailsProperty();
    getCitties();
  }, []);

  useEffect(() => {
    getAreas(selectCityId);
  }, [selectCity, selectCityId]);

  const handelSubmitProperty = (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    const body = {
      name: name,
      property_category_id: parseInt(selectedValue),
      user_id: userid,
      city: selectCity,
      city_id: selectCityId,
      location_id: selectAreaId,
      location: selectedArea,
      latitude: latitude,
      longitude: longitude,
      area_size: propertySize,
      area_unit: propertyAreaUnit,
      price: price,
      description: propertyDetails,
      bedroom: bed,
      bathroom: bath,
      garage_space: garage,
      seller_name: personName,
      seller_mobile_no: phoneNumber,
      ameneties: data,
      typ: `${isRent ? "rent" : "sell"}`,
      files: images.map((item) => item.name),
      selectedTab: activeTab,
    };

    propertiesDashService
      .updatePropertyId(id, body)
      .then((res) => {
        setIsSubmitting(false);
        notifySuccess("Property Updated Successfully!");
        console.log("propertuy added: ", res);
        if (userType === "admin") {
          navigate("/properties/admin");
        } else if (userType === "user") {
          navigate("/properties/user");
        } else {
          navigate("/properties/agency");
        }
      })
      .catch((err) => {
        setIsSubmitting(false);
        console.log("error on the add property api");
      });
  };

  return (
    <>
      <MyHelmet title="Update Properties" />

      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <PageTitle pagename="Update Properties" />
              <div className="col-12">
                <section className="mt-xxl-5 mt-xl-5">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6 col-lg-2 col-xxl-2 invisible" />
                      <div className="col-md-6 col-lg-8 col-xxl-8">
                        <div>
                          <h5
                            className="mb-3"
                            style={{
                              fontFamily: "Inter, sans-serif",
                              color: "rgba(0, 0, 0, 0.9)",
                            }}
                          >
                            Select Purpose
                          </h5>
                          <div>
                            <button
                              className={
                                isRent
                                  ? "btn rounded-0 PurpseButtonOne box-shadow-unset px-4 py-2"
                                  : "btn rounded-0 PurpseButtonSecond box-shadow-unset px-4 py-2"
                              }
                              type="button"
                              onClick={() => setIsRent(!isRent)}
                            >
                              <img
                                className="me-xl-2"
                                src={
                                  isRent
                                    ? "/assets/images/addProperty/Sell_icon_black.png"
                                    : "/assets/images/addProperty/Sell_icon_white.png"
                                }
                                width={20}
                                height={19}
                                alt=""
                              />
                              Sell
                            </button>
                            <button
                              className={
                                isRent
                                  ? "btn rounded-0 ms-xxl-3 ms-4 ms-xl-4 PurpseButtonSecond box-shadow-unset px-4 py-2"
                                  : "btn rounded-0 ms-xxl-3 ms-4 ms-xl-4 PurpseButtonOne box-shadow-unset px-4 py-2"
                              }
                              type="button"
                              onClick={() => setIsRent(!isRent)}
                            >
                              <img
                                className="me-xl-2"
                                src={
                                  isRent
                                    ? "/assets/images/addProperty/Rent_icon_white.png"
                                    : "/assets/images/addProperty/Rent_icon_black.png"
                                }
                                width={20}
                                height={19}
                                alt=""
                              />
                              Rent
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="container">
                    <div className="row">
                      <div className="col-md-6 col-lg-2 col-xxl-2 invisible" />
                      <div className="col-md-6 col-lg-8 col-xxl-8 mt-xl-5">
                        <div>
                          <h5
                            className="mb-3"
                            style={{
                              fontFamily: "Inter, sans-serif",
                              color: "rgba(0, 0, 0, 0.9)",
                            }}
                          >
                            Select your property type
                          </h5>
                        </div>
                        <div className="col-12">
                          <div>
                            <ul
                              id="propertytabs"
                              className="nav nav-tabs"
                              role="tablist"
                            >
                              <li className="nav-item" role="presentation">
                                <a
                                  className={`nav-link px-4 px-lg-5 tab-1 `}
                                  role="tab"
                                  data-bs-toggle="tab"
                                  href="#tab-1"
                                  style={{ fontFamily: "Inter, sans-serif" }}
                                  aria-selected={activeTab === "tab-1"}
                                  onClick={() => handleTabChange("tab-1")}
                                >
                                  Residential
                                </a>
                              </li>
                              {!isRent ? (
                                <li className="nav-item" role="presentation">
                                  <a
                                    className={`nav-link px-4 px-lg-5 tab-2 `}
                                    role="tab"
                                    data-bs-toggle="tab"
                                    href="#tab-2"
                                    aria-selected={activeTab === "tab-2"}
                                    onClick={() => handleTabChange("tab-2")}
                                  >
                                    Plot
                                  </a>
                                </li>
                              ) : null}

                              <li className="nav-item" role="presentation">
                                <a
                                  className={`nav-link px-4 px-lg-5 tab-3`}
                                  role="tab"
                                  data-bs-toggle="tab"
                                  href="#tab-3"
                                  ria-selected={activeTab === "tab-3"}
                                  onClick={() => handleTabChange("tab-3")}
                                >
                                  Commercial
                                </a>
                              </li>
                            </ul>
                            <div className="tab-content">
                              <div
                                className="tab-pane active pt-xl-4"
                                role="tabpanel"
                                id="tab-1"
                              >
                                <div className="d-flex flex-wrap tabs-btns">
                                  <button
                                    className={`btn rounded-0 btnBorders box-shadow-unset ${
                                      selectedValue === "15"
                                        ? "selectedPropertyType"
                                        : ""
                                    }`}
                                    type="button"
                                    onClick={() => handleButtonClick("15")}
                                    style={{}}
                                  >
                                    <img
                                      src={
                                        selectedValue === "15"
                                          ? "/assets/images/addProperty/Commercialiconwhite.png"
                                          : "/assets/images/addProperty/Commercialiconblack.png"
                                      }
                                      width={22}
                                      height={22}
                                      alt=""
                                    />
                                    <span className="ps-1">House</span>
                                  </button>
                                  <button
                                    className={`btn rounded-0 btnBorders box-shadow-unset ${
                                      selectedValue === "16"
                                        ? "selectedPropertyType"
                                        : ""
                                    }`}
                                    type="button"
                                    onClick={() => handleButtonClick("16")}
                                  >
                                    <img
                                      src={
                                        selectedValue === "16"
                                          ? "/assets/images/addProperty/Commercialiconwhite.png"
                                          : "/assets/images/addProperty/Commercialiconblack.png"
                                      }
                                      width={22}
                                      height={22}
                                      alt=""
                                    />
                                    <span className="ps-1">Flat</span>
                                  </button>
                                  <button
                                    className={`btn rounded-0 btnBorders box-shadow-unset ${
                                      selectedValue === "17"
                                        ? "selectedPropertyType"
                                        : ""
                                    }`}
                                    type="button"
                                    onClick={() => handleButtonClick("17")}
                                  >
                                    <img
                                      src={
                                        selectedValue === "17"
                                          ? "/assets/images/addProperty/Commercialiconwhite.png"
                                          : "/assets/images/addProperty/Commercialiconblack.png"
                                      }
                                      width={22}
                                      height={22}
                                      alt=""
                                    />
                                    <span className="ps-1">Farm House</span>
                                  </button>
                                  <button
                                    className={`btn rounded-0 btnBorders box-shadow-unset ${
                                      selectedValue === "18"
                                        ? "selectedPropertyType"
                                        : ""
                                    }`}
                                    type="button"
                                    onClick={() => handleButtonClick("18")}
                                  >
                                    <img
                                      src={
                                        selectedValue === "18"
                                          ? "/assets/images/addProperty/Commercialiconwhite.png"
                                          : "/assets/images/addProperty/Commercialiconblack.png"
                                      }
                                      width={22}
                                      height={22}
                                      alt=""
                                    />
                                    <span className="ps-1">Guest House</span>
                                  </button>
                                </div>
                              </div>

                              <div
                                className="tab-pane pt-xl-4"
                                role="tabpanel"
                                id="tab-2"
                              >
                                <div className="d-flex flex-wrap tabs-btns">
                                  <button
                                    className={`btn rounded-0 btnBorders box-shadow-unset ${
                                      selectedValue === "9"
                                        ? "selectedPropertyType"
                                        : ""
                                    }`}
                                    type="button"
                                    onClick={() => handleButtonClick("9")}
                                    style={{}}
                                  >
                                    <img
                                      src={
                                        selectedValue === "9"
                                          ? "/assets/images/addProperty/Resedential icon white.png"
                                          : "/assets/images/addProperty/Resedential icon black.png"
                                      }
                                      width={22}
                                      height={22}
                                      alt=""
                                    />
                                    <span className="ps-1">
                                      Residential Plot
                                    </span>
                                  </button>
                                  <button
                                    className={`btn rounded-0 btnBorders box-shadow-unset ${
                                      selectedValue === "10"
                                        ? "selectedPropertyType"
                                        : ""
                                    }`}
                                    type="button"
                                    onClick={() => handleButtonClick("10")}
                                  >
                                    <img
                                      src={
                                        selectedValue === "10"
                                          ? "/assets/images/addProperty/Commercialiconwhite.png"
                                          : "/assets/images/addProperty/Commercialiconblack.png"
                                      }
                                      width={22}
                                      height={22}
                                      alt=""
                                    />
                                    <span className="ps-1">
                                      Commercial Plot
                                    </span>
                                  </button>
                                  <button
                                    className={`btn rounded-0 btnBorders box-shadow-unset ${
                                      selectedValue === "13"
                                        ? "selectedPropertyType"
                                        : ""
                                    }`}
                                    type="button"
                                    onClick={() => handleButtonClick("13")}
                                  >
                                    <img
                                      src={
                                        selectedValue === "13"
                                          ? "/assets/images/addProperty/Agricultural_land_icon_white.png"
                                          : "/assets/images/addProperty/Agricultural_land_icon_black.png"
                                      }
                                      width={22}
                                      height={22}
                                      alt=""
                                    />
                                    <span className="ps-1">
                                      Agricultural Land
                                    </span>
                                  </button>
                                  <button
                                    className={`btn rounded-0 btnBorders box-shadow-unset ${
                                      selectedValue === "14"
                                        ? "selectedPropertyType"
                                        : ""
                                    }`}
                                    type="button"
                                    onClick={() => handleButtonClick("14")}
                                  >
                                    <img
                                      src={
                                        selectedValue === "14"
                                          ? "/assets/images/addProperty/Industriallandiconwhite.png"
                                          : "/assets/images/addProperty/Industriallandiconblack.png"
                                      }
                                      width={22}
                                      height={22}
                                      alt=""
                                    />
                                    <span className="ps-1">
                                      Industrial Land
                                    </span>
                                  </button>
                                  <button
                                    className={`btn rounded-0 btnBorders box-shadow-unset ${
                                      selectedValue === "12"
                                        ? "selectedPropertyType"
                                        : ""
                                    }`}
                                    type="button"
                                    onClick={() => handleButtonClick("12")}
                                  >
                                    <img
                                      src={
                                        selectedValue === "12"
                                          ? "/assets/images/addProperty/Plot_file_icon_white.png"
                                          : "/assets/images/addProperty/Plot_file_icon_black.png"
                                      }
                                      width={22}
                                      height={22}
                                      alt=""
                                    />
                                    <span className="ps-1"></span>Plot File
                                  </button>
                                  <button
                                    className={`btn rounded-0 btnBorders box-shadow-unset ${
                                      selectedValue === "11"
                                        ? "selectedPropertyType"
                                        : ""
                                    }`}
                                    type="button"
                                    onClick={() => handleButtonClick("11")}
                                  >
                                    <img
                                      src={
                                        selectedValue === "11"
                                          ? "/assets/images/addProperty/Farmhouse_icon_white.png"
                                          : "/assets/images/addProperty/Farmhouse_icon_black.png"
                                      }
                                      width={22}
                                      height={22}
                                      alt=""
                                    />
                                    <span className="ps-1">Farmhouse Plot</span>
                                  </button>
                                </div>
                              </div>

                              <div
                                className="tab-pane pt-xl-4"
                                role="tabpanel"
                                id="tab-3"
                              >
                                <div className="d-flex flex-wrap tabs-btns">
                                  <button
                                    className={`btn rounded-0 btnBorders box-shadow-unset ${
                                      selectedValue === "4"
                                        ? "selectedPropertyType"
                                        : ""
                                    }`}
                                    type="button"
                                    style={{}}
                                    onClick={() => handleButtonClick("4")}
                                  >
                                    <img
                                      src={
                                        selectedValue === "4"
                                          ? "/assets/images/addProperty/Commercialiconwhite.png"
                                          : "/assets/images/addProperty/Commercialiconblack.png"
                                      }
                                      width={22}
                                      height={22}
                                      alt=""
                                    />
                                    <span className="ps-1">Office</span>
                                  </button>
                                  <button
                                    className={`btn rounded-0 btnBorders box-shadow-unset ${
                                      selectedValue === "5"
                                        ? "selectedPropertyType"
                                        : ""
                                    }`}
                                    type="button"
                                    onClick={() => handleButtonClick("5")}
                                  >
                                    <img
                                      src={
                                        selectedValue === "5"
                                          ? "/assets/images/addProperty/Commercialiconwhite.png"
                                          : "/assets/images/addProperty/Commercialiconblack.png"
                                      }
                                      width={22}
                                      height={22}
                                      alt=""
                                    />
                                    <span className="ps-1">Shop</span>
                                  </button>
                                  <button
                                    className={`btn rounded-0 btnBorders box-shadow-unset ${
                                      selectedValue === "6"
                                        ? "selectedPropertyType"
                                        : ""
                                    }`}
                                    type="button"
                                    onClick={() => handleButtonClick("6")}
                                  >
                                    <img
                                      src={
                                        selectedValue === "6"
                                          ? "/assets/images/addProperty/Commercialiconwhite.png"
                                          : "/assets/images/addProperty/Commercialiconblack.png"
                                      }
                                      width={22}
                                      height={22}
                                      alt=""
                                    />
                                    <span className="ps-1">Warehouse</span>
                                  </button>
                                  <button
                                    className={`btn rounded-0 btnBorders box-shadow-unset ${
                                      selectedValue === "7"
                                        ? "selectedPropertyType"
                                        : ""
                                    }`}
                                    type="button"
                                    onClick={() => handleButtonClick("7")}
                                  >
                                    <img
                                      src={
                                        selectedValue === "7"
                                          ? "/assets/images/addProperty/Commercialiconwhite.png"
                                          : "/assets/images/addProperty/Commercialiconblack.png"
                                      }
                                      width={22}
                                      height={22}
                                      alt=""
                                    />
                                    <span className="ps-1">Building</span>
                                  </button>
                                  <button
                                    className={`btn rounded-0 btnBorders box-shadow-unset ${
                                      selectedValue === "8"
                                        ? "selectedPropertyType"
                                        : ""
                                    }`}
                                    type="button"
                                    onClick={() => handleButtonClick("8")}
                                  >
                                    <img
                                      src={
                                        selectedValue === "8"
                                          ? "/assets/images/addProperty/Commercialiconwhite.png"
                                          : "/assets/images/addProperty/Commercialiconblack.png"
                                      }
                                      width={22}
                                      height={22}
                                      alt=""
                                    />
                                    <span className="ps-1">Plaza</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row pt-xl-3" style={{ paddingTop: 10 }}>
                      <div className="col-md-6 col-lg-2 col-xxl-2">
                        <img
                          className="mb-2"
                          src="/assets/images/addProperty/location.png"
                          alt=""
                          width="24"
                        />
                        <h6 style={{ fontFamily: "Inter, sans-serif" }}>
                          Location &amp; Purpose
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="container">
                    <div className="row">
                      <div
                        style={{ placeSelf: "center" }}
                        className="col-md-6 col-lg-2 col-xxl-2"
                      >
                        <div />
                        <img
                          className="mb-2"
                          src="/assets/images/addProperty/property-price.png"
                          alt=""
                          width="30"
                        ></img>
                        <h6>Property Price &amp; Area</h6>
                      </div>
                      <div className="col-md-6 col-lg-8  col-xxl-8 mt-xl-5">
                        <div className="container">
                          <div className="row">
                            <div className="col-xl-12">
                              <div>
                                <h4>Select the city</h4>
                                <select
                                  value={selectCityId}
                                  onChange={(e) => handelSetCity(e)}
                                  className="form-control pt-xl-2 ps-xl-2 pb-xl-2 pe-xl-2"
                                  style={{
                                    width: "75%",
                                    border: "1px solid rgb(0, 0, 0)",
                                  }}
                                >
                                  <option value="">Select City</option>
                                  {cities?.map((city) => (
                                    <option
                                      key={city.id}
                                      name={city.name}
                                      value={city.id}
                                    >
                                      {city.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            {areas ? (
                              <div
                                ref={autocompleteRef}
                                className="col-xl-12 pt-4 pt-xl-5"
                              >
                                <div>
                                  <h5 style={{ color: "rgba(0, 0, 0, 0.9)" }}>
                                    Search & Select Area
                                  </h5>
                                </div>
                                <div className="position-relative">
                                  <div
                                    style={{ width: "75%" }}
                                    className="input-group"
                                  >
                                    <input
                                      style={{
                                        width: "75%",
                                        border: "1px solid #000",
                                      }}
                                      placeholder="Select the area"
                                      className="form-control pt-xl-2 ps-xl-2 pb-xl-2 pe-xl-2  autocomplete    global-search"
                                      value={input}
                                      onChange={(e) => handleInputChange(e)}
                                    />
                                    <span
                                      style={{
                                        filter: "invert(1)",
                                        position: "absolute",
                                        right: 0,
                                        zIndex: 999,
                                      }}
                                      className="input-group-text border-0 rounded-0 bg-transparent"
                                    >
                                      {isSearching ? (
                                        <>
                                          <i
                                            className="fa fa-spinner fa-spin"
                                            style={{
                                              fontSize: 24,
                                              color: "white",
                                            }}
                                          />
                                        </>
                                      ) : (
                                        <img
                                          src="/assets/images/search.png"
                                          width="25"
                                          height="25"
                                          alt=""
                                        />
                                      )}
                                    </span>
                                  </div>
                                </div>

                                {showResults ? (
                                  <ul className="autocomplete-result-list border-0">
                                    {results.length === 0 ? (
                                      <li className="no-results">
                                        No results found
                                      </li>
                                    ) : (
                                      results.map((result) => (
                                        <li
                                          key={result.id}
                                          onClick={(e) =>
                                            handleClickChange(e, result)
                                          }
                                          className="pointer"
                                        >
                                          <span>{result.name}</span>
                                        </li>
                                      ))
                                    )}
                                  </ul>
                                ) : null}
                              </div>
                            ) : null}

                            {!selectAreaId ? null : (
                              <div className="col-xl-12 pt-4 pt-xl-5">
                                {areaData ? (
                                  <>
                                    <div>
                                      <CustomMaps
                                        areaData={areaData}
                                        areaLang={areaLang}
                                        areaLong={areaLong}
                                        setLatitude={setLatitude}
                                        setLongitude={setLongitude}
                                        modalOpen={modalOpen}
                                        setModalOpen={setModalOpen}
                                      />
                                    </div>
                                  </>
                                ) : null}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className="mt-5" />

                  <div className="container pt-4 pt-xl-5">
                    <div className="row">
                      <div
                        style={{ placeSelf: "center" }}
                        className="col-md-6 col-lg-2 col-xxl-2"
                      >
                        <div />
                        <img
                          className="mb-2"
                          src="/assets/images/addProperty/property-feature-info.png"
                          alt=""
                          width="30"
                        />
                        <h6
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalAmenti"
                        >
                          Property Features & Info
                        </h6>
                      </div>

                      <div className="col-6 col-md-12 col-xl-8  col-xxl-8">
                        <div className="container">
                          <div className="row">
                            <div className="col-xl-12">
                              <div>
                                <h5 style={{ color: "rgba(0, 0, 0, 0.9)" }}>
                                  Select Property Size & Measurement Unit
                                </h5>
                              </div>
                              <div
                                className="input-group"
                                style={{
                                  width: "75%",
                                  border: "1px solid rgb(0, 0, 0)",
                                }}
                              >
                                <div className="input-group">
                                  <input
                                    value={propertySize}
                                    placeholder="Enter Size"
                                    onChange={(e) =>
                                      setPropertSize(e.target.value)
                                    }
                                    type="number"
                                    className="form-control border-0 rounded-0"
                                    aria-label="Text input with dropdown button"
                                  />
                                  <div className="dropdown dropdown-menu-end">
                                    <button
                                      className="btn btn-outline-secondary dropdown-toggle border-0 bg-dark rounded-0 text-white"
                                      type="button"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      {propertyAreaUnit !== ""
                                        ? propertyAreaUnit
                                        : "Select Size"}
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                      <li>
                                        <a
                                          style={{ cursor: "pointer" }}
                                          className="dropdown-item"
                                          onClick={handleItemClick}
                                        >
                                          Marla
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          style={{ cursor: "pointer" }}
                                          className="dropdown-item"
                                          onClick={handleItemClick}
                                        >
                                          Sq.ft
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          style={{ cursor: "pointer" }}
                                          className="dropdown-item"
                                          onClick={handleItemClick}
                                        >
                                          Sq.m
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          style={{ cursor: "pointer" }}
                                          className="dropdown-item"
                                          onClick={handleItemClick}
                                        >
                                          Sq.yd
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          style={{ cursor: "pointer" }}
                                          className="dropdown-item"
                                          onClick={handleItemClick}
                                        >
                                          Kanal
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {activeTab === "tab-1" ? (
                              <div className="col-xl-12 pt-4 pt-xl-5">
                                <div>
                                  <h5 style={{ color: "rgba(0, 0, 0, 0.9)" }}>
                                    Enter No. of Bedrooms
                                  </h5>
                                </div>
                                <input
                                  placeholder="Total Bedrooms"
                                  value={bed}
                                  onChange={(e) => {
                                    setBed(e.target.value);
                                  }}
                                  type="text"
                                  style={{
                                    width: "75%",
                                    border: "1px solid rgba(0, 0, 0, 0.9)",
                                  }}
                                  className="form-control pt-xl-2 ps-xl-2 pb-xl-2 pe-xl-2 rounded-0 rounded-0"
                                />
                              </div>
                            ) : null}
                            {activeTab === "tab-1" || activeTab === "tab-3" ? (
                              <>
                                <div className="col-xl-12 pt-4 pt-xl-5">
                                  <div>
                                    <h5 style={{ color: "rgba(0, 0, 0, 0.9)" }}>
                                      Enter No. of Parking Spaces
                                    </h5>
                                  </div>
                                  <input
                                    value={garage}
                                    onChange={(e) => {
                                      setGarage(e.target.value);
                                    }}
                                    type="number"
                                    min="0"
                                    placeholder="Total Parking Spaces"
                                    style={{
                                      width: "75%",
                                      border: "1px solid rgba(0, 0, 0, 0.9)",
                                    }}
                                    className="form-control pt-xl-2 ps-xl-2 pb-xl-2 pe-xl-2 rounded-0"
                                  />
                                </div>
                                <div className="col-xl-12 pt-4 pt-xl-5">
                                  <div>
                                    <h5 style={{ color: "rgba(0, 0, 0, 0.9)" }}>
                                      Enter No. of Bathrooms
                                    </h5>
                                  </div>
                                  <input
                                    value={bath}
                                    onChange={(e) => {
                                      setBath(e.target.value);
                                    }}
                                    type="number"
                                    min="0"
                                    placeholder="Total Bathrooms"
                                    style={{
                                      width: "75%",
                                      border: "1px solid rgba(0, 0, 0, 0.9)",
                                    }}
                                    className="form-control pt-xl-2 ps-xl-2 pb-xl-2 pe-xl-2 rounded-0"
                                  />
                                </div>
                              </>
                            ) : null}

                            <div className="col-xl-12 pt-4 pt-xl-5">
                              <div>
                                <h5 style={{ color: "rgba(0, 0, 0, 0.9)" }}>
                                  Enter Asking Price
                                </h5>
                              </div>
                              <input
                                value={price}
                                onChange={(e) => {
                                  setPrice(e.target.value);
                                }}
                                placeholder="Enter your asking price in Pkr"
                                type="number"
                                min="0"
                                style={{
                                  width: "75%",
                                  border: "1px solid rgba(0, 0, 0, 0.9)",
                                }}
                                className="form-control pt-xl-2 ps-xl-2 pb-xl-2 pe-xl-2 rounded-0"
                              />
                            </div>
                            <div className="col-xl-12 pt-4 pt-xl-5">
                              <div>
                                <h5 style={{ color: "rgba(0, 0, 0, 0.9)" }}>
                                  Property Name
                                </h5>
                              </div>
                              <input
                                value={name}
                                placeholder="Enter Property Name"
                                onChange={(e) => {
                                  setName(e.target.value);
                                }}
                                type="text"
                                style={{
                                  width: "75%",
                                  border: "1px solid rgba(0, 0, 0, 0.9)",
                                }}
                                className="form-control pt-xl-2 ps-xl-2 pb-xl-2 pe-xl-2 rounded-0"
                              />
                            </div>
                            <div className="col-xl-12 pt-4 pt-xl-5">
                              <div>
                                <AddAmenity
                                  handleChange={handleChange}
                                  activeTab={activeTab}
                                  data={data}
                                />
                              </div>
                            </div>
                            <div className="col-xl-12 pt-4 pt-xl-5">
                              <div>
                                <h5 style={{ color: "rgba(0, 0, 0, 0.9)" }}>
                                  Property Description
                                </h5>
                              </div>
                              <textarea
                                placeholder="Describe your property, features etc"
                                value={propertyDetails}
                                onChange={(e) => {
                                  setPropertyDetails(e.target.value);
                                }}
                                style={{
                                  width: "75%",
                                  border: "1px solid rgba(0, 0, 0, 0.9)",
                                  minHeight: "300px",
                                }}
                                className="form-control pt-xl-2 ps-xl-2 pb-xl-2 pe-xl-2 rounded-0"
                              />
                            </div>
                            <div className="col-xl-12 pt-4 pt-xl-5">
                              <div>
                                <h5 style={{ color: "rgba(0, 0, 0, 0.9)" }}>
                                  Upload Property Images
                                </h5>
                              </div>

                              <ImageUpload
                                fileList={images}
                                setFileList={setImages}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr />

                  <div className="container pt-4 pt-xl-5 pb-5">
                    <div className="row">
                      <div
                        style={{ placeSelf: "center" }}
                        className="col-md-6 col-lg-2 col-xxl-2"
                      >
                        <div />
                        <img
                          className="mb-2"
                          src="/assets/images/addProperty/contact-info.png"
                          alt=""
                          width="30"
                        />
                        <h6>Contact Information</h6>
                      </div>
                      <div className="col-md-6 col-lg-8 col-xxl-8">
                        <div className="container">
                          <div className="row">
                            <div className="col-xl-12">
                              <div>
                                <h5 style={{ color: "rgba(0, 0, 0, 0.9)" }}>
                                  Your Contact Number
                                </h5>
                              </div>
                              <input
                                value={phoneNumber}
                                placeholder="Provide your contact number"
                                onChange={handlePhoneNumberChange}
                                type="number"
                                min="0"
                                maxLength={11}
                                style={{
                                  width: "75%",
                                  border: "1px solid rgba(0, 0, 0, 0.9)",
                                }}
                                className="form-control pt-xl-2 ps-xl-2 pb-xl-2 pe-xl-2 rounded-0"
                              />
                            </div>
                            <div className="col-xl-12 pt-4 pt-xl-5">
                              <div>
                                <h5 style={{ color: "rgba(0, 0, 0, 0.9)" }}>
                                  Your Name
                                </h5>
                              </div>
                              <input
                                value={personName}
                                placeholder="Enter your name"
                                onChange={(e) => setPersonName(e.target.value)}
                                type="text"
                                style={{
                                  width: "75%",
                                  border: "1px solid rgba(0, 0, 0, 0.9)",
                                }}
                                className=" form-control pt-xl-2 ps-xl-2 pb-xl-2 pe-xl-2 rounded-0"
                              />
                            </div>

                            <div className="col-xl-12 pt-4 pt-xl-5">
                              <button
                                disabled={isSubmitting}
                                onClick={(e) => {
                                  handelSubmitProperty(e);
                                }}
                                className="btn"
                                style={{ background: "rgba(246, 211, 121, 1)" }}
                              >
                                {isSubmitting ? (
                                  <>
                                    <i
                                      className="fa fa-spinner fa-spin"
                                      style={{ fontSize: 24 }}
                                    />
                                  </>
                                ) : (
                                  "Update Property"
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProperty;
