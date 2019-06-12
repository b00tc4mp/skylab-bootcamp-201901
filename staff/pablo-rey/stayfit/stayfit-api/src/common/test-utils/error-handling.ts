import { GraphQLError } from "graphql";
import { expect } from "chai";

export function expectError (response: any, errorName?: string, errorMessage?: string ) {
  expect(response).to.have.property('errors').and.have.length;
  if (!response.errors) return false;
  const error = response.errors![0];
  expect(error).to.be.instanceof(GraphQLError);
  if (errorName) expect(error.originalError!.name).to.be.equal(errorName)
  if (errorMessage) expect(error.message).to.be.equal(errorMessage);
  return true  
}
