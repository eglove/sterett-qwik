import { projectBuilder } from "@ethang/project-builder/project-builder.js";

await projectBuilder("sterett-qwik", "master", {
  preVersionBumpScripts: ["UPDATE", "PRUNE"],
  postVersionBumpScripts: ["DEDUPE", "LINT", "BUILD"],
  isLibrary: false,
});
