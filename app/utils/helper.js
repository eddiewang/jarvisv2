export const capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const createPreview = (string, len) => {
  const cleanText = string.replace(/<\/?[^>]+(>|$)/g, '')
  const removeBr = cleanText.replace(/(&lt;|&gt;|\/&gt|tbody&gt;|&nbsp)/g, '')
  if (string.length > len) {
    return removeBr.slice(0, len) + '...'
  }
  return removeBr
}

export const checkEmpty = s => {
  const ns = s.replace(/<\/?[^>]+(>|$)/g, '')
  return ns.trim() === '' || ns.trim().length === 0
}

export const avatarApi = id => `https://api.adorable.io/avatars/150/${id}.png`

export const checkId = function (arr, id) {
  return arr.filter(function (obj) {
    return obj.id === id
  })
}
