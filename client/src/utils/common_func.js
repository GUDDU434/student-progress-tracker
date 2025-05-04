export const formatDate = (dateStr, isTime) => {
  // Create a new Date object from the string
  const date = new Date(dateStr);

  // Format the date as DD-MM-YYYY in UTC
  const formattedDate = `${date.getUTCDate().toString().padStart(2, "0")}/${(
    date.getUTCMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${date.getUTCFullYear()}`;

  if (isTime) {
    // Format the time in 12-hour format with AM/PM in UTC
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12 || 12}:${minutes} ${period}`;

    return `${formattedDate} || ${formattedTime}`;
  }

  return `${formattedDate}`;
};

export const formatDateTimeIST = (date) => {
  if (!date) return "";
  const d = new Date(date);

  // Calculate IST (UTC+5:30) by adding the offset
  // const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
  const localDate = new Date(d.getTime());

  const pad = (n) => n.toString().padStart(2, "0");

  return `${localDate.getFullYear()}-${pad(localDate.getMonth() + 1)}-${pad(
    localDate.getDate()
  )}T${pad(localDate.getHours())}:${pad(localDate.getMinutes())}`;
};

export const formatDateTimeUTC = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const pad = (n) => n.toString().padStart(2, "0");

  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(
    d.getUTCDate()
  )}T${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`;
};

export const isStrongPassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password); // Any non-alphanumeric character

  return hasUpperCase && hasLowerCase && hasNumber && hasSymbol;
};
