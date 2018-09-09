import { NewsModule } from './news.module';

describe('NewsModule', () => {
  let audioModule: NewsModule;

  beforeEach(() => {
    audioModule = new NewsModule();
  });

  it('should create an instance', () => {
    expect(audioModule).toBeTruthy();
  });
});
