import { EMAIL, MIN_LENGTH } from "./Rules";

export const minlength = (length = 0) => ({
  type: MIN_LENGTH,
  payload: length,
});

export const email = () => ({
  type: EMAIL,
});

export const required = () => minlength(1);
