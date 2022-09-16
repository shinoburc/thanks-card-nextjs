import * as yup from "yup";

export const thanksCardFormSchema = yup
  .object({
    title: yup.string().required("title is a required field"),
    body: yup.string().required("email is a required field"),
    //fromId: yup.string().required(),
    fromId: yup.string(),
    toId: yup.string().required(),
  })
  .required();
export type ThanksCardFormData = yup.InferType<typeof thanksCardFormSchema>;
