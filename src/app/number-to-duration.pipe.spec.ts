import { NumberToDurationPipe } from './number-to-duration.pipe';

describe('NumberToDurationPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberToDurationPipe();
    expect(pipe).toBeTruthy();
  });
});
