import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
// this is wrong, it should not break the layered architecture...
import { UserCreatedEvent } from 'src/users/domain/events/user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler implements IEventHandler<UserCreatedEvent> {
  private readonly logger = new Logger('UserCreatedEventHandler');
  handle(event: UserCreatedEvent) {
    this.logger.debug('User created event:', event.user);
  }
}
