import { projectBuilder } from "@ethang/project-builder/project-builder.js";

await projectBuilder("sterett-qwik", "master", {
  preVersionBumpScripts: ["UPDATE"],
  postVersionBumpScripts: ["DEDUPE", "LINT", "BUILD"],
  isLibrary: false,
});
