export const SHOW_SLIDER_NOTIFICATION = 'SHOW_SLIDER_NOTIFICATION';
export const DISMISS_SLIDER_NOTIFICATION = 'DISMISS_SLIDER_NOTIFICATION';
export const SHOW_PURCHASE_NOTIFICATION = 'SHOW_PURCHASE_NOTIFICATION';
export const DISMISS_PURCHASE_NOTIFICATION = 'DISMISS_PURCHASE_NOTIFICATION';

export function displaySliderNotification() {
  return {
    type: SHOW_SLIDER_NOTIFICATION,
    payload: {
      showSliderNotification: true,
      haveShownSliderNotification: true,
    },
  };
}

export function dismissSliderNotification() {
  return {
    type: DISMISS_SLIDER_NOTIFICATION,
    payload: {
      showSliderNotification: false,
    },
  };
}

export function displayPurchaseNotificaton() {
  return {
    type: SHOW_PURCHASE_NOTIFICATION,
    payload: {
      showPurchaseNotification: true,
      haveShownPurchaseNotification: true,
    },
  };
}

export function dismissPurchaseNotification() {
  return {
    type: DISMISS_PURCHASE_NOTIFICATION,
    payload: {
      showPurchaseNotification: false,
    },
  };
}
