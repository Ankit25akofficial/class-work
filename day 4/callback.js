// A callback is a function passed into another function as an argument, which is called (executed) after a task is completed or when a specific event occurs..

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
