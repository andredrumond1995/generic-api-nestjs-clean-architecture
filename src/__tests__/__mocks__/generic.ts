import { Test } from '@nestjs/testing';

export const factoryTestProvider = async (providers: any[], modules: any[]) => {
  const moduleFromNestTest = await Test.createTestingModule({
    providers,
  }).compile();
  let injectedModules: any = {};
  for (let moduleForTesting of modules) {
    const testingModule = moduleFromNestTest.get<typeof moduleForTesting.module>(moduleForTesting.module);
    let currentModule = {};
    currentModule[`${moduleForTesting.name}`] = testingModule;
    injectedModules = { ...injectedModules, ...currentModule };
  }
  return injectedModules;
};
