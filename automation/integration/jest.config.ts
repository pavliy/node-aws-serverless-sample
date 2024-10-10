const currentPath = 'automation/integration';

const jestConfig = {
	displayName: 'integration',
	projects: undefined,
	coverageDirectory: '<rootDir>/coverage/integration',
	moduleFileExtensions: ['js', 'json', 'ts'],
	extensionsToTreatAsEsm: ['.ts', '.tsx'],
	rootDir: '../../',
	testEnvironment: 'node',
	testMatch: [`<rootDir>${currentPath}/**/?(*.)+(spec|test).[jt]s?(x)`],
	transform: {
		'^.+\\.(t|j)sx?$': [
			'@swc/jest',
			{
				jsc: {
					target: 'es2022',
				},
			},
		],
	},
	collectCoverageFrom: ['<rootDir>/**/*.ts'],
	coveragePathIgnorePatterns: [
		`<rootDir>/${currentPath}/`,
		'coverage-ts',
		'__tests__',
		'build.ts',
		'esbuild.config.ts',
		'<rootDir>/jest.config.ts',
	],
	globalSetup: `<rootDir>${currentPath}/setup/jestGlobalSetup.ts`,
	globalTeardown: `<rootDir>${currentPath}/setup/jestGlobalTeardown.ts`,
};

export default jestConfig;
