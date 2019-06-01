// import { Field, ID, ObjectType, Root } from 'type-graphql';
// import { arrayProp, prop, Ref, Typegoose, instanceMethod } from 'typegoose';
// import { Attendance } from './attendance';
// import { SessionType } from './session-type';

// export const PAID = '01 - PAID'; // orders the precedence for subscriptions
// export const OPEN = '02 - OPEN';
// export const DELINQUENCY = '99 - DELINQUENCY';

// export const SUBCRIPTIONPAYMENTTYPES = [PAID, OPEN, DELINQUENCY];

// @ObjectType()
// export class SessionsLimit extends Typegoose {
//   @Field(returns => SessionType)
//   @prop({ ref: SessionType, required: true })
//   type: Ref<SessionType>;

//   @Field()
//   @prop()
//   limit: number;

//   @Field(() => Attendance)
//   @arrayProp({ items: Attendance })
//   attendances: Attendance[];

//   @prop()
//   get count() : number{
//     return Attendance.count(this.attendances);
//   }

//   @prop()
//   get used(): boolean {
//     return Attendance.count(this.attendances) >= this.limit;
//   }
// }

// @ObjectType()
// export class Subscription extends Typegoose {
//   @Field(() => ID)
//   id: number;

//   @Field()
//   @prop({ required: true })
//   title: string;

//   @Field()
//   @prop({ required: true, default: true })
//   active: boolean;

//   @Field()
//   @prop({ required: true, enum: SUBCRIPTIONPAYMENTTYPES })
//   paymentType: string;

//   @Field()
//   @prop({ required: true })
//   paymentMethod: string;

//   @Field()
//   @prop()
//   startDate: Date;

//   @Field()
//   @prop()
//   endDate: Date;

//   @Field()
//   @prop()
//   globalSessionLimit: number;

//   @Field(() => SessionsLimit)
//   @arrayProp({ items: SessionsLimit })
//   sessionsLimit: SessionsLimit[];

//   @prop()
//   get countAttendances(): number {
//     return this.sessionsLimit.reduce((acc, sl) => acc + Attendance.count(sl.attendances),0);
//   }

//   @prop()
//   get used() : boolean{
//     return this.countAttendances >= this.globalSessionLimit;
//   }

//   @Field()
//   @prop()
//   get isActive (): boolean {
//     return (this.active && [PAID, OPEN].includes(this.paymentType))
//   }
// }

// // export const SubscriptionModel = new Subscription().getModelForClass(Subscription, {
// //   schemaOptions: { collection: 'subscriptions' },
// // });
