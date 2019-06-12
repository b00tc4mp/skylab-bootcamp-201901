import * as utils from './utils'
import * as chai from 'chai'
const { expect } = chai;


describe('random', () => {
  it('random array', () => {
    const array = new Array(100).fill(0).map(_ => `${Math.random()}`);
    
    const res = utils.random(array);
    expect(res).to.be.a('string');
    expect(res).to.be.oneOf(array);
  })
})