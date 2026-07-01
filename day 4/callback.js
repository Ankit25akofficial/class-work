function download(callback) {
  console.log("Downloading...");

  setTimeout(() => {
    console.log("Download Complete");
    callback(); // Run after download completes
  }, 2000);
}

function openFile() {
  console.log("Opening File...");
}

download(openFile);
