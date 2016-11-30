import timeCheck from './timeCheck'

export function formatDate(isoDate) {
  //Post date convert to unix time
  const postMilliseconds = Date.parse(isoDate)
  //Convert local time
  const now = new Date()
  const nowStr = now.toLocaleDateString()
  // Covert local time to milliseconds
  const midNightmilliSecs = Date.parse(nowStr)
  // Get 00:00, milliseconds
  const twelveOclock = Date.now() - midNightmilliSecs

  //how many milliseconds ago
  const milliseconds = Date.now() - postMilliseconds

  //get secs
  const secs = (milliseconds) / 1000

  return timeCheck(secs, milliseconds, postMilliseconds, twelveOclock)
}
