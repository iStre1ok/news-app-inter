export const getAllData = async () => {
  const response = await fetch('http://localhost:3001/data')
  const data = await response.json()
  return data
}
