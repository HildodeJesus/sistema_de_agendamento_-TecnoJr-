import { BullModule } from '@nestjs/bull';
import sendEmail from './sendEmail';
import { join } from 'path';

function registerQueues() {
  const queues = [sendEmail];

  for (let i = 0; i < queues.length; i++) {
    return BullModule.registerQueue({
      name: queues[i].name,
      processors: [join(__dirname, 'sendEmail.js')],
    });
  }
}

export default registerQueues();
