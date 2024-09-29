/* eslint-disable no-console */
const globalTeardown = async (config: any): Promise<void> => {
    try {
     console.info('\n', 'Executing teardown for tests');
     if (config.watch || config.watchAll) {
      return;
     }
   
     await Promise.all(global.containers.map((container) => container.stop({ timeout: 10000 })));
   
     console.info('\n', 'Teardown completed');
    } catch (error) {
     console.error('\n', 'Teardown failed', JSON.stringify(error));
    }
   };
   
   export default globalTeardown;