import gql from 'graphql-tag';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { TProvider, TUser } from './contexts/main-context';

export default {
  gqlClient: null,
  providerId: null,
  get token() {
    const value = sessionStorage.refreshToken;
    if (value === 'null') return null;
    if (value === 'undefined') return undefined;
    return value;
  },

  set token(_token) {
    sessionStorage.refreshToken = _token;
  },

  __gCall({ query, mutation, variables }) {
    let context;
    if (this.token) {
      context = {
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      };
    }

    if (query) {
      return this.gqlClient.query({
        query,
        variables,
        context,
        fetchPolicy: 'no-cache',
      });
    } else {
      return this.gqlClient.mutate({
        mutation,
        variables,
        context,
        fetchPolicy: 'no-cache',
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

  async registerUser(userData: {
    name: string;
    surname: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    providerId?: string | null;
  }) {
    const { name, surname, email, password, phone, role, providerId } = userData;
    const mutation = gql`
      mutation RegisterUser(
        $name: String!
        $surname: String!
        $email: String!
        $phone: String!
        $password: String!
        $role: String!
        $providerId: String
      ) {
        createUser(
          data: {
            name: $name
            surname: $surname
            email: $email
            password: $password
            phone: $phone
            role: $role
            providerId: $providerId
          }
        )
      }
    `;

    const { data, error } = await this.__gCall({
      mutation,
      variables: {
        name,
        surname,
        email,
        password,
        phone,
        role,
        providerId,
      },
    });
    if (error) throw new Error(error[0]);
    return data.id;
  },

  async retrieveMe(): Promise<TUser> {
    const query = gql`
      query {
        me {
          id
          name
          surname
          role
          bannerImageUrl
          portraitImageUrl
          customerOf {
            id
            name
            bannerImageUrl
            portraitImageUrl
          }
          adminOf {
            id
            name
            coaches {
              id
              name
              surname
            }
            sessionTypes {
              id
              type
              title
              active
            }
            bannerImageUrl
            portraitImageUrl
          }
        }
      }
    `;
    const { data, error } = await this.__gCall({
      query,
    });
    if (error) throw new Error(error[0]);
    return data.me;
  },

  async retrieveProvider(providerId: string): Promise<TUser> {
    const query = gql`
      query RetrieveProvider($providerId: String!) {
        retrieveProvider(providerId: $providerId) {
          id
          name
          customers {
            id
            name
          }
        }
      }
    `;
    const { data, error } = await this.__gCall({
      query,
    });
    if (error) throw new Error(error[0]);
    return data.me;
  },

  async createSessions({
    title,
    provider,
    coaches,
    startTime: __startTime,
    endTime: __endTime,
    repeat: __repeat,
    maxAttendants,
    type,
    status,
    visibility,
    notes,
  }) {
    const mutation = gql`
      mutation CreateSession($data: CreateSessionsInput!) {
        createSessions(data: $data)
      }
    `;
    const firstDay = __repeat[0];
    const repeat = __repeat.slice(1);

    const startTime = moment(`${firstDay} ${__startTime}`, 'YYYY-MM-DD hh:mm').toDate();
    const endTime = moment(`${firstDay} ${__endTime}`, 'YYYY-MM-DD hh:mm').toDate();

    const dataSession = {
      title,
      providerId: provider.id,
      coachesId: coaches.map(coach => coach.id),
      startTime,
      endTime,
      repeat,
      maxAttendants,
      typeId: type.id,
      status,
      visibility,
      notes,
    };

    const { data, error } = await this.__gCall({
      mutation,
      variables: {
        data: dataSession,
      },
    });
    if (error) throw new Error(error[0]);
    return data.createSessions;
  },

  async updateSession(
    sessionId: string,
    {
      title,
      provider,
      coaches,
      startTime: __startTime,
      endTime: __endTime,
      maxAttendants,
      type,
      status,
      visibility,
      notes,
    }
  ) {
    const mutation = gql`
      mutation UpdateSession($sessionId: String!, $data: CreateSessionsInput!) {
        updateSession(sessionId: $sessionId, data: $data)
      }
    `;
    const firstDay = moment(__startTime).format('YYYY-MM-DD');

    const startTime = moment(`${firstDay} ${__startTime}`, 'YYYY-MM-DD hh:mm').toDate();
    const endTime = moment(`${firstDay} ${__endTime}`, 'YYYY-MM-DD hh:mm').toDate();

    const dataSession = {
      title,
      providerId: provider.id,
      coachesId: coaches.map(coach => coach.id),
      startTime,
      endTime,
      maxAttendants,
      typeId: type.id,
      status,
      visibility,
      notes,
    };

    const { data, error } = await this.__gCall({
      mutation,
      variables: {
        sessionId,
        data: dataSession,
      },
    });
    if (error) throw new Error(error[0]);
    return data.updateSession;
  },

  async retrieveSession(sessionId: string) {
    const query = gql`
      query RetrieveSession($sessionId: String!, $providerId: String!) {
        retrieveSession(sessionId: $sessionId, providerId: $providerId) {
          id
          title
          coaches {
            id
            name
          }
          startTime
          endTime
          maxAttendants
          status
          visibility
          notes
          type {
            id
            title
          }
          attendanceDefaultStatus
          attendances {
            id
            user {
              id
              name
            }
            paymentType
            status
          }
        }
      }
    `;
    const { data, error } = await this.__gCall({
      query,
      variables: {
        sessionId,
        providerId: this.providerId,
      },
    });
    if (error) throw new Error(error[0]);
    return data.retrieveSession;
  },

  async deleteSession(sessionId: string) {
    const mutation = gql`
      mutation DeleteSession($sessionId: String!, $providerId: String!) {
        deleteSession(sessionId: $sessionId, providerId: $providerId)
      }
    `;
    const { data, error } = await this.__gCall({
      mutation,
      variables: {
        sessionId,
        providerId: this.providerId,
      },
    });
    if (error) throw new Error(error[0]);
    return data.deleteSession;
  },

  async availableSessions(providerId: string, day: string) {
    const query = gql`
      query ListSessions($providerId: String!, $day: String!) {
        listMyAvailableSessions(providerId: $providerId, day: $day) {
          session {
            id
            title
            provider {
              id
              name
              portraitImageUrl
            }
            coaches {
              name
            }
            startTime
            endTime
            maxAttendants
            countAttendances
            notes
            type {
              title
            }
            status
          }
          myAttendance {
            id
            status
          }
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
    if (error) throw new Error(error[0]);
    return data.listMyAvailableSessions.map(sa => ({ ...sa.session, myAttendance: sa.myAttendance }));
  },

  async listSessions(providerId: string, day: moment.Moment) {
    const query = gql`
      query ListSessions($providerId: String!, $day: String!) {
        listSessions(providerId: $providerId, day: $day) {
          id
          title
          provider {
            id
            name
            portraitImageUrl
          }
          coaches {
            id
            name
          }
          startTime
          endTime
          maxAttendants
          countAttendances
          visibility
          status
          notes
          type {
            id
            title
          }
          attendanceDefaultStatus
          attendances {
            id
            user {
              id
              name
              surname
              portraitImageUrl
            }
            paymentType
            status
          }
        }
      }
    `;
    const { data, error } = await this.__gCall({
      query,
      variables: {
        providerId,
        day: day.format('YYYY-MM-DD'),
      },
    });
    if (error) throw new Error(error[0]);
    return data.listSessions;
  },

  async attendSession(userId: string, sessionId: string, paymentType: string, status?: string) {
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
    if (error) throw new Error(error[0]);
    return data.attendSession;
  },

  async updateAttendance(attendanceId: string, status: string) {
    const mutation = gql`
      mutation UpdateStatusAttendance($attendanceId: String!, $status: String!) {
        updateStatusAttendance(attendanceId: $attendanceId, status: $status)
      }
    `;

    const { data, error } = await this.__gCall({
      mutation,
      variables: {
        attendanceId,
        status,
      },
    });

    if (error) throw new Error(error[0]);
    return data.updateStatusAttendance;
  },

  async updatePaymentAttendance(attendanceId: string, paymentType: string) {
    const mutation = gql`
      mutation UpdatePaymentTypeAttendance($attendanceId: String!, $paymentType: String!) {
        updatePaymentTypeAttendance(attendanceId: $attendanceId, paymentType: $paymentType)
      }
    `;

    const { data, error } = await this.__gCall({
      mutation,
      variables: {
        attendanceId,
        paymentType,
      },
    });

    if (error) throw new Error(error[0]);
    return data.updatePaymentTypeAttendance;
  },

  async listAttendances(userId, providerId) {
    const query = gql`
      query ListAttendances($userId: String!, $providerId: String) {
      listAttendances (userId: $userId, providerId: $providerId){
          session {
            id
            title
            startTime
            endTime
            visibility
            status
            type {
              type
              title
            }
          }
          myAttendance {
            id
            paymentType
            status
          }
        }
      }
    `;    
    const { data, error } = await this.__gCall({
      query,
      variables: {
        userId,
        providerId,
      }
    });
    if (error) throw new Error(error[0]);

    const result = data.listAttendances.map(sa => ({ ...sa.session, attendance: sa.myAttendance }));
    result.sort((a, b) => (a.startTime < b.startTime ? 1 : -1));
    return result;
  },

  async listMyNextAttendances(): Promise<any> {
    const query = gql`
      query {
        listMyNextAttendances {
          session {
            id
            title
            provider {
              id
              name
              portraitImageUrl
            }
            coaches {
              name
            }
            startTime
            endTime
            maxAttendants
            visibility
            countAttendances
            status
            notes
            type {
              type
              title
            }
          }
          myAttendance {
            id
            status
          }
        }
      }
    `;
    const { data, error } = await this.__gCall({
      query,
    });
    if (error) throw new Error(error[0]);

    const result = data.listMyNextAttendances.map(sa => ({ ...sa.session, myAttendance: sa.myAttendance }));
    result.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));
    return result;
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
    if (error) throw new Error(error[0]);

    return data.listProvidersPublicInfo;
  },

  async listMyProviders(): Promise<any> {
    const query = gql`
      query {
        listMyProvidersInfo {
          provider {
            id
            name
            bannerImageUrl
            portraitImageUrl
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
    if (error) throw new Error(error[0]);

    return data.listMyProvidersInfo;
  },

  async listCustomers(providerId: string): Promise<any> {
    const query = gql`
      query ListCustomers($providerId: String!) {
        listCustomers(providerId: $providerId) {
          customer {
            id
            name
            surname
            bannerImageUrl
            portraitImageUrl
          }
          request {
            id
            status
          }
        }
      }
    `;
    const { data, error } = await this.__gCall({
      query,
      variables: {
        providerId,
      },
    });
    if (error) throw new Error(error[0]);

    return data.listCustomers;
  },

  async retrievePendingRequest(providerId: string): Promise<any> {
    const query = gql`
      query RetrievePendingRequest($providerId: String!) {
        retrievePendingRequest(providerId: $providerId) {
          id
          status
          user {
            id
            name
          }
        }
      }
    `;
    const { data, error } = await this.__gCall({
      query,
      variables: {
        providerId,
      },
    });
    if (error) throw new Error(error[0]);
    return data.retrievePendingRequest;
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
    if (error) throw new Error(error[0]);
    return data.updateRequestCustomer;
  },

  async addCustomer(userId: string, providerId: string) {
    const mutation = gql`
      mutation AddProviderCustomer($providerId: String!, $userId: String!) {
        addProviderCustomer(providerId: $providerId, userId: $userId)
      }
    `;
    const { data, error } = await this.__gCall({
      mutation,
      variables: {
        userId,
        providerId,
      },
    });
    return data.addProviderCustomer;
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
    if (error) throw new Error(error[0]);
    return data.retrieveRequestCustomer;
  },
};
