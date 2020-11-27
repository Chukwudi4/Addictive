import * as Notifications from 'expo-notifications';

const APP_NAME = 'APP_NAME';

const notif_channels = {
  channel_dailies: 'Dailies',
};

const stages = [
  {
    start: 0,
    end: 0,
    message: 'We hope you have a great journey',
    medal: 'Hungry',
  },
  { start: 1, end: 6, message: 'Congrats, a day has passed', medal: 'Starter' },
  {
    start: 7,
    end: 29,
    message: 'Congrats, you have just passed a week',
    medal: 'Ambitious',
  },
  {
    start: 30,
    end: 179,
    message: 'Congrats, you have just passed a month',
    medal: '',
  },
  {
    start: 180,
    end: 359,
    message: 'Congrats, you have just passed 6 months',
    medal: 'Rockstar',
  },
];

const dailies_config = {
  name: notif_channels.channel_dailies,
  importance: Notifications.AndroidImportance.DEFAULT,
  // Optional attributes
  // bypassDnd?: boolean;
  // description?: string | null;
  // groupId?: string | null;
  // lightColor?: string;
  // lockscreenVisibility?: AndroidNotificationVisibility;
  // showBadge?: boolean;
  // sound?: string | null;
  // audioAttributes?: Partial<AudioAttributes>;
  // vibrationPattern?: number[] | null;
  // enableLights?: boolean;
  // enableVibrate?: boolean;
};

const splashData = [
  {
    title: "Let's Go!",
    description:
      'You have successfully taken a huge step in the right direction, Thank you so much',
    imgSource: require('./assets/splashone.png'),
  },
  {
    title: "Stay Strong, You've got this!",
    description: 'It gets tough but we know you are tougher',
    imgSource: require('./assets/splashtwo.png'),
  },
  {
    title: 'Liberate yourself',
    description: 'It will be worth it at the end',
    button: 'JUMP RIGHT IN',
    imgSource: require('./assets/splashthree.png'),
  },
];

const config = {
  notif_channels,
  dailies_config,
  splashData,
  APP_NAME,
  stages,
};

export default config;
