import gql from 'graphql-tag';
import jwt from 'jsonwebtoken';

export default {
  gqlClient: null,

  async __gCall({ query, mutation, variables }) {
    let context;
    if (this.refreshToken) {
      context = {
        headers: {
          Authorization: 'Bearer ' + this.refreshToken,
        },
      };
    }

    if (query) {
      return await this.gqlClient.query({
        query,
        variables,
        context,
      });
    } else {
      return await this.gqlClient.mutate({
        mutation,
        variables,
        context,
      });
    }
  },

  async login(email: string, password: string) {
    const mutation = gql`
      mutation Login($email: String!, $password: String!) {
        login(input: { email: $email, password: $password }) {
          accessToken
          refreshToken
        }
      }
    `;
    const { data, error } = await this.__gCall({
      mutation,
      variables: {
        email,
        password,
      },
    });
    if (error) throw new Error(error.message);
    const refreshToken: string = data.login.refreshToken;
    const accessToken: string = data.login.accessToken;
    const decodedToken = await jwt.decode(refreshToken);
    const { userId, role } = decodedToken;
    return { refreshToken, accessToken, userId, role };
  },

  async availableSessions(providerId: string, day: string) {
    const query = gql`
      query ListSessions($providerId: String!, $day: String!) {
        listMyAvailableSessions(providerId: $providerId, day: $day) {
          id
          title
          coaches {
            name
          }
          startTime
          endTime
          maxAttendants
          type {
            title
          }
          status
        }
      }
    `;
    const { data, error } = await this.__gCall({
      query,
      variables: {
        providerId,
        day,
      },
    });
    return data.listMyAvailableSessions;
  },
};
