import * as types from "../constants/actionTypes";
import { findNode } from "../utils";

const checkNodeStatusStart = node => {
  return {
    type: types.CHECK_NODE_STATUS_START,
    node
  };
};

const checkNodeStatusSuccess = (node, res) => {
  return {
    type: types.CHECK_NODE_STATUS_SUCCESS,
    node,
    res
  };
};

const checkNodeStatusFailure = node => {
  return {
    type: types.CHECK_NODE_STATUS_FAILURE,
    node
  };
};

export function checkNodeStatus(node) {
  return async dispatch => {
    try {
      dispatch(checkNodeStatusStart(node));
      const res = await fetch(`${node.url}/api/v1/status`);

      if (res.status >= 400) {
        dispatch(checkNodeStatusFailure(node));
        return;
      }

      const json = await res.json();

      dispatch(checkNodeStatusSuccess(node, json));
    } catch (err) {
      dispatch(checkNodeStatusFailure(node));
    }
  };
}

export function checkNodeStatuses(list) {
  return dispatch => {
    list.forEach(node => {
      dispatch(checkNodeStatus(node));
    });
  };
}

export function getBlockListStart(node) {
  return { type: types.GET_BLOCK_LIST_START, node };
}

export function getBlockListSuccess(node, blocks) {
  return { type: types.GET_BLOCK_LIST_SUCCESS, node, blocks };
}

export function getBlockListFailure(node) {
  return { type: types.GET_BLOCK_LIST_FAILURE, node };
}

export function getBlockList(node) {
  return async dispatch => {
    try {
      dispatch(getBlockListStart(node));

      if (node.blocks.list.length > 0) {
        console.log(`${node.url} blocks cached`);
        dispatch(getBlockListSuccess(node, node.blocks.list));
        return;
      }

      const res = await fetch(`${node.url}/api/v1/blocks`);

      if (res.status >= 400) {
        dispatch(getBlockListFailure(node));
        return;
      }

      const json = await res.json();

      dispatch(getBlockListSuccess(node, json.data));
    } catch (e) {
      dispatch(getBlockListFailure(node));
    }
  };
}
