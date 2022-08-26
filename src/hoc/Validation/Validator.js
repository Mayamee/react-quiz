import { MIN_LENGTH } from "./Rules";

export default function validator(rule, value) {
  if (rule.type === MIN_LENGTH) {
    return value.length >= rule.payload;
  }
  return true;
}
