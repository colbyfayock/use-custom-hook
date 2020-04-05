"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useCustomHook;

function useCustomHook() {
  var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var message = settings.message;
  return {
    message: message
  };
}