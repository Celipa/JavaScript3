//Test the meta data of the app
import { metadata } from '../layout'; // replace with the actual path to your file

describe('metadata', () => {
  it('should have a title', () => {
    expect(metadata.title).toBeDefined();
  });

  it('should have a description', () => {
    expect(metadata.description).toBeDefined();
  });
});