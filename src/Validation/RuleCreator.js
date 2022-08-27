import { EMAIL, MAX_LENGTH, MIN_LENGTH } from "./Rules";

export const minLength = (length = 0) => ({
  type: MIN_LENGTH,
  payload: length,
});

export const maxLength = (length = 20) => ({
  type: MAX_LENGTH,
  payload: length,
});

export const email = () => ({
  type: EMAIL,
});

export const required = () => minLength(1);
