import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import MyHelmet from "../../Reuseable/Helmet";
import PageTitle from "../../Reuseable/PageTitle";
import AddAmenity from "./Modal";
import propertiesDashService from "../../Services/propertiesDashService";
import ImageUpload from "../../Reuseable/Uploaders/ImageUpload";
import CustomMaps from "./CustomMaps";
import { useNavigate } from "react-router-dom";
import Auth from "../../Services/authDashService";
import { notifySuccess } from "../../utils/toast.js";

const AddProperties = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const authTokenssss = urlParams.get("ase");

  const getAuthData = (authData) => {
    Auth.getUserDataByAuth(null, authData)
      .then((res) => {
        localStorage.setItem("authUser", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("error on api geting auth user");
      });
  };

  useLayoutEffect(() => {
    if (authTokenssss) {
      getAuthData(authTokenssss);
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    const authToken = localStorage.getItem("authToken");
    if (authToken !== null) {
      getAuthData(authToken);
    } else {
      // Handle the case when 'authToken' is null
      console.error("authToken is null");
      navigate("/");
    }
  }, []);
  const [isSearching, setIsSeraching] = useState(false);
  const autocompleteRef = useRef(null);
  const [imageError, setImageError] = useState("");
  const [PriceError, setPriceError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [propertynameError, setPropertyNameError] = useState("");
  const [cityError, setCityError] = useState("");
  const [areaError, setAreaError] = useState("");
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [showResults, setShowResults] = useState(false);
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
        setShowResults(false); // Hide results when clicking outside
       
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

  const [uploading, setUploading] = useState(false);
  const [isRent, setIsRent] = useState(true);
  const [isBuy, setIsBuy] = useState(false);
  const [activeTab, setActiveTab] = useState("tab-1");
  const [selectedValue, setSelectedValue] = useState("15");
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

  const [areaLang, setAreaLang] = useState("");
  const [areaLong, setAreaLong] = useState("");

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAnyStateEmpty = () => {
    return (
      selectCity === "" ||
      selectedArea === "" ||
      name === "" ||
      price === "" ||
      propertySize === "" ||
      phoneNumber === ""
    );
  };

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

  const handlePhoneNumberChange = (event) => {
    const newValue = event.target.value.replace(/\D/g, "").slice(0, 11);
    setPhoneNumber(newValue);
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

  useEffect(() => {
    getCitties();
  }, []);

  const handelSubmitProperty = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (price === null || price === undefined || price === 0 || price === "") {
      setPriceError("Please Enter the price");
      setIsSubmitting(false);
      return;
    } else {
      setPriceError("");
      setIsSubmitting(false);
    }
    if (
      personName === null ||
      personName === undefined ||
      personName === 0 ||
      personName === ""
    ) {
      setNameError("Please enter your name");
      setIsSubmitting(false);
      return;
    } else {
      setNameError("");
      setIsSubmitting(false);
    }
    if (
      phoneNumber === null ||
      phoneNumber === undefined ||
      phoneNumber === 0 ||
      phoneNumber === ""
    ) {
      setPhoneError("Please enter a valid phone");
      setIsSubmitting(false);
      return;
    } else {
      setPhoneError("");
      setIsSubmitting(false);
    }
    if (
      propertyDetails === null ||
      propertyDetails === undefined ||
      propertyDetails === 0 ||
      propertyDetails === ""
    ) {
      setDescriptionError("Please enter property description");
      setIsSubmitting(false);
      return;
    } else {
      setDescriptionError("");
      setIsSubmitting(false);
    }
    if (name === null || name === undefined || name === 0 || name === "") {
      setPropertyNameError("Please enter property title");
      setIsSubmitting(false);
      return;
    } else {
      setPropertyNameError("");
      setIsSubmitting(false);
    }
    if (
      selectCity === null ||
      selectCity === undefined ||
      selectCity === 0 ||
      selectCity === ""
    ) {
      setCityError("Please select a city");
      setIsSubmitting(false);
      return;
    } else {
      setCityError("");
      setIsSubmitting(false);
    }
    if (
      selectedArea === null ||
      selectedArea === undefined ||
      selectedArea === 0 ||
      selectedArea === ""
    ) {
      setAreaError("Please enter valid area");
      setIsSubmitting(false);
      return;
    } else {
      setAreaError("");
      setIsSubmitting(false);
    }
    if (images.length === 0) {
      setImageError("Please Upload an Image");
      setIsSubmitting(false);
    } else {
      setIsSubmitting(true);
      const body = {
        name: name,
        property_category_id: parseInt(selectedValue),
        user_id: userId,
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
        .addProperty(body)
        .then((res) => {
          setIsSubmitting(false);
          notifySuccess("Property Submitted Successfully!");
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
    }
  };

  return (
    <>
      <MyHelmet title="Add Properties" />

      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <PageTitle pagename="Add Properties" />
              <div className="col-12">
                <section className="mt-xxl-5 mt-xl-5">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6 col-lg-2 col-xxl-2 invisible" />
                      <div className="col-md-6 col-lg-8  col-xxl-8">
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
                                  ? "btn rounded-0 PurpseButtonOne px-4 py-2 box-shadow-unset"
                                  : "btn rounded-0 PurpseButtonSecond px-4 py-2 box-shadow-unset"
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
                                  ? "btn rounded-0 ms-xxl-3 ms-4 ms-xl-4 PurpseButtonSecond px-4 py-2 box-shadow-unset"
                                  : "btn rounded-0 ms-xxl-3 ms-4 ms-xl-4 PurpseButtonOne px-4 py-2 box-shadow-unset"
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
                      <div className="col-md-6 col-lg-8  col-xxl-8 mt-xl-5">
                        <div>
                          <h5
                            className="mb-3 mt-sm-3"
                            style={{
                              fontFamily: "Inter, sans-serif",
                              color: "rgba(0, 0, 0, 0.9)",
                            }}
                          >
                            Select Property Type
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
                                  className={`nav-link px-4  px-lg-5 ${
                                    activeTab === "tab-1" ? "active" : ""
                                  }`}
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
                                    className={`nav-link px-4  px-lg-5 ${
                                      activeTab === "tab-2" ? "active" : ""
                                    }`}
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
                                  className={`nav-link ${
                                    activeTab === "tab-3" ? "active" : ""
                                  }`}
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
                                    <div className="d-flex align-items-center">
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
                                    </div>
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
                                    <div className="d-flex align-items-center">
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
                                    </div>
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
                                    <div className="d-flex align-items-center">
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
                                    </div>
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
                                    <div className="d-flex align-items-center">
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
                                    </div>
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
                                    className={`btn rounded-0 btnBorders ${
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
                                    className={`btn rounded-0 btnBorders ${
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
                                    className={`btn rounded-0 btnBorders ${
                                      selectedValue === "13"
                                        ? "selectedPropertyType"
                                        : ""
                                    }`}
                                    type="button"
                                    onClick={() => handleButtonClick("13")}
                                  >
                                    <img
                                      selectedValue
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
                                    className={`btn rounded-0 btnBorders ${
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
                                    className={`btn rounded-0 btnBorders ${
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
                                    <span className="ps-1">Plot File</span>
                                  </button>
                                  <button
                                    className={`btn rounded-0 btnBorders ${
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
                                    className={`btn rounded-0 btnBorders ${
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
                                    className={`btn rounded-0 btnBorders ${
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
                                    className={`btn rounded-0 btnBorders ${
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
                                    className={`btn rounded-0 btnBorders ${
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
                                    className={`btn rounded-0 btnBorders ${
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
                        <img
                          className="mb-2"
                          src="/assets/images/addProperty/property-price.png"
                          alt=""
                          width="30"
                        />
                        <h6>Property Price &amp; Area</h6>
                      </div>
                      <div className="col-md-6 col-lg-8  col-xxl-8 mt-xl-5">
                        <div className="">
                          <div className="row">
                            <div className="col-xl-12">
                              <div>
                                <h5 style={{ color: "rgba(0, 0, 0, 0.9)" }}>
                                  Select City
                                </h5>
                                <select
                                  value={selectCityId}
                                  onChange={(e) => handelSetCity(e)}
                                  className="form-control pt-xl-2 ps-xl-2 pb-xl-2 pe-xl-2"
                                  style={{
                                    width: "75%",
                                    border: "1px solid #000",
                                  }}
                                >
                                  <option value="">Select City</option>
                                  {cities?.map((city) => (
                                    <option name={city.name} value={city.id}>
                                      {city.name}
                                    </option>
                                  ))}
                                </select>

                                {cityError !== "" ? (
                                  <span style={{ color: "red" }}>
                                    {cityError}
                                  </span>
                                ) : (
                                  ""
                                )}
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
                                        zIndex: 999
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
                                {areaError !== "" ? (
                                  <span style={{ color: "red" }}>
                                    {areaError}
                                  </span>
                                ) : (
                                  ""
                                )}
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
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className="mt-5" />

                  <div className="container pt-xl-3">
                    <div className="row">
                      <div
                        style={{ placeSelf: "center" }}
                        className="col-md-6 col-lg-2 col-xxl-2"
                      >
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
                      <div className="col-md-6 col-xl-8  col-xxl-8">
                        <div className="">
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
                                    placeholder="Enter Size"
                                    value={propertySize}
                                    onChange={(e) =>
                                      setPropertSize(e.target.value)
                                    }
                                    type="number"
                                    min="0"
                                    className="form-control border-0 rounded-0"
                                    aria-label="Text input with dropdown button"
                                  />
                                  <div className="dropdown dropdown-menu-en">
                                    <button
                                      className="btn btn-outline-secondary dropdown-toggle border-0 bg-dark rounded-0 text-white"
                                      type="button"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      {propertyAreaUnit !== ""
                                        ? propertyAreaUnit
                                        : "Select Unit"}
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
                                  type="number"
                                  min="0"
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
                                placeholder="Enter your asking price in Pkr"
                                onChange={(e) => {
                                  setPrice(e.target.value);
                                }}
                                type="number"
                                min="0"
                                style={{
                                  width: "75%",
                                  border: "1px solid rgba(0, 0, 0, 0.9)",
                                }}
                                className="form-control pt-xl-2 ps-xl-2 pb-xl-2 pe-xl-2 rounded-0"
                              />
                              {PriceError !== "" ? (
                                <span style={{ color: "red" }}>
                                  {PriceError}
                                </span>
                              ) : (
                                ""
                              )}
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
                              {propertynameError !== "" ? (
                                <span style={{ color: "red" }}>
                                  {propertynameError}
                                </span>
                              ) : (
                                ""
                              )}
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
                              {descriptionError !== "" ? (
                                <span style={{ color: "red" }}>
                                  {descriptionError}
                                </span>
                              ) : (
                                ""
                              )}
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
                                setUploading={setUploading}
                                imageError={imageError}
                              />

                              {imageError !== "" ? (
                                <span style={{ color: "red" }}>
                                  {imageError}
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr />
                  <div className="container pb-5">
                    <div className="row">
                      <div
                        style={{ placeSelf: "center" }}
                        className="col-md-6 col-lg-2 col-xxl-2"
                      >
                        <img
                          className="mb-2"
                          src="/assets/images/addProperty/contact-info.png"
                          alt=""
                          width="30"
                        />
                        <h6>Contact Information</h6>
                      </div>
                      <div className="col-md-6 col-lg-8  col-xxl-8">
                        <div className="">
                          <div className="row">
                            <div className="col-xl-12 pt-4 pt-xl-5">
                              <div>
                                <h5 style={{ color: "rgba(0, 0, 0, 0.9)" }}>
                                  Your Contact Number
                                </h5>
                              </div>
                              <input
                                placeholder="Provide your contact number"
                                value={phoneNumber}
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
                              {phoneError !== "" ? (
                                <span style={{ color: "red" }}>
                                  {phoneError}
                                </span>
                              ) : (
                                ""
                              )}
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
                              {nameError !== "" ? (
                                <span style={{ color: "red" }}>
                                  {nameError}
                                </span>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="col-xl-12 pt-4 pt-xl-5 resp-small">
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
                                  "Submit"
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

export default AddProperties;
