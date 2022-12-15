import { format } from 'date-fns'

export const clearMessage = async (time = 3000, setErrorMessage) => {
  const timerId = setTimeout(() => setErrorMessage(''), time)
  return timerId
}

export const navegateTime = async (
  time = 3000,
  navigate,
  path = '/login',
  data = {}
) => {
  const timerId = setTimeout(
    () => navigate(path, { replace: true, state: { data } }),
    time
  )
  return timerId
}

export const delay = async (time = 3000) => {
  return new Promise((resolve) => setTimeout(resolve, time))
}

export const dateRelative = (fechaPublicada) => {
  const publicationDate = new Date(fechaPublicada)
  console.log('publicationDate:', publicationDate)
  const currentDate = new Date()

  const msPerDay = 1000 * 60 * 60 * 24
  const diffTime = Math.abs(currentDate - publicationDate)
  const diffDays = Math.round(diffTime / msPerDay)
  console.log('diffDays:', diffDays)
  const esRtf = new Intl.RelativeTimeFormat('es-ES', {
    numeric: 'auto'
  })
  if (diffDays >= 30) {
    return esRtf.format(Math.ceil(-diffDays / 30), 'month')
  } else {
    return esRtf.format(-diffDays, 'day')
  }
}
