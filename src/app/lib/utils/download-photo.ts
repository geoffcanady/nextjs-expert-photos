export const downloadPhoto = (
  photoUrl: string,
  filenamePrefix: string = "photo"
) => {
  if (!photoUrl) {
    console.error("No photo available to download.");
    return;
  }

  // Get the current date
  const date = new Date();

  // Extract month, day, and year, ensuring two digits for month and day
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const dd = String(date.getDate()).padStart(2, "0");
  const yy = String(date.getFullYear()).slice(-2); // Get last two digits of the year

  // Format the date as mm-dd-yy
  const formattedDate = `${mm}-${dd}-${yy}`;

  // Create the filename with the formatted date
  const filename = `${filenamePrefix}_${formattedDate}.png`;

  // Create a temporary anchor element
  const link = document.createElement("a");
  link.href = photoUrl;

  // Set the download attribute with the formatted filename
  link.download = filename;

  // Append the link to the body
  document.body.appendChild(link);

  // Programmatically click the link to trigger the download
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);
};
