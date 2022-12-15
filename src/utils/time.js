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
  const publicationDate = new Date(
    format(Date.parse(fechaPublicada), 'yyyy-MM-dd')
  )
  const currentDate = new Date()

  const msPerDay = 1000 * 60 * 60 * 24
  const diffTime = Math.abs(currentDate - publicationDate)
  const diffDays = Math.ceil(diffTime / msPerDay)
  console.log(diffTime)
  const esRtf = new Intl.RelativeTimeFormat('es-ES', {
    numeric: 'auto'
  })
  return esRtf.format(-diffDays, 'day')
}
