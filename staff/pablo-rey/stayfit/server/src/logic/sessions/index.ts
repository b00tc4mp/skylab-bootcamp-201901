import { leanUser } from '../users';
import { SessionModel, Session__Type } from './../../models/session';
import { leanSessionType } from './../../models/session-type';
import { leanProvider } from '../providers';

export function leanSession(session: Session__Type): Session__Type {
  return {
    id: session._id!.toString(),
    _id: session._id,
    title: session.title,
    provider: leanProvider(session.provider),
    coaches: session.coaches.map(coach => leanUser(coach)),
    startTime: session.startTime,
    endTime: session.endTime,
    maxAttendants: session.maxAttendants,
    type: leanSessionType(session.type),
    status: session.status,
    visibility: session.visibility,
  };
}

export default {
  async create(data: Session__Type) {
    return (await SessionModel.create(data)).id;
  },
};
