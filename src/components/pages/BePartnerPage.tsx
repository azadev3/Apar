import React from "react";
import "../../styles/pages/bepartner.scss";
import { Form, Field, Formik } from "formik";
import { PartnerFormSchema } from "./bepartnershcema/Schema";
import { PartnersType } from "../homepage/uitilshomepage/OurPartners";
import Howtorideflag from "./whyridepageuitils/Howtorideflag";
import HowToRide from "../homepage/uitilshomepage/HowToRide";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import DownloadApp from "../homepage/uitilshomepage/DownloadApp";
import { api, option } from "../../Api";
import axios from "axios";
import { useLang } from "../../context/SelectedLanguage";
import { useTranslateApi } from "../../context/GetTranslateContext";
import { Autoplay, Pagination } from "swiper/modules";

import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HeaderLogoType } from "../header/Header";
import { useLogo } from "../../context/GetLogoContext";
import { useQuery } from "@tanstack/react-query";

type AdversimentType = {
  id: number;
  title: string;
  description: string;
  image: string;
};

type MoneyAndTimeType = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const BePartnerPage = () => {
  //if 768 small screens set new BlogPage section
  const [changeBlogpage, setChangeBlogPage] = React.useState<boolean>(false);

  React.useEffect(() => {
    const controlSize = () => {
      if (window.innerWidth <= 1290) {
        setChangeBlogPage(true);
      } else {
        setChangeBlogPage(false);
      }
    };

    controlSize();

    window.addEventListener("resize", controlSize);
    return () => {
      window.removeEventListener("resize", controlSize);
    };
  }, []);

  const { selectedLanguage } = useLang();
  const [partnerData, setPartnerData] = React.useState<PartnersType[]>([]);
  const [adversiment, setAdversiment] = React.useState<AdversimentType[]>([]);
  const [timeMoneyData, setTimeMoneyData] = React.useState<MoneyAndTimeType[]>([]);

  const { data: OurPartnersData } = useQuery({
    queryKey: ["OurPartnersData", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(api.our_partners, option(selectedLanguage));
      return response.data;
    },
    staleTime: 500000,
  });

  const { data: advarsementData } = useQuery({
    queryKey: ["advarsementData", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(api.korporativ_gedish, option(selectedLanguage));
      return response.data;
    },
    staleTime: 500000,
  });

  const { data: timeMoney } = useQuery({
    queryKey: ["timeMoney", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(api.gedishlere_nezaret, option(selectedLanguage));
      return response.data;
    },
    staleTime: 500000,
  });

  React.useEffect(() => {
    if (OurPartnersData) {
      setPartnerData(OurPartnersData);
    }
    if (advarsementData) {
      setAdversiment(advarsementData);
    }
    if (timeMoney) {
      setTimeMoneyData(timeMoney);
    }
  }, [OurPartnersData, advarsementData, timeMoney]);

  const { translatesWord } = useTranslateApi();

  const [hovered, setHovered] = React.useState<boolean>(false);

  const { logo } = useLogo();

  return (
    <div className="be-partner-page">
      <div className="be-partner-page-wrapper">
        <div className="top-content-bepartner-page">
          <div className="backg-wrapper">
            {logo.slice(4, 5).map((logo: HeaderLogoType, i: number) => (
              <img src={logo.bepartner_banner} key={i} loading="lazy" />
            ))}
          </div>

          <div className="form-and-text">
            <div className="left" style={{ marginBottom: "8rem" }}>
              {selectedLanguage === "az" ? (
                <h1 style={{ textTransform: "uppercase" }}>
                  fərqi <br /> hiss et
                </h1>
              ) : selectedLanguage === "ru" ? (
                <h1
                  style={{
                    textTransform: "uppercase",
                    fontSize: selectedLanguage === "ru" && !changeBlogpage ? "100px" : "",
                  }}>
                  Почувствуйте <br /> разницу
                </h1>
              ) : (
                <h1 style={{ textTransform: "uppercase" }}>
                  feel the <br /> difference
                </h1>
              )}
              <p>{translatesWord["be_partner_text"]}</p>
            </div>

            <div className="right">
              <Formik
                initialValues={{
                  email: "",
                  operatorCode: "",
                  phone: "",
                  businessName: "",
                  record: "",
                }}
                validationSchema={PartnerFormSchema}
                onSubmit={async (values) => {
                  const response = await axios.post(api.contact_post_req_api, values);
                  try {
                    if (response.data) {
                      toast.success(
                        `${
                          selectedLanguage === "az"
                            ? "Sorğunuz müvəffəqiyyətlə göndərildi."
                            : selectedLanguage === "ru"
                            ? "Ваш запрос успешно отправлен."
                            : "Your request has been sent successfully."
                        }`,
                        {
                          position: "bottom-right",
                          style: { background: "#FF9E5D", color: "#fff", fontWeight: "500", zIndex: "1000000000000" },
                        }
                      );
                    }
                  } catch (error) {
                    toast.error(
                      `${
                        selectedLanguage === "az"
                          ? "Xəta var. Lütfən yenidən yoxlayın..."
                          : selectedLanguage === "ru"
                          ? "Есть ошибка. Пожалуйста, проверьте еще раз..."
                          : "There is an error. Please check again..."
                      }`,
                      {
                        position: "top-center",
                      }
                    );
                    console.log(error, "post req error");
                  }
                }}>
                {(props) => (
                  <Form className="form-be-partner">
                    <ToastContainer transition={Zoom} autoClose={2500} />
                    <div className="title">
                      <h1>{translatesWord['form_title']}</h1>
                    </div>

                    <div className="email-input">
                      <Field
                        style={{
                          border:
                            props.touched.email && props.errors.email
                              ? "1px solid red"
                              : props.values.email
                              ? "1px solid green"
                              : "",
                        }}
                        type="email"
                        name="email"
                        id="email"
                        placeholder={selectedLanguage === "ru" ? "Электронная почта" : "Email"}
                      />
                      {props.errors.email && props.touched.email && (
                        <span className="error-msg">{props.errors.email}</span>
                      )}
                    </div>

                    <div className="phone-number-input">
                      <div className="left-operator-code">
                        {/* <Field
                      style={{
                        border:
                          props.touched.operatorCode && props.errors.operatorCode
                            ? "1px solid red"
                            : props.values.operatorCode ? '1px solid green' : '',
                      }}
                      type="text"
                      name="operatorCode"
                      id="operatorCode"
                      placeholder="051"
                    />
                    {props.errors.operatorCode && props.touched.operatorCode && (
                      <span className="error-msg">{props.errors.operatorCode}</span>
                    )} */}

                        <Field name="operatorCode" id="operatorCode" as="select">
                          <option value="051">051</option>
                          <option value="055">055</option>
                          <option value="050">050</option>
                          <option value="070">070</option>
                          <option value="077">077</option>
                          <option value="099">099</option>
                          <option value="010">010</option>
                        </Field>
                      </div>

                      <div className="right-phone-num">
                        <Field
                          style={{
                            border:
                              props.touched.phone && props.errors.phone
                                ? "1px solid red"
                                : props.values.phone
                                ? "1px solid green"
                                : "",
                          }}
                          type="number"
                          name="phone"
                          id="phone"
                          placeholder={
                            selectedLanguage === "az"
                              ? "Telefon nömrəsi"
                              : selectedLanguage === "ru"
                              ? "Номер телефона"
                              : "Phone number"
                          }
                        />
                      </div>
                    </div>

                    <div className="business-name-input">
                      <Field
                        style={{
                          border:
                            props.touched.businessName && props.errors.businessName
                              ? "1px solid red"
                              : props.values.businessName
                              ? "1px solid green"
                              : "",
                        }}
                        type="text"
                        name="businessName"
                        id="businessName"
                        placeholder={
                          selectedLanguage === "az"
                            ? "Biznesinizin adı"
                            : selectedLanguage === "ru"
                            ? "Наименование фирмы"
                            : "Business name"
                        }
                      />
                      {props.errors.businessName && props.touched.businessName && (
                        <span className="error-msg">{props.errors.businessName}</span>
                      )}
                    </div>

                    <div className="record-input">
                      <Field
                        type="text"
                        name="record"
                        id="record"
                        placeholder={
                          selectedLanguage === "az" ? "Mesajınız" : selectedLanguage === "ru" ? "Сообщение" : "Record"
                        }
                      />
                    </div>

                    <div className="submit-area">
                      <button
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        type="submit"
                        style={{ fontSize: selectedLanguage === "az" || "ru" ? "15px" : "" }}>
                        {translatesWord["apply_now_title"]}
                        <img src={hovered ? "../bbb.svg" : "../rrr.svg"} alt="" />
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>

        <div className="partner-section" style={{ marginTop: window.innerWidth < 568 ? "0px" : "" }}>
          <div className="left">
            <strong>{translatesWord["partner_section_title_one"]}</strong>
            <p>{translatesWord["partner_section_title_two"]}</p>
          </div>

          <div className="right">
            {partnerData.slice(0, 2).map((item: PartnersType, i: number) => (
              <div className="top" key={i}>
                <div className="wrappered">
                  <img src={item.image} alt="" />
                </div>
              </div>
            ))}
            {partnerData.slice(2, 4).map((item: PartnersType, i: number) => (
              <div className="bottom" key={i}>
                <div className="wrappered">
                  <img src={item.image} alt="" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="adversiments-swiper">
          <React.Fragment>
            {changeBlogpage ? (
              <Swiper
                className="mySwiper"
                spaceBetween={15}
                breakpoints={{
                  1200: {
                    slidesPerView: 3,
                  },
                  800: {
                    slidesPerView: 2,
                  },
                  200: {
                    slidesPerView: 1.5,
                  },
                }}
                pagination={true}
                modules={[Autoplay, Pagination]}
                // autoplay={{
                //   delay: 2000,
                //   pauseOnMouseEnter: false,
                // }}
              >
                {adversiment.map((item: AdversimentType, i: number) => (
                  <SwiperSlide key={i} className="item-adversiment-swiper">
                    <div className="adversiment-sw">
                      <div className="image-wrapper">
                        <img src={item.image} alt="" />
                      </div>
                      <div className="text">
                        <div className="title">
                          <h1>{item.title}</h1>
                        </div>

                        <div className="descript">
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="adversiments">
                {adversiment.map((item: AdversimentType, i: number) => (
                  <div key={i} className="item-adversiment">
                    <div className="image-wrapper">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="text">
                      <div className="title">
                        <h1>{item.title}</h1>
                      </div>

                      <div className="descript">
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </React.Fragment>
        </div>

        <div className="money-and-time">
          <div className="top">
            <div className="title">
              <h1>{translatesWord["save_time_money_title"]}</h1>
            </div>

            <p>{translatesWord["save_time_money_paragraph"]}</p>
          </div>

          <div className="bottom">
            {changeBlogpage ? (
              <Swiper
                modules={[Autoplay, Pagination]}
                pagination={true}
                autoplay={{
                  delay: 2000,
                }}
                className="mySwiper2"
                spaceBetween={15}
                slidesPerView={1.4}>
                {timeMoneyData.map((item: MoneyAndTimeType, i: number) => (
                  <SwiperSlide className="money-time-item-swiper" key={i}>
                    <div className="image-wrapper">
                      <img src={item.image} alt="" />
                    </div>

                    <div className="bottomtext">
                      <h1>{item.title}</h1>
                      <p>{item.description}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <>
                {timeMoneyData.map((item: MoneyAndTimeType, i: number) => (
                  <div className="money-time-item" key={i}>
                    <div className="image-wrapper">
                      <img src={item.image} alt="" />
                    </div>

                    <div className="bottomtext">
                      <h1>{item.title}</h1>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <Howtorideflag />
        <HowToRide />
        <DownloadApp />
      </div>
    </div>
  );
};

export default BePartnerPage;
