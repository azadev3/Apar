import * as yup from "yup";

export const PartnerFormSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is a required field")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Such things are not allowed in e-mail"),
  businessName: yup.string().required("Business name is a required field"),
  record: yup.string(),
});
