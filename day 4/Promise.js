function downloadFile() {
  return new Promise((resolve) => {
    console.log("Downloading file...");

    setTimeout(() => {
      resolve("Download completed");
    }, 2000);
  });
}

downloadFile().then((message) => {
  console.log(message);
});
