import * as dotenv from 'dotenv'
dotenv.config();
import * as chai from 'chai';
const expect = chai.expect;

describe('environment variables', () => {
  const {
    env: { PORT }, 
  } = process; 
  
  it('should exist the correct environment variables', () => {
    expect(PORT).not.to.be.undefined;
    expect(PORT).to.be.a('string');
    expect(Number(PORT)).not.to.be.NaN;
  });
});