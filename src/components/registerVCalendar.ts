import { App } from 'vue';
import { setupCalendar } from 'v-calendar';

const calendarOptions = {};

export function registerVCalendar(app: App) {
  app.use(setupCalendar, calendarOptions);
}
