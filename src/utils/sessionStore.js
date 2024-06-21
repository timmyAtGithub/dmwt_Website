const sessionTokens = {};

export function addSessionToken(token, data) {
  sessionTokens[token] = data;
}

export function getSessionData(token) {
  return sessionTokens[token];
}
