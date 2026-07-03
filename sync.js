const { execSync } = require("child_process");

function run(cmd) {
  try {
    return execSync(cmd, {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    }).trim();
  } catch (err) {
    throw new Error(err.stderr?.toString() || err.message);
  }
}

console.log("🔍 Checking git status...");

let status;

try {
  status = execSync("git status --porcelain -z", {
    encoding: "utf8",
  });
} catch (err) {
  console.error("❌ Failed to get git status.");
  process.exit(1);
}

if (!status) {
  console.log("✅ No changes detected.");
  process.exit(0);
}

// Parse git output safely
const entries = status.split("\0").filter(Boolean);

const files = [];

for (let i = 0; i < entries.length; i++) {
  const entry = entries[i];

  const code = entry.slice(0, 2).trim();
  let file = entry.slice(3);

  // Handle renamed files
  if (code.startsWith("R")) {
    file = entries[++i];
  }

  files.push({
    code,
    file,
  });
}

console.log("\n📂 Changed files:\n");

files.forEach((f) => {
  console.log(`${f.code.padEnd(2)} ${f.file}`);
});

for (const { code, file } of files) {
  let message = "Update";

  switch (code) {
    case "A":
    case "??":
      message = "Add";
      break;

    case "M":
      message = "Update";
      break;

    case "D":
      message = "Delete";
      break;

    default:
      if (code.startsWith("R")) {
        message = "Rename";
      }
  }

  console.log(`\n📄 ${file}`);

  try {
    if (code === "D") {
      run(`git add -u "${file}"`);
    } else {
      run(`git add "${file}"`);
    }

    run(`git commit -m "${message}: ${file}"`);

    console.log(`✅ ${message}: ${file}`);
  } catch (err) {
    console.error(`❌ Failed for ${file}`);
    console.error(err.message);
  }
}

console.log("\n🚀 Pushing to GitHub...");

try {
  execSync("git push origin main", {
    stdio: "inherit",
  });

  console.log("\n🎉 Successfully pushed!");
} catch (err) {
  console.error("\n❌ Push failed.");
}
