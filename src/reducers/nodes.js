import {
  CHECK_NODE_STATUS_START,
  CHECK_NODE_STATUS_SUCCESS,
  CHECK_NODE_STATUS_FAILURE,
  GET_BLOCK_LIST_START,
  GET_BLOCK_LIST_SUCCESS,
  GET_BLOCK_LIST_FAILURE
} from "../constants/actionTypes";
import { findNode, updateList } from "../utils";
import initialState from "./initialState";

export default function nodesReducer(state = initialState().nodes, action) {
  let list, nodeIndex;
  switch (action.type) {
    case CHECK_NODE_STATUS_START:
      list = state.list;
      nodeIndex = state.list.findIndex(p => p.url === action.node.url);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            loading: true
          },
          ...state.list.slice(nodeIndex + 1)
        ];
      }
      return {
        ...state,
        list
      };
    case CHECK_NODE_STATUS_SUCCESS:
      list = state.list;
      nodeIndex = state.list.findIndex(p => p.url === action.node.url);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            online: true,
            name: action.res.node_name,
            loading: false
          },
          ...state.list.slice(nodeIndex + 1)
        ];
      }
      return {
        ...state,
        list
      };
    case CHECK_NODE_STATUS_FAILURE:
      list = state.list;
      nodeIndex = state.list.findIndex(p => p.url === action.node.url);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            online: false,
            loading: false
          },
          ...state.list.slice(nodeIndex + 1)
        ];
      }
      return {
        ...state,
        list
      };

    case GET_BLOCK_LIST_START:
      list = state.list;
      nodeIndex = findNode(state, action.node.url);
      if (nodeIndex >= 0) {
        const node = list[nodeIndex];
        const nodeWithBlocks = {
          ...node,
          blocks: {
            list: [],
            loading: true,
            error: false
          }
        };
        list = updateList(list, nodeIndex, nodeWithBlocks);
      }

      return {
        ...state,
        list
      };
    case GET_BLOCK_LIST_SUCCESS:
      list = state.list;
      nodeIndex = findNode(state, action.node.url);
      if (nodeIndex >= 0) {
        const node = list[nodeIndex];
        const nodeWithBlocks = {
          ...node,
          blocks: {
            list: action.blocks,
            loading: false,
            error: false
          }
        };
        list = updateList(list, nodeIndex, nodeWithBlocks);
      }

      return {
        ...state,
        list
      };
    case GET_BLOCK_LIST_FAILURE:
      list = state.list;
      nodeIndex = findNode(state, action.node.url);
      if (nodeIndex >= 0) {
        const node = list[nodeIndex];
        const nodeWithBlocks = {
          ...node,
          blocks: {
            list: [],
            loading: false,
            error: true
          }
        };
        list = updateList(list, nodeIndex, nodeWithBlocks);
      }

      return {
        ...state,
        list
      };
    default:
      return state;
  }
}
