import {
  SHOW_SLIDER_NOTIFICATION,
  DISMISS_SLIDER_NOTIFICATION,
  SHOW_PURCHASE_NOTIFICATION,
  DISMISS_PURCHASE_NOTIFICATION,
} from '../actions/app';

export const INITIAL_STATE = {
  showSliderNotification: false,
  haveShownSliderNotification: false,
  showPurchaseNotification: false,
  haveShownPurchaseNotification: false,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_SLIDER_NOTIFICATION: {
      let { showSliderNotification, haveShownSliderNotification } = action.payload;
      return {
        showSliderNotification: showSliderNotification,
        haveShownSliderNotification: haveShownSliderNotification,
        showPurchaseNotification: state.showPurchaseNotification,
        haveShownPurchaseNotification: state.haveShownPurchaseNotification,
      };
    }

    case DISMISS_SLIDER_NOTIFICATION: {
      let { showSliderNotification } = action.payload;
      return {
        showSliderNotification: showSliderNotification,
        haveShownSliderNotification: state.haveShownSliderNotification,
        showPurchaseNotification: state.showPurchaseNotification,
        haveShownPurchaseNotification: state.haveShownPurchaseNotification,
      };
    }

    case SHOW_PURCHASE_NOTIFICATION: {
      let { showPurchaseNotification, haveShownPurchaseNotification } = action.payload;
      return {
        showPurchaseNotification: showPurchaseNotification,
        haveShownPurchaseNotification: haveShownPurchaseNotification,
        showSliderNotification: state.showSliderNotification,
        haveShownSliderNotification: state.haveShownSliderNotification,
      };
    }

    case DISMISS_PURCHASE_NOTIFICATION: {
      let { showPurchaseNotification } = action.payload;
      return {
        showPurchaseNotification: showPurchaseNotification,
        haveShownPurchaseNotification: state.haveShownPurchaseNotification,
        showSliderNotification: state.showSliderNotification,
        haveShownSliderNotification: state.haveShownSliderNotification,
      };
    }

    default: {
      return state;
    }
  }
}
