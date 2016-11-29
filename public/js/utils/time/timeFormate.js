export const date = (postMilliseconds) => {
    const month = [' Jan. ', ' Feb. ', ' Mar. ', ' Apr. ', ' May. ', ' June. ', ' July. ', ' Aug. ',	' Sept. ', 	' Oct. ',	' Nov. ',	' Dec. ']
    const postDate = new Date(postMilliseconds)

    const y = postDate.getFullYear()
    const m = postDate.getMonth()
    const d = postDate.getDate()

    const postFormate = `${d} ${month[m]} ${y}`
    return postFormate
}


export const minsAgo =(secs) => {
  const m = Math.floor((secs % 3600)/(60))

  if(m === 1) {
    return `${m} min ago`
  } else {
    return `${m} mins ago`
  }
}

export const hrsAgo = (secs) => {
  const h = Math.floor((secs % (24*3600))/3600)

  if(h === 1) {
    return `${h} hr ago`
  } else {
    return `${h} hrs ago`
  }
}

export const daysAgo = (postMilliseconds) => {
  const postDate = new Date(postMilliseconds)
  const hr = postDate.getHours()
  const min = postDate.getMinutes()

  function displayTime(time) {
    if(time < 10) {
      return ('0' + time)
    } else {
      return time
    }
  }
  return `yesterday  ${displayTime(hr)}:${displayTime(min)}`
}
