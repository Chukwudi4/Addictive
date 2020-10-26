import * as Notifications from 'expo-notifications';

const notif_channels = {
    channel_dailies: 'Dailies'
}

const dailies_config = {
    name: notif_channels.channel_dailies;
    importance: Notifications.AndroidImportance.DEFAULT;
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

 const config ={
    notif_channels,
    dailies_config
}

export default config