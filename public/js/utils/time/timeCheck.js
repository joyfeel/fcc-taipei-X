import timeMilliseconds from './timeMilliseconds'
import { date, daysAgo, minsAgo, hrsAgo } from './timeFormat'

const { aMin, anHour, aDay, twoDays } = timeMilliseconds

const timeCheck = (secs, milliseconds, postMilliseconds, twelveOclock) => {

  if((milliseconds - twelveOclock - aDay) > 0) {
    return date(postMilliseconds)
  }//判斷前天以前

  if(milliseconds > twelveOclock) {
    return daysAgo(postMilliseconds)
  }//判斷昨天

  if(milliseconds < aMin) {
    return 'A few secs ago'
  }//判斷是否滿一分鐘

  if(milliseconds < anHour) {
    return minsAgo(secs)
  }//判斷未滿一小時

  if(milliseconds < aDay) {
    return hrsAgo(secs, postMilliseconds)
  }//判斷未滿一天
}

export default timeCheck
