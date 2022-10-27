import Keycloak from "keycloak-js";

const initOptions = {
    url: 'http://127.0.0.1:8080',
    realm: 'TodolistAuth',
    clientId: 'todolist-app',
    onLoad: 'check-sso'
}

export const KeycloakConfig = new Keycloak(initOptions)
