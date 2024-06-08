const jestConfig = {
	collectCoverageFrom: ['<rootDir>/**/*.ts'],
	coveragePathIgnorePatterns: [
		'build.ts',
		'coverage-ts',
		'node_modules',
		'jest.config.ts',
		'esbuild.config.ts',
		'<rootDir>/automation',
	],
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: '.',
	testMatch: ['**/?(*.)spec.ts', '**/?(*.)test.ts'],
	testEnvironment: 'node',
	extensionsToTreatAsEsm: ['.ts'],
	transform: {
		'^.+\\.(t|j)sx?$': '@swc/jest',
	}
};

export default jestConfig;
