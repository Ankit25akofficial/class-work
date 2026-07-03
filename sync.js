const { execSync } = require("child_process");
const readline = require("readline");

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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

(async () => {
  console.log("🔍 Checking git status...");

  let status;

  try {
    status = execSync("git status --porcelain -z", {
      encoding: "utf8",
    });
  } catch (err) {
    console.error("❌ Failed to get git status.");
    rl.close();
    process.exit(1);
  }

  if (!status) {
    console.log("✅ No changes detected.");
    rl.close();
    process.exit(0);
  }

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

  files.forEach((f, index) => {
    console.log(`${index + 1}. ${f.file}`);
  });

  const choice =
    (
      await ask(`
Choose commit option:

1. One custom message for ALL files
2. Custom message for EACH file
3. Automatic file names (default)

Press Enter for option 3: `)
    ).trim() || "3";

  let commonMessage = "";

  if (choice === "1") {
    commonMessage = (await ask("\nEnter commit message: ")).trim();

    if (!commonMessage) {
      console.log("❌ Commit message cannot be empty.");
      rl.close();
      return;
    }
  }

  for (const { code, file } of files) {
    let action = "Update";

    switch (code) {
      case "A":
      case "??":
        action = "Add";
        break;

      case "M":
        action = "Update";
        break;

      case "D":
        action = "Delete";
        break;

      default:
        if (code.startsWith("R")) {
          action = "Rename";
        }
    }

    let commitMessage;

    if (choice === "1") {
      commitMessage = commonMessage;
    } else if (choice === "2") {
      const input = await ask(
        `\nCommit message for "${file}"\n(Press Enter for "${action}: ${file}"):\n> `,
      );

      commitMessage = input.trim() || `${action}: ${file}`;
    } else {
      // Default option (3)
      commitMessage = `${action}: ${file}`;
    }

    console.log(`\n📄 ${file}`);

    try {
      if (code === "D") {
        run(`git add -u "${file}"`);
      } else {
        run(`git add "${file}"`);
      }

      run(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`);

      console.log(`✅ ${commitMessage}`);
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

    console.log("\n🎉 Successfully pushed to GitHub!");
  } catch (err) {
    console.error("\n❌ Push failed.");
  }

  rl.close();
})();
