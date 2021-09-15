import { ExecutorContext, ProjectConfiguration } from '@nrwl/devkit';
import { execSync } from 'child_process';
import { BuildExecutorSchema } from './schema';

export default async function runExecutor(options: BuildExecutorSchema, context: ExecutorContext) {
  const projectConfig: ProjectConfiguration = context.workspace.projects[context.projectName];
  execSync('dotnet build', {cwd: projectConfig.root, stdio: 'inherit'})
  return {
    success: true,
  };
}
