#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");

const allSkills = [
  "required-reading",
  "required-reading-software-engineering",
  "required-reading-architecture",
  "required-reading-testing",
  "required-reading-security",
  "required-reading-devops",
  "required-reading-data-engineering",
  "required-reading-delivery",
  "required-reading-product",
  "required-reading-ux",
  "required-reading-leadership",
  "required-reading-ai",
  "required-reading-api",
  "required-reading-fundamentals",
  "required-reading-cryptography",
  "required-reading-distributed",
  "required-reading-documentation",
  "required-reading-offensive-security",
  "required-reading-performance",
  "required-reading-platform",
  "required-reading-secops",
];

const skillsBase = path.join(os.homedir(), ".claude", "skills");
const srcBase = path.join(__dirname, "..", "skills");

function installSkill(skillName) {
  const destDir = path.join(skillsBase, skillName);
  const srcFile = path.join(srcBase, skillName, "SKILL.md");
  const destFile = path.join(destDir, "SKILL.md");

  if (!fs.existsSync(srcFile)) {
    console.error(`  Warning: ${srcFile} not found, skipping.`);
    return false;
  }

  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(srcFile, destFile);
  return true;
}

try {
  console.log("\n  Installing required-reading v3.0.0...\n");

  let installed = 0;
  for (const skill of allSkills) {
    const success = installSkill(skill);
    if (success) {
      const label = skill === "required-reading" ? "core" : "domain";
      console.log(`  [${label}] ${skill} installed`);
      installed++;
    }
  }

  if (installed === 0) {
    throw new Error("No skill files found in package.");
  }

  console.log(`\n  ${installed} skill(s) installed.\n`);
  console.log("  Skill files copied to:");
  console.log(`  ${skillsBase}/\n`);
  console.log("  Claude Code will now enforce professional engineering");
  console.log("  standards across all 20 domains whenever you write,");
  console.log("  review, design, or plan software.\n");
  console.log("  Domain specialists are available for deep-dive reviews");
  console.log("  and multi-agent Team Mode.\n");
} catch (err) {
  console.error("\n  Installation failed:", err.message);
  console.error("\n  You can install manually:");
  console.error(`  mkdir -p ${path.join(skillsBase, "required-reading")}`);
  console.error(
    `  Then copy SKILL.md from the package to ${path.join(skillsBase, "required-reading", "SKILL.md")}\n`
  );
  process.exit(1);
}
