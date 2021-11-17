type EventName = 'mainbutton';

type CustomEventType = {
  name: string;
  params?: any;
};

const CustomEvent: { [key in EventName]: CustomEventType } = {
  mainbutton: {
    name: 'event.welcome.mainbutton',
  },
};

export default CustomEvent;
