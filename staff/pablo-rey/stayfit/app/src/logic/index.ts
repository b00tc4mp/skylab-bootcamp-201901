import gql from 'graphql-tag';
import jwt from 'jsonwebtoken';
import { TUser, TProvider } from './contexts/main-context';

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

  async registerUser(data: {
    name: string;
    surname: string;
    email: string;
    password: string;
    phone: string;
    providerId?: string;
  }) {
    const { name, surname, email, password, phone, providerId } = data;
    const mutation = gql`
    
    `;
    
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

  async attendSession(userId: string, sessionId: string, paymentType: string, status: string) {
    const mutation = gql`
      mutation AttendSession($data: AttendanceInput!) {
        attendSession(data: $data)
      }
    `;

    const { data, error } = await this.__gCall({
      mutation,
      variables: {
        data: {
          userId,
          sessionId,
          paymentType,
          status,
        },
      },
    });

    return data.attendSession;
  },

  async listProviders(): Promise<TProvider[]> {
    const query = gql`
      query {
        listProvidersPublicInfo {
          id
          name
          bannerImageUrl
          portraitImageUrl
          registrationUrl
        }
      }
    `;
    const { data, error } = await this.__gCall({
      query,
    });

    return data.listProvidersPublicInfo;
  },

  async listMyProviders(): Promise<any> {
    const query = gql`
      query {
        listMyProvidersInfo {
          provider {
            id
            name
          }
          customerOf
          adminOf
          coachOf
          request {
            status
          }
        }
      }
    `;
    const { data, error } = await this.__gCall({
      query,
    });
    return data.listMyProvidersInfo;
  },

  async updateRequestCustomer(userId: string, providerId: string, status: string) {
    const mutation = gql`
      mutation UpdateRequestCustomer($userId: String!, $providerId: String!, $status: String!) {
        updateRequestCustomer(userId: $userId, providerId: $providerId, status: $status)
      }
    `;
    const { data, error } = await this.__gCall({
      mutation,
      variables: {
        userId,
        providerId,
        status,
      },
    });
    return data.updateRequestCustomer;
  },
  async retrieveRequestCustomer(userId: string, providerId: string) {
    const query = gql`
      query RetrieveRequestCustomer($userId: String!, $providerId: String!) {
        retrieveRequestCustomer(userId: $userId, providerId: $providerId) {
          status
          type
        }
      }
    `;
    const { data, error } = await this.__gCall({
      query,
      variables: {
        userId,
        providerId,
      },
    });
    return data.retrieveRequestCustomer;
  },
};
