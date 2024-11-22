export function getFileBlobUrl(file) {
  if (!file) {
      console.error('No file provided.');
      return;
  }
  // Create a Blob URL from the file
  const blobUrl = URL.createObjectURL(file);
  return blobUrl;

}

export function formatVND(number) {
  let result = Number(number)
  if (!result) {
    result = 0
  }
  return result.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND'
  });
}


/**
 * Truncate a UUID to the specified length.
 * 
 * @param {string} uuid - The UUID to be truncated.
 * @param {number} length - The number of characters to keep from the start of the UUID.
 * @returns {string} - The truncated UUID.
 */
export function truncateUUID(id, length = 8) {
  if (typeof id == 'string') {
    return id.substring(0, length);
  }
  return id
}


export const convertDates = (dateArray) => {
  return dateArray.map(dateStr => {
      let date = new Date(dateStr);
      return date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
  });
}