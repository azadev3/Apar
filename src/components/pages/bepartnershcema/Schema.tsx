import * as yup from "yup";

export const PartnerFormSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is a required field")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Such things are not allowed in e-mail"),
  phone: yup
    .string()
    .required("Number required field")
    .matches(/^[0-9]{7}$/, "Enter a valid phone number"),
  operatorCode: yup
    .string()
    .matches(/^[0-9]{3}$/, "Enter a valid phone number")
    .required("Required!"),
  businessName: yup.string().required("Business name is a required field"),
  record: yup.string(),
});
