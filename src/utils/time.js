export const clearMessage = async (time = 3000, setErrorMessage) => {
  const timerId = setTimeout(() => setErrorMessage(''), time)
  return timerId
}

export const navegateTime = async (time = 3000, navigate, path = '/login', data = {}) => {
  const timerId = setTimeout(() => navigate(path, { replace: true, state: { data } }), time)
  return timerId
}

export const delay = async (time = 3000) => {
  return new Promise(resolve => setTimeout(resolve, time))
}
