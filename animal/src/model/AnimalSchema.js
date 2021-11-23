import { date, number, object, setLocale, string } from "yup";
import { ptForm } from "yup-locale-pt";
//
setLocale(ptForm);

export let AnimalSchema = object().shape({
  name: string().max(12).min(3).required(),
  type: string().required(),
  weight: number().positive().moreThan(0).required(),
  date: date().required(),
});
