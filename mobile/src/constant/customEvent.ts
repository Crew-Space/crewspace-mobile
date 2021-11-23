type EventName = 'welcomeMainButton' | 'welcomeSubButton';

type CustomEventType = {
  name: string;
  params?: any;
};

const CustomEvent: { [key in EventName]: CustomEventType } = {
  welcomeMainButton: {
    name: 'event.welcome.mainbutton',
  },
  welcomeSubButton: {
    name: 'event.welcome.subbutton',
  },
};

export default CustomEvent;
