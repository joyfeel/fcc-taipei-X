export const date = (postMilliseconds) => {
    const month = [' Jan. ', ' Feb. ', ' Mar. ', ' Apr. ', ' May. ', ' June. ', ' July. ', ' Aug. ',	' Sept. ', 	' Oct. ',	' Nov. ',	' Dec. ']
    const postDate = new Date(postMilliseconds)

    const y = postDate.getFullYear()
    const m = postDate.getMonth()
    const d = postDate.getDate()

    const postFormat = `${d} ${month[m]} ${y}`
    return postFormat
}

export const minsAgo =(secs) => {
  const m = Math.floor((secs % 3600)/(60))

  if(m === 1) {
    return `${m} min ago`
  } else {
    return `${m} mins ago`
  }
}

export const hrsAgo = (secs, postMilliseconds) => {
  const h = Math.floor((secs % (24*3600))/3600)

  if(h === 1) {
    return `${h} hr ago`
  } else {
    const postDate = new Date(postMilliseconds)
    const hr = postDate.getHours()
    const min = postDate.getMinutes()

    return `Today ${displayTime(hr)}:${displayTime(min)}`

  }
}

export const daysAgo = (postMilliseconds) => {
  const postDate = new Date(postMilliseconds)
  const hr = postDate.getHours()
  const min = postDate.getMinutes()

  return `Yesterday ${displayTime(hr)}:${displayTime(min)}`
}


function displayTime(time) {
  if(time < 10) {
    return ('0' + time)
  } else {
    return time
  }
}
