export interface Notification {
  id: number;
  title: string;
  description: string;
  read: boolean;
  timestamp: string;
}

const SHORT_DESCRIPTION =
  "Your request to Map a terminal to an agent has been sent and you'll be notified when your request is approved...";

const LONG_DESCRIPTION =
  "Your request to Map a terminal to an agent has been sent and you'll be notified when your request is approved, please do not give the terminal to the agent until it has been mapped successfully. Your request to Map a terminal to an agent has been sent and you'll be notified when your request is approved, please do not give the terminal to the agent until it has been mapped successfully.";

export const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "Terminal mapping",
    description: SHORT_DESCRIPTION,
    read: false,
    timestamp: "23/09/2022 6:55am",
  },
  {
    id: 2,
    title: "Terminal mapping",
    description: LONG_DESCRIPTION,
    read: false,
    timestamp: "23/09/2022 6:55am",
  },
  {
    id: 3,
    title: "Terminal mapping",
    description: SHORT_DESCRIPTION,
    read: false,
    timestamp: "23/09/2022 6:55am",
  },
  {
    id: 4,
    title: "Terminal mapping",
    description: SHORT_DESCRIPTION,
    read: false,
    timestamp: "23/09/2022 6:55am",
  },
  {
    id: 5,
    title: "Terminal mapping",
    description: LONG_DESCRIPTION,
    read: true,
    timestamp: "23/09/2022 6:55am",
  },
  {
    id: 6,
    title: "Terminal mapping",
    description: SHORT_DESCRIPTION,
    read: true,
    timestamp: "23/09/2022 6:55am",
  },
  {
    id: 7,
    title: "Terminal mapping",
    description: SHORT_DESCRIPTION,
    read: true,
    timestamp: "22/09/2022 4:12pm",
  },
  {
    id: 8,
    title: "Terminal mapping",
    description: LONG_DESCRIPTION,
    read: false,
    timestamp: "22/09/2022 4:12pm",
  },
  {
    id: 9,
    title: "Terminal mapping",
    description: SHORT_DESCRIPTION,
    read: true,
    timestamp: "22/09/2022 4:12pm",
  },
  {
    id: 10,
    title: "Terminal mapping",
    description: SHORT_DESCRIPTION,
    read: false,
    timestamp: "21/09/2022 9:30am",
  },
  {
    id: 11,
    title: "Terminal mapping",
    description: LONG_DESCRIPTION,
    read: true,
    timestamp: "21/09/2022 9:30am",
  },
  {
    id: 12,
    title: "Terminal mapping",
    description: SHORT_DESCRIPTION,
    read: false,
    timestamp: "21/09/2022 9:30am",
  },
  {
    id: 13,
    title: "Terminal mapping",
    description: SHORT_DESCRIPTION,
    read: true,
    timestamp: "20/09/2022 1:05pm",
  },
  {
    id: 14,
    title: "Terminal mapping",
    description: LONG_DESCRIPTION,
    read: false,
    timestamp: "20/09/2022 1:05pm",
  },
  {
    id: 15,
    title: "Terminal mapping",
    description: SHORT_DESCRIPTION,
    read: true,
    timestamp: "20/09/2022 1:05pm",
  },
];
