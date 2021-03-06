import { Network } from "zilswap-sdk/lib/constants";
import { OpenCloseState, PoolType, FormNotification } from "./types";

export const ActionTypes = {
  TOGGLE_SHOW_WALLET: "TOGGLE_SHOW_WALLET",
  SHOW_POOL_TYPE: "SHOW_POOL_TYPE",
  TOGGLE_SHOW_CREATE_POOL: "TOGGLE_SHOW_CREATE_POOL",
  HIDE_LIQUIDITY_EARN: "HIDE_LIQUIDITY_EARN",
  HIDE_WALLET_MESSAGE: "HIDE_WALLET_MESSAGE",
  UPDATE_NOTIFICATION: "UPDATE_NOTIFICATION",

  UPDATE_NETWORK: "UPDATE_NETWORK",

  ADD_BACKGROUND_LOADING: "ADD_BACKGROUND_LOADING",
  REMOVE_BACKGROUND_LOADING: "REMOVE_BACKGROUND_LOADING",
};

export function toggleShowWallet(override?: OpenCloseState) {
  return {
    type: ActionTypes.TOGGLE_SHOW_WALLET,
    override,
  }
};
export function toggleShowCreatePool(override?: OpenCloseState) {
  return {
    type: ActionTypes.TOGGLE_SHOW_CREATE_POOL,
    override,
  }
};
export function showPoolType(poolType?: PoolType) {
  return {
    type: ActionTypes.SHOW_POOL_TYPE,
    poolType,
  }
};

export function hideLiquidityEarn(hide: boolean = true) {
  return {
    type: ActionTypes.HIDE_LIQUIDITY_EARN,
    hide,
  }
};

export function hideWalletMessage(hide: boolean = true) {
  return {
    type: ActionTypes.HIDE_WALLET_MESSAGE,
    hide,
  }
};

export function updateNotification(notification?: FormNotification) {
  return {
    type: ActionTypes.UPDATE_NOTIFICATION,
    notification,
  }
};

export function updateNetwork(network: Network) {
  return {
    type: ActionTypes.UPDATE_NETWORK,
    network,
  }
};

export function addBackgroundLoading(name: string, uuid: string) {
  return {
    type: ActionTypes.ADD_BACKGROUND_LOADING,
    name, uuid,
  };
};
export function removeBackgroundLoading(uuid: string) {
  return {
    type: ActionTypes.REMOVE_BACKGROUND_LOADING,
    uuid,
  };
};
