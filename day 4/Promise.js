// A Promise is used to handle asynchronous operations. It promises to return a result later, either successfully or with an error..

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
