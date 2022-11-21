import { User } from './User';
import { Conversation } from './Conversation';
import { Message } from './Message';
declare const entities: (typeof User | typeof Conversation | typeof Message)[];
export default entities;
