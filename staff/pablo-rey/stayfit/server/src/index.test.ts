import * as chai from 'chai';
import * as dotenv from 'dotenv';
import * as isURL from 'validator/lib/isURL';
dotenv.config();
const expect = chai.expect;

describe('environment variables', () => {
  const {
    env: { PORT, MONGODB_URL },
  } = process;

  it('should exist the correct url settings', () => {
    expect(MONGODB_URL).not.to.be.undefined;
    expect(MONGODB_URL).to.be.a('string');
    expect(isURL(MONGODB_URL!, { protocols: ['mongodb'], require_tld: false })).to.be.true;
  });

  it('should exist the correct port settings', () => {
    expect(PORT).not.to.be.undefined;
    expect(PORT).to.be.a('string');
    expect(Number(PORT)).not.to.be.NaN;
  });
});
