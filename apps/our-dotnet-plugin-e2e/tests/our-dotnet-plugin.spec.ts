import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('our-dotnet-plugin e2e', () => {
  it('should create our-dotnet-plugin', async () => {
    const plugin = uniq('our-dotnet-plugin');
    ensureNxProject(
      '@modernity/our-dotnet-plugin',
      'dist/libs/our-dotnet-plugin'
    );
    await runNxCommandAsync(
      `generate @modernity/our-dotnet-plugin:our-dotnet-plugin ${plugin}`
    );

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Executor ran');
  }, 120000);

  describe('--directory', () => {
    it('should create src in the specified directory', async () => {
      const plugin = uniq('our-dotnet-plugin');
      ensureNxProject(
        '@modernity/our-dotnet-plugin',
        'dist/libs/our-dotnet-plugin'
      );
      await runNxCommandAsync(
        `generate @modernity/our-dotnet-plugin:our-dotnet-plugin ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
    }, 120000);
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async () => {
      const plugin = uniq('our-dotnet-plugin');
      ensureNxProject(
        '@modernity/our-dotnet-plugin',
        'dist/libs/our-dotnet-plugin'
      );
      await runNxCommandAsync(
        `generate @modernity/our-dotnet-plugin:our-dotnet-plugin ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
    }, 120000);
  });
});
