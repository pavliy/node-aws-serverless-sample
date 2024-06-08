export const isDevEnvironment = [undefined, 'development', 'dev', 'system-tests'].includes(process.env.NODE_ENV);
export const isTrue = (itemToCheck: string | undefined): boolean =>
	['yes', 'true', '1'].includes(itemToCheck ?? 'false');