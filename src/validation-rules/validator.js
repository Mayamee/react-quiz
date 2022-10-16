import { EMAIL, MAX_LENGTH, MIN_LENGTH, ONLY_ENGLISH_EMAIL } from './rules'

export default function validator(rule, value) {
  if (rule.type === MIN_LENGTH) {
    return value.trim().length >= rule.payload
  }
  if (rule.type === MAX_LENGTH) {
    return value.trim().length <= rule.payload
  }
  if (rule.type === EMAIL) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    )
  }
  if (rule.type === ONLY_ENGLISH_EMAIL) {
    return /^[a-zA-Z@._\d]+$/.test(value.trim())
  }
  return true
}
