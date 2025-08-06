(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var dist = {};
var DebugNamespace = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.LogLevel = void 0;
  (function(LogLevel) {
    LogLevel[LogLevel["None"] = 0] = "None";
    LogLevel[LogLevel["Fatal"] = 1] = "Fatal";
    LogLevel[LogLevel["Error"] = 2] = "Error";
    LogLevel[LogLevel["Warn"] = 3] = "Warn";
    LogLevel[LogLevel["Info"] = 4] = "Info";
    LogLevel[LogLevel["Debug"] = 5] = "Debug";
    LogLevel[LogLevel["Verbose"] = 6] = "Verbose";
  })(exports.LogLevel || (exports.LogLevel = {}));
  var Debug = (
    /** @class */
    function() {
      function Debug2() {
      }
      Debug2.prototype.setLogLevel = function(logLevel) {
        window.cordova.exec(function() {
        }, function() {
        }, "OneSignalPush", "setLogLevel", [logLevel]);
      };
      Debug2.prototype.setAlertLevel = function(visualLogLevel) {
        window.cordova.exec(function() {
        }, function() {
        }, "OneSignalPush", "setAlertLevel", [visualLogLevel]);
      };
      return Debug2;
    }()
  );
  exports.default = Debug;
})(DebugNamespace);
var InAppMessagesNamespace = {};
Object.defineProperty(InAppMessagesNamespace, "__esModule", { value: true });
var InAppMessages = (
  /** @class */
  function() {
    function InAppMessages2() {
      this._inAppMessageClickListeners = [];
      this._willDisplayInAppMessageListeners = [];
      this._didDisplayInAppMessageListeners = [];
      this._willDismissInAppMessageListeners = [];
      this._didDismissInAppMessageListeners = [];
    }
    InAppMessages2.prototype._processFunctionList = function(array, param) {
      for (var i = 0; i < array.length; i++) {
        array[i](param);
      }
    };
    InAppMessages2.prototype.addEventListener = function(event, listener) {
      var _this = this;
      if (event === "click") {
        this._inAppMessageClickListeners.push(listener);
        var inAppMessageClickListener = function(json) {
          _this._processFunctionList(_this._inAppMessageClickListeners, json);
        };
        window.cordova.exec(inAppMessageClickListener, function() {
        }, "OneSignalPush", "setInAppMessageClickHandler", []);
      } else if (event === "willDisplay") {
        this._willDisplayInAppMessageListeners.push(listener);
        var willDisplayCallBackProcessor = function(event2) {
          _this._processFunctionList(_this._willDisplayInAppMessageListeners, event2);
        };
        window.cordova.exec(willDisplayCallBackProcessor, function() {
        }, "OneSignalPush", "setOnWillDisplayInAppMessageHandler", []);
      } else if (event === "didDisplay") {
        this._didDisplayInAppMessageListeners.push(listener);
        var didDisplayCallBackProcessor = function(event2) {
          _this._processFunctionList(_this._didDisplayInAppMessageListeners, event2);
        };
        window.cordova.exec(didDisplayCallBackProcessor, function() {
        }, "OneSignalPush", "setOnDidDisplayInAppMessageHandler", []);
      } else if (event === "willDismiss") {
        this._willDismissInAppMessageListeners.push(listener);
        var willDismissInAppMessageProcessor = function(event2) {
          _this._processFunctionList(_this._willDismissInAppMessageListeners, event2);
        };
        window.cordova.exec(willDismissInAppMessageProcessor, function() {
        }, "OneSignalPush", "setOnWillDismissInAppMessageHandler", []);
      } else if (event === "didDismiss") {
        this._didDismissInAppMessageListeners.push(listener);
        var didDismissInAppMessageCallBackProcessor = function(event2) {
          _this._processFunctionList(_this._didDismissInAppMessageListeners, event2);
        };
        window.cordova.exec(didDismissInAppMessageCallBackProcessor, function() {
        }, "OneSignalPush", "setOnDidDismissInAppMessageHandler", []);
      } else {
        return;
      }
    };
    InAppMessages2.prototype.removeEventListener = function(event, listener) {
      if (event === "click") {
        var index = this._inAppMessageClickListeners.indexOf(listener);
        if (index !== -1) {
          this._inAppMessageClickListeners.splice(index, 1);
        }
      } else {
        if (event === "willDisplay") {
          var index = this._willDisplayInAppMessageListeners.indexOf(listener);
          if (index !== -1) {
            this._willDisplayInAppMessageListeners.splice(index, 1);
          }
        } else if (event === "didDisplay") {
          var index = this._didDisplayInAppMessageListeners.indexOf(listener);
          if (index !== -1) {
            this._willDisplayInAppMessageListeners.splice(index, 1);
          }
        } else if (event === "willDismiss") {
          var index = this._willDismissInAppMessageListeners.indexOf(listener);
          if (index !== -1) {
            this._willDismissInAppMessageListeners.splice(index, 1);
          }
        } else if (event === "didDismiss") {
          var index = this._didDismissInAppMessageListeners.indexOf(listener);
          if (index !== -1) {
            this._didDismissInAppMessageListeners.splice(index, 1);
          }
        } else {
          return;
        }
      }
    };
    InAppMessages2.prototype.addTrigger = function(key, value) {
      var _a;
      var obj = (_a = {}, _a[key] = value, _a);
      this.addTriggers(obj);
    };
    InAppMessages2.prototype.addTriggers = function(triggers) {
      Object.keys(triggers).forEach(function(key) {
        if (typeof triggers[key] !== "string") {
          triggers[key] = JSON.stringify(triggers[key]);
        }
      });
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "addTriggers", [triggers]);
    };
    InAppMessages2.prototype.removeTrigger = function(key) {
      this.removeTriggers([key]);
    };
    InAppMessages2.prototype.removeTriggers = function(keys) {
      if (!Array.isArray(keys)) {
        console.error("OneSignal: removeTriggers: argument must be of type Array");
      }
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "removeTriggers", [keys]);
    };
    InAppMessages2.prototype.clearTriggers = function() {
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "clearTriggers");
    };
    InAppMessages2.prototype.setPaused = function(pause) {
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "setPaused", [pause]);
    };
    InAppMessages2.prototype.getPaused = function() {
      return new Promise(function(resolve, reject) {
        window.cordova.exec(resolve, reject, "OneSignalPush", "isPaused", []);
      });
    };
    return InAppMessages2;
  }()
);
InAppMessagesNamespace.default = InAppMessages;
var LiveActivitiesNamespace = {};
Object.defineProperty(LiveActivitiesNamespace, "__esModule", { value: true });
var LiveActivities = (
  /** @class */
  function() {
    function LiveActivities2() {
    }
    LiveActivities2.prototype.enter = function(activityId, token, onSuccess, onFailure) {
      if (onSuccess == null) {
        onSuccess = function() {
        };
      }
      if (onFailure == null) {
        onFailure = function() {
        };
      }
      window.cordova.exec(onSuccess, onFailure, "OneSignalPush", "enterLiveActivity", [activityId, token]);
    };
    LiveActivities2.prototype.exit = function(activityId, onSuccess, onFailure) {
      if (onSuccess == null) {
        onSuccess = function() {
        };
      }
      if (onFailure == null) {
        onFailure = function() {
        };
      }
      window.cordova.exec(onSuccess, onFailure, "OneSignalPush", "exitLiveActivity", [activityId]);
    };
    LiveActivities2.prototype.setPushToStartToken = function(activityType, token) {
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "setPushToStartToken", [activityType, token]);
    };
    LiveActivities2.prototype.removePushToStartToken = function(activityType) {
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "removePushToStartToken", [activityType]);
    };
    LiveActivities2.prototype.setupDefault = function(options) {
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "setupDefaultLiveActivity", [options]);
    };
    LiveActivities2.prototype.startDefault = function(activityId, attributes, content) {
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "startDefaultLiveActivity", [activityId, attributes, content]);
    };
    return LiveActivities2;
  }()
);
LiveActivitiesNamespace.default = LiveActivities;
var LocationNamespace = {};
Object.defineProperty(LocationNamespace, "__esModule", { value: true });
var Location = (
  /** @class */
  function() {
    function Location2() {
    }
    Location2.prototype.requestPermission = function() {
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "requestLocationPermission", []);
    };
    Location2.prototype.setShared = function(shared) {
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "setLocationShared", [shared]);
    };
    Location2.prototype.isShared = function() {
      return new Promise(function(resolve, reject) {
        window.cordova.exec(resolve, reject, "OneSignalPush", "isLocationShared", []);
      });
    };
    return Location2;
  }()
);
LocationNamespace.default = Location;
var NotificationsNamespace = {};
var NotificationReceivedEvent = {};
var OSNotification$1 = {};
Object.defineProperty(OSNotification$1, "__esModule", { value: true });
OSNotification$1.OSNotification = void 0;
var OSNotification = (
  /** @class */
  function() {
    function OSNotification2(receivedEvent) {
      this.notificationId = receivedEvent.notificationId;
      this.body = receivedEvent.body;
      this.title = receivedEvent.title;
      this.additionalData = receivedEvent.additionalData;
      if (typeof receivedEvent.rawPayload === "string") {
        this.rawPayload = JSON.parse(receivedEvent.rawPayload);
      } else {
        this.rawPayload = receivedEvent.rawPayload;
      }
      this.launchURL = receivedEvent.launchURL;
      this.sound = receivedEvent.sound;
      if (receivedEvent.actionButtons) {
        this.actionButtons = receivedEvent.actionButtons;
      }
      if (receivedEvent.groupKey) {
        this.groupKey = receivedEvent.groupKey;
      }
      if (receivedEvent.ledColor) {
        this.ledColor = receivedEvent.ledColor;
      }
      if (typeof receivedEvent.priority !== "undefined") {
        this.priority = receivedEvent.priority;
      }
      if (receivedEvent.smallIcon) {
        this.smallIcon = receivedEvent.smallIcon;
      }
      if (receivedEvent.largeIcon) {
        this.largeIcon = receivedEvent.largeIcon;
      }
      if (receivedEvent.bigPicture) {
        this.bigPicture = receivedEvent.bigPicture;
      }
      if (receivedEvent.collapseId) {
        this.collapseId = receivedEvent.collapseId;
      }
      if (receivedEvent.groupMessage) {
        this.groupMessage = receivedEvent.groupMessage;
      }
      if (receivedEvent.fromProjectNumber) {
        this.fromProjectNumber = receivedEvent.fromProjectNumber;
      }
      if (receivedEvent.smallIconAccentColor) {
        this.smallIconAccentColor = receivedEvent.smallIconAccentColor;
      }
      if (receivedEvent.lockScreenVisibility) {
        this.lockScreenVisibility = receivedEvent.lockScreenVisibility;
      }
      if (receivedEvent.androidNotificationId) {
        this.androidNotificationId = receivedEvent.androidNotificationId;
      }
      if (receivedEvent.groupedNotifications && receivedEvent.groupedNotifications.length) {
        this.groupedNotifications = receivedEvent.groupedNotifications;
      }
      if (receivedEvent.badge) {
        this.badge = receivedEvent.badge;
      }
      if (receivedEvent.category) {
        this.category = receivedEvent.category;
      }
      if (receivedEvent.threadId) {
        this.threadId = receivedEvent.threadId;
      }
      if (receivedEvent.subtitle) {
        this.subtitle = receivedEvent.subtitle;
      }
      if (receivedEvent.templateId) {
        this.templateId = receivedEvent.templateId;
      }
      if (receivedEvent.attachments) {
        this.attachments = receivedEvent.attachments;
      }
      if (receivedEvent.templateName) {
        this.templateName = receivedEvent.templateName;
      }
      if (receivedEvent.mutableContent) {
        this.mutableContent = receivedEvent.mutableContent;
      }
      if (receivedEvent.badgeIncrement) {
        this.badgeIncrement = receivedEvent.badgeIncrement;
      }
      if (receivedEvent.contentAvailable) {
        this.contentAvailable = receivedEvent.contentAvailable;
      }
      if (receivedEvent.relevanceScore) {
        this.relevanceScore = receivedEvent.relevanceScore;
      }
      if (receivedEvent.interruptionLevel) {
        this.interruptionLevel = receivedEvent.interruptionLevel;
      }
    }
    OSNotification2.prototype.display = function() {
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "displayNotification", [this.notificationId]);
      return;
    };
    return OSNotification2;
  }()
);
OSNotification$1.OSNotification = OSNotification;
Object.defineProperty(NotificationReceivedEvent, "__esModule", { value: true });
NotificationReceivedEvent.NotificationWillDisplayEvent = void 0;
var OSNotification_1 = OSNotification$1;
var NotificationWillDisplayEvent = (
  /** @class */
  function() {
    function NotificationWillDisplayEvent2(displayEvent) {
      this.notification = new OSNotification_1.OSNotification(displayEvent);
    }
    NotificationWillDisplayEvent2.prototype.preventDefault = function(discard) {
      if (discard === void 0) {
        discard = false;
      }
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "preventDefault", [this.notification.notificationId, discard]);
      return;
    };
    NotificationWillDisplayEvent2.prototype.getNotification = function() {
      return this.notification;
    };
    return NotificationWillDisplayEvent2;
  }()
);
NotificationReceivedEvent.NotificationWillDisplayEvent = NotificationWillDisplayEvent;
(function(exports) {
  var __awaiter2 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __generator2 = commonjsGlobal && commonjsGlobal.__generator || function(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1) throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_) try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.OSNotificationPermission = void 0;
  var NotificationReceivedEvent_1 = NotificationReceivedEvent;
  (function(OSNotificationPermission) {
    OSNotificationPermission[OSNotificationPermission["NotDetermined"] = 0] = "NotDetermined";
    OSNotificationPermission[OSNotificationPermission["Denied"] = 1] = "Denied";
    OSNotificationPermission[OSNotificationPermission["Authorized"] = 2] = "Authorized";
    OSNotificationPermission[OSNotificationPermission["Provisional"] = 3] = "Provisional";
    OSNotificationPermission[OSNotificationPermission["Ephemeral"] = 4] = "Ephemeral";
  })(exports.OSNotificationPermission || (exports.OSNotificationPermission = {}));
  var Notifications = (
    /** @class */
    function() {
      function Notifications2() {
        this._permissionObserverList = [];
        this._notificationClickedListeners = [];
        this._notificationWillDisplayListeners = [];
      }
      Notifications2.prototype._processFunctionList = function(array, param) {
        for (var i = 0; i < array.length; i++) {
          array[i](param);
        }
      };
      Notifications2.prototype._setPropertyAndObserver = function() {
        var _this = this;
        var getPermissionCallback = function(granted) {
          _this._permission = granted;
        };
        window.cordova.exec(getPermissionCallback, function() {
        }, "OneSignalPush", "getPermissionInternal");
        this.addEventListener("permissionChange", function(result) {
          _this._permission = result;
        });
      };
      Notifications2.prototype.hasPermission = function() {
        return this._permission || false;
      };
      Notifications2.prototype.getPermissionAsync = function() {
        return __awaiter2(this, void 0, void 0, function() {
          return __generator2(this, function(_a) {
            return [2, new Promise(function(resolve, reject) {
              window.cordova.exec(resolve, reject, "OneSignalPush", "getPermissionInternal");
            })];
          });
        });
      };
      Notifications2.prototype.permissionNative = function() {
        return new Promise(function(resolve, reject) {
          window.cordova.exec(resolve, reject, "OneSignalPush", "permissionNative", []);
        });
      };
      Notifications2.prototype.requestPermission = function(fallbackToSettings) {
        var fallback = fallbackToSettings !== null && fallbackToSettings !== void 0 ? fallbackToSettings : false;
        return new Promise(function(resolve, reject) {
          window.cordova.exec(resolve, reject, "OneSignalPush", "requestPermission", [fallback]);
        });
      };
      Notifications2.prototype.canRequestPermission = function() {
        return new Promise(function(resolve, reject) {
          window.cordova.exec(resolve, reject, "OneSignalPush", "canRequestPermission", []);
        });
      };
      Notifications2.prototype.registerForProvisionalAuthorization = function(handler) {
        if (handler === void 0) {
          handler = function() {
          };
        }
        window.cordova.exec(handler, function() {
        }, "OneSignalPush", "registerForProvisionalAuthorization", []);
      };
      Notifications2.prototype.addEventListener = function(event, listener) {
        var _this = this;
        if (event === "click") {
          this._notificationClickedListeners.push(listener);
          var clickParsingHandler = function(json) {
            _this._processFunctionList(_this._notificationClickedListeners, json);
          };
          window.cordova.exec(clickParsingHandler, function() {
          }, "OneSignalPush", "addNotificationClickListener", []);
        } else if (event === "foregroundWillDisplay") {
          this._notificationWillDisplayListeners.push(listener);
          var foregroundParsingHandler = function(notification) {
            _this._notificationWillDisplayListeners.forEach(function(listener2) {
              listener2(new NotificationReceivedEvent_1.NotificationWillDisplayEvent(notification));
            });
            window.cordova.exec(function() {
            }, function() {
            }, "OneSignalPush", "proceedWithWillDisplay", [notification.notificationId]);
          };
          window.cordova.exec(foregroundParsingHandler, function() {
          }, "OneSignalPush", "addForegroundLifecycleListener", []);
        } else if (event === "permissionChange") {
          this._permissionObserverList.push(listener);
          var permissionCallBackProcessor = function(state) {
            _this._processFunctionList(_this._permissionObserverList, state);
          };
          window.cordova.exec(permissionCallBackProcessor, function() {
          }, "OneSignalPush", "addPermissionObserver", []);
        } else {
          return;
        }
      };
      Notifications2.prototype.removeEventListener = function(event, listener) {
        if (event === "click") {
          var index = this._notificationClickedListeners.indexOf(listener);
          if (index !== -1) {
            this._notificationClickedListeners.splice(index, 1);
          }
        } else if (event === "foregroundWillDisplay") {
          var index = this._notificationWillDisplayListeners.indexOf(listener);
          if (index !== -1) {
            this._notificationWillDisplayListeners.splice(index, 1);
          }
        } else if (event === "permissionChange") {
          var index = this._permissionObserverList.indexOf(listener);
          if (index !== -1) {
            this._permissionObserverList.splice(index, 1);
          }
        } else {
          return;
        }
      };
      Notifications2.prototype.clearAll = function() {
        window.cordova.exec(function() {
        }, function() {
        }, "OneSignalPush", "clearAllNotifications", []);
      };
      Notifications2.prototype.removeNotification = function(id) {
        window.cordova.exec(function() {
        }, function() {
        }, "OneSignalPush", "removeNotification", [id]);
      };
      Notifications2.prototype.removeGroupedNotifications = function(id) {
        window.cordova.exec(function() {
        }, function() {
        }, "OneSignalPush", "removeGroupedNotifications", [id]);
      };
      return Notifications2;
    }()
  );
  exports.default = Notifications;
})(NotificationsNamespace);
var SessionNamespace = {};
Object.defineProperty(SessionNamespace, "__esModule", { value: true });
var Session = (
  /** @class */
  function() {
    function Session2() {
    }
    Session2.prototype.addOutcome = function(name) {
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "addOutcome", [name]);
    };
    Session2.prototype.addUniqueOutcome = function(name) {
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "addUniqueOutcome", [name]);
    };
    Session2.prototype.addOutcomeWithValue = function(name, value) {
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "addOutcomeWithValue", [name, value]);
    };
    return Session2;
  }()
);
SessionNamespace.default = Session;
var UserNamespace = {};
var PushSubscriptionNamespace = {};
Object.defineProperty(PushSubscriptionNamespace, "__esModule", { value: true });
var PushSubscription = (
  /** @class */
  function() {
    function PushSubscription2() {
      this._subscriptionObserverList = [];
    }
    PushSubscription2.prototype._processFunctionList = function(array, param) {
      for (var i = 0; i < array.length; i++) {
        array[i](param);
      }
    };
    PushSubscription2.prototype._setPropertiesAndObserver = function() {
      var _this = this;
      var getIdCallback = function(id) {
        _this._id = id;
      };
      window.cordova.exec(getIdCallback, function() {
      }, "OneSignalPush", "getPushSubscriptionId");
      var getTokenCallback = function(token) {
        _this._token = token;
      };
      window.cordova.exec(getTokenCallback, function() {
      }, "OneSignalPush", "getPushSubscriptionToken");
      var getOptedInCallback = function(granted) {
        _this._optedIn = granted;
      };
      window.cordova.exec(getOptedInCallback, function() {
      }, "OneSignalPush", "getPushSubscriptionOptedIn");
      this.addEventListener("change", function(subscriptionChange) {
        _this._id = subscriptionChange.current.id;
        _this._token = subscriptionChange.current.token;
        _this._optedIn = subscriptionChange.current.optedIn;
      });
    };
    Object.defineProperty(PushSubscription2.prototype, "id", {
      /**
       * @deprecated This method is deprecated. It has been replaced by {@link getIdAsync}.
       */
      get: function() {
        console.warn("OneSignal: This method has been deprecated. Use getIdAsync instead for getting push subscription id.");
        return this._id;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(PushSubscription2.prototype, "token", {
      /**
       * @deprecated This method is deprecated. It has been replaced by {@link getTokenAsync}.
       */
      get: function() {
        console.warn("OneSignal: This method has been deprecated. Use getTokenAsync instead for getting push subscription token.");
        return this._token;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(PushSubscription2.prototype, "optedIn", {
      /**
       * @deprecated This method is deprecated. It has been replaced by {@link getOptedInAsync}.
       */
      get: function() {
        console.warn("OneSignal: This method has been deprecated. Use getOptedInAsync instead for getting push subscription opted in status.");
        return this._optedIn || false;
      },
      enumerable: false,
      configurable: true
    });
    PushSubscription2.prototype.getIdAsync = function() {
      return new Promise(function(resolve, reject) {
        window.cordova.exec(resolve, reject, "OneSignalPush", "getPushSubscriptionId");
      });
    };
    PushSubscription2.prototype.getTokenAsync = function() {
      return new Promise(function(resolve, reject) {
        window.cordova.exec(resolve, reject, "OneSignalPush", "getPushSubscriptionToken");
      });
    };
    PushSubscription2.prototype.getOptedInAsync = function() {
      return new Promise(function(resolve, reject) {
        window.cordova.exec(resolve, reject, "OneSignalPush", "getPushSubscriptionOptedIn");
      });
    };
    PushSubscription2.prototype.addEventListener = function(event, listener) {
      var _this = this;
      this._subscriptionObserverList.push(listener);
      var subscriptionCallBackProcessor = function(state) {
        _this._processFunctionList(_this._subscriptionObserverList, state);
      };
      window.cordova.exec(subscriptionCallBackProcessor, function() {
      }, "OneSignalPush", "addPushSubscriptionObserver", []);
    };
    PushSubscription2.prototype.removeEventListener = function(event, listener) {
      var index = this._subscriptionObserverList.indexOf(listener);
      if (index !== -1) {
        this._subscriptionObserverList.splice(index, 1);
      }
    };
    PushSubscription2.prototype.optIn = function() {
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "optInPushSubscription");
    };
    PushSubscription2.prototype.optOut = function() {
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "optOutPushSubscription");
    };
    return PushSubscription2;
  }()
);
PushSubscriptionNamespace.default = PushSubscription;
var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = commonjsGlobal && commonjsGlobal.__generator || function(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return { value: op[1], done: false };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(UserNamespace, "__esModule", { value: true });
var PushSubscriptionNamespace_1 = __importDefault(PushSubscriptionNamespace);
var User = (
  /** @class */
  function() {
    function User2() {
      this.pushSubscription = new PushSubscriptionNamespace_1.default();
      this._userStateObserverList = [];
    }
    User2.prototype._processFunctionList = function(array, param) {
      for (var i = 0; i < array.length; i++) {
        array[i](param);
      }
    };
    User2.prototype.setLanguage = function(language) {
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "setLanguage", [language]);
    };
    User2.prototype.addAlias = function(label, id) {
      var _a;
      var jsonKeyValue = (_a = {}, _a[label] = id, _a);
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "addAliases", [jsonKeyValue]);
    };
    User2.prototype.addAliases = function(aliases) {
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "addAliases", [aliases]);
    };
    User2.prototype.removeAlias = function(label) {
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "removeAliases", [label]);
    };
    User2.prototype.removeAliases = function(labels) {
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "removeAliases", labels);
    };
    User2.prototype.addEmail = function(email) {
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "addEmail", [email]);
    };
    User2.prototype.removeEmail = function(email) {
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "removeEmail", [email]);
    };
    User2.prototype.addSms = function(smsNumber) {
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "addSms", [smsNumber]);
    };
    User2.prototype.removeSms = function(smsNumber) {
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "removeSms", [smsNumber]);
    };
    User2.prototype.addTag = function(key, value) {
      var _a;
      var jsonKeyValue = (_a = {}, _a[key] = value, _a);
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "addTags", [jsonKeyValue]);
    };
    User2.prototype.addTags = function(tags) {
      var convertedTags = tags;
      Object.keys(tags).forEach(function(key) {
        if (typeof convertedTags[key] !== "string") {
          convertedTags[key] = JSON.stringify(convertedTags[key]);
        }
      });
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "addTags", [convertedTags]);
    };
    User2.prototype.removeTag = function(key) {
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "removeTags", [key]);
    };
    User2.prototype.removeTags = function(keys) {
      window.cordova.exec(function() {
      }, function() {
      }, "OneSignalPush", "removeTags", keys);
    };
    User2.prototype.getTags = function() {
      return new Promise(function(resolve, reject) {
        window.cordova.exec(resolve, reject, "OneSignalPush", "getTags", []);
      });
    };
    User2.prototype.addEventListener = function(event, listener) {
      var _this = this;
      this._userStateObserverList.push(listener);
      var userCallBackProcessor = function(state) {
        _this._processFunctionList(_this._userStateObserverList, state);
      };
      window.cordova.exec(userCallBackProcessor, function() {
      }, "OneSignalPush", "addUserStateObserver", []);
    };
    User2.prototype.removeEventListener = function(event, listener) {
      var index = this._userStateObserverList.indexOf(listener);
      if (index !== -1) {
        this._userStateObserverList.splice(index, 1);
      }
    };
    User2.prototype.getOnesignalId = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          return [2, new Promise(function(resolve, reject) {
            window.cordova.exec(resolve, reject, "OneSignalPush", "getOnesignalId", []);
          })];
        });
      });
    };
    User2.prototype.getExternalId = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          return [2, new Promise(function(resolve, reject) {
            window.cordova.exec(resolve, reject, "OneSignalPush", "getExternalId", []);
          })];
        });
      });
    };
    return User2;
  }()
);
UserNamespace.default = User;
(function(exports) {
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.OSNotification = exports.OSNotificationPermission = exports.NotificationWillDisplayEvent = exports.LogLevel = exports.OneSignalPlugin = void 0;
  var DebugNamespace_1 = __importDefault2(DebugNamespace);
  var InAppMessagesNamespace_1 = __importDefault2(InAppMessagesNamespace);
  var LiveActivitiesNamespace_1 = __importDefault2(LiveActivitiesNamespace);
  var LocationNamespace_1 = __importDefault2(LocationNamespace);
  var NotificationsNamespace_1 = __importDefault2(NotificationsNamespace);
  var SessionNamespace_1 = __importDefault2(SessionNamespace);
  var UserNamespace_1 = __importDefault2(UserNamespace);
  var OneSignalPlugin = (
    /** @class */
    function() {
      function OneSignalPlugin2() {
        this.User = new UserNamespace_1.default();
        this.Debug = new DebugNamespace_1.default();
        this.Session = new SessionNamespace_1.default();
        this.Location = new LocationNamespace_1.default();
        this.InAppMessages = new InAppMessagesNamespace_1.default();
        this.Notifications = new NotificationsNamespace_1.default();
        this.LiveActivities = new LiveActivitiesNamespace_1.default();
        this._appID = "";
      }
      OneSignalPlugin2.prototype.initialize = function(appId) {
        var _this = this;
        this._appID = appId;
        var observerCallback = function() {
          _this.User.pushSubscription._setPropertiesAndObserver();
          _this.Notifications._setPropertyAndObserver();
        };
        window.cordova.exec(observerCallback, function() {
        }, "OneSignalPush", "init", [this._appID]);
      };
      OneSignalPlugin2.prototype.login = function(externalId) {
        window.cordova.exec(function() {
        }, function() {
        }, "OneSignalPush", "login", [externalId]);
      };
      OneSignalPlugin2.prototype.logout = function() {
        window.cordova.exec(function() {
        }, function() {
        }, "OneSignalPush", "logout");
      };
      OneSignalPlugin2.prototype.setConsentRequired = function(required) {
        window.cordova.exec(function() {
        }, function() {
        }, "OneSignalPush", "setPrivacyConsentRequired", [required]);
      };
      OneSignalPlugin2.prototype.setConsentGiven = function(granted) {
        window.cordova.exec(function() {
        }, function() {
        }, "OneSignalPush", "setPrivacyConsentGiven", [granted]);
      };
      return OneSignalPlugin2;
    }()
  );
  exports.OneSignalPlugin = OneSignalPlugin;
  var OneSignal2 = new OneSignalPlugin();
  if (!window.plugins) {
    window.plugins = {};
  }
  if (!window.plugins.OneSignal) {
    window.plugins.OneSignal = OneSignal2;
  }
  var DebugNamespace_2 = DebugNamespace;
  Object.defineProperty(exports, "LogLevel", { enumerable: true, get: function() {
    return DebugNamespace_2.LogLevel;
  } });
  var NotificationReceivedEvent_1 = NotificationReceivedEvent;
  Object.defineProperty(exports, "NotificationWillDisplayEvent", { enumerable: true, get: function() {
    return NotificationReceivedEvent_1.NotificationWillDisplayEvent;
  } });
  var NotificationsNamespace_2 = NotificationsNamespace;
  Object.defineProperty(exports, "OSNotificationPermission", { enumerable: true, get: function() {
    return NotificationsNamespace_2.OSNotificationPermission;
  } });
  var OSNotification_12 = OSNotification$1;
  Object.defineProperty(exports, "OSNotification", { enumerable: true, get: function() {
    return OSNotification_12.OSNotification;
  } });
  exports.default = OneSignal2;
})(dist);
const OneSignal = /* @__PURE__ */ getDefaultExportFromCjs(dist);
document.addEventListener("deviceready", () => {
  OneSignal.setAppId("YOUR_ONESIGNAL_APP_ID");
  OneSignal.promptForPushNotificationsWithUserResponse((response) => {
    console.log("🔔 User response:", response);
  });
  OneSignal.setNotificationReceivedHandler((notification) => {
    console.log("📩 Notification received:", notification);
  });
  OneSignal.setNotificationOpenedHandler((openedEvent) => {
    console.log("📬 Notification opened:", openedEvent);
  });
});
