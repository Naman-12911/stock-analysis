import ReactGA from "react-ga";

const TRACKING_ID = "UA-130516844-2";

export interface Event {
  category: string;
  action: string;
  label: string;
}

export const Event = ({ category, action, label }: Event) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label
  });
};

export const initGA = () => {
  ReactGA.initialize(TRACKING_ID);
}

export const PageView = () => {
  ReactGA.pageview(window.location.pathname +
    window.location.search);
}
export {}