import gql from 'graphql-tag';
import jwt from 'jsonwebtoken';
import { TUser } from './contexts/main-context';

export default {
  gqlClient: null,
  token: null,

  async __gCall({ query, mutation, variables }) {
    let context;
    if (this.token) {
      context = {
        headers: {
          Authorization: 'Bearer ' + this.token,
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

  async retrieveMe(): Promise<TUser> {
    const query = gql`
      query {
        me {
          id
          name
          customerOf {
            id
            name
          }
          adminOf {
            id
            name
          }
        }
      }
    `;
    const { data, error } = await this.__gCall({
      query,
    });
    return data.me;
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
