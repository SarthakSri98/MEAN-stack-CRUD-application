import { AngularModuleModule } from './angular-module.module';

describe('AngularModuleModule', () => {
  let angularModuleModule: AngularModuleModule;

  beforeEach(() => {
    angularModuleModule = new AngularModuleModule();
  });

  it('should create an instance', () => {
    expect(angularModuleModule).toBeTruthy();
  });
});
