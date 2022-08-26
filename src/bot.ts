// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ActivityHandler, BotHandler } from 'botbuilder';

export class EmptyBot extends ActivityHandler {
  constructor() {
    super();
    this.onMembersAdded(this.onMembersAddedHandler);
    this.onMessage(this.onMessageHandler);
  }
  onMembersAddedHandler: BotHandler = async (context, next) => {
    const membersAdded = context.activity.membersAdded;
    for (const member of membersAdded) {
      if (member.id !== context.activity.recipient.id) {
        await context.sendActivity('Hello world!');
      }
    }
    // By calling next() you ensure that the next BotHandler is run.
    await next();
  };
  onMessageHandler: BotHandler = async (context, next) => {
    await context.sendActivity('Message handler');
    await next();
  };
}
