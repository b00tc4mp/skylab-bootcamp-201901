'use strict'

class ConnectionError extends Error {}
class FormatError extends Error {}
class HttpError extends Error {}
class LogicError extends Error {}
class RequirementError extends Error {}
class TimeoutError extends Error {}
class UnauthorizedError extends Error {}
class UnexpectedError extends Error {}
class UnhandledError extends Error {}
class UnknownError extends Error {}
class ValueError extends Error {}

module.exports = {
  ConnectionError,
  FormatError,
  HttpError,
  LogicError,
  RequirementError,
  TimeoutError,
  UnauthorizedError,
  UnexpectedError,
  UnhandledError,
  UnknownError,
  ValueError
}
