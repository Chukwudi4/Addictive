import * as Notifications from 'expo-notifications';

const notif_channels = {
    channel_dailies: 'Dailies'
}

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
  }

 const splashData = [
     {
         title: 'Let\'s Go!',
         description: 'fffvefefefefv',
         imgSource: require('./assets/start.webp')
     },
     {
        title: 'Stay Strong, You\'ve got this!',
        description: 'fffvefefefefv',
        imgSource: require('./assets/progress.jpg')
     },
     {
        title: 'It will be worth it at the end',
        description: 'fffvefefefefv',
        button: 'Proceed',
        imgSource: require('./assets/finish.png')
    }
 ]

 const config ={
    notif_channels,
    dailies_config,
    splashData
}

export default config