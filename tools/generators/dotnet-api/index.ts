import { Tree, formatFiles, installPackagesTask, addProjectConfiguration } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';
import { execSync } from 'child_process';
import { mkdirSync } from 'fs';

export default async function (tree: Tree, schema: any) {
  const directory = `apps/${schema.name}`;
  mkdirSync(directory)
  execSync('dotnet new webapi', {cwd: directory, stdio: 'inherit'})
  addProjectConfiguration(tree, schema.name, {
    root: directory,
    sourceRoot: directory,
    projectType: 'application',
    targets: {
      build: {
        executor: '@nrwl/run-commands',
        outputs: [`directory/bin`],
        options: {
          command: 'dotnet build',
          cwd: directory
        }
      },
      serve: {
        "executor": "@nrwl/workspace:run-commands",
        "outputs": [],
        "options": {
          "command": "dotnet watch run",
          "cwd": directory
        }
      }
    }
  })
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
