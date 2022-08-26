import { MIN_LENGTH } from "./Rules";

export const minlength = (length) => ({
  type: MIN_LENGTH,
  payload: length,
});
