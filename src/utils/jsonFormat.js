export function jsonFormat(data) {
  if (data.data.data.length && data.data.data.length > 1) {
    const table = []
    for (let i = 0; i < data.data.data.length; i++) {
      table.push(JSON.parse(data.data.data[i]))
    }
    return table
  } else {
    return JSON.parse(data.data.data)
  }
}
