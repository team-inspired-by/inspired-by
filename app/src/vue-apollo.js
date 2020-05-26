import Vue from "vue";
import VueApollo from "vue-apollo";
import {
  from
} from "apollo-link";
import {
  createApolloClient,
  restartWebsockets,
} from "vue-cli-plugin-apollo/graphql-client";
import {
  createUploadLink
} from "apollo-upload-client";
import {
  InMemoryCache
} from "apollo-cache-inmemory";
import {
  onError
} from "apollo-link-error";
import store from "./store";

// Install the vue plugin
Vue.use(VueApollo);

import {
  ApolloLink
} from "apollo-link";
import {
  // createHttpLink,
  HttpLink
} from "apollo-link-http";


const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});
const gitHttpLink = new HttpLink({
  uri: "https://api.github.com/graphql"
});

const afterLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(res => {
    if (res.data['token']) {
      if (res.data.token['accessToken']) {
        store.commit('setAccessToken', res.data.token.accessToken)
        console.debug('fetched access token.', res.data.token.accessToken)
      } else if (res.token['refreshToken']) {
        store.commit('setRefreshToken', res.data.token.refreshToken)
        console.debug('fetched refresh token.')
      }
      delete res.data.token
    }
    return res;
  });
});

const errorLink = onError(
  ({
    graphQLErrors,
    networkError,
    operation,
    forward
  }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case 'UNAUTHENTICATED':
            const userInfo = store.getters.getUserInfo;
            console.warn("sending refreshToken: ", userInfo)
            const oldHeaders = operation.getContext().headers;
            operation.setContext({
              headers: {
                ...oldHeaders,
                'refresh-token': 'Bearer ' + userInfo.refreshToken,
                authorization: 'Bearer ' + userInfo.accessToken
              },
            });
            // console.warn("operation: ", oldHeaders);
            // console.warn("operation: ", operation.getContext().headers);
            return forward(operation);
          default:
            console.error("Error on errorLink: ", graphQLErrors)
        }
      }
    }
    console.error("Error on errorLink: ", networkError)

    // logErrorMessages(error)
  }
);

// Name of the localStorage item
const AUTH_TOKEN = "apollo-token";
// Http endpoint
// const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP || 'https://api.github.com/graphql'
// const httpEndpoint = 'http://34.64.74.193'

const clientGithubOptions = {
  link: from([gitHttpLink]),
  // httpEndpoint: 'https://api.github.com/graphql',
  // Override the way the Authorization header is set
  getAuth: () => {
    const token = process.env.VUE_APP_GITHUB_ACCESS_TOKEN;
    if (token) {
      return "Bearer " + token;
    } else {
      return "";
    }
  },
};

const clientInspiredByOptions = {
  // httpEndpoint: "http://localhost:4000/graphql",
  link: from([errorLink, afterLink, httpLink]),
  defaultHttpLink: false,
  // cache: new InMemoryCache(),
};

const clientUploadOptions = {
  link: createUploadLink({
    uri: "http://localhost:4000/graphql",
  }),
  // cache: new InMemoryCache(),
};

// Config
const defaultOptions = {
  // You can use `https` for secure connection (recommended in production)
  // httpEndpoint,
  // You can use `wss` for secure connection (recommended in production)
  // Use `null` to disable subscriptions
  // wsEndpoint: process.env.VUE_APP_GRAPHQL_WS || "ws://localhost:4000/graphql",
  // wsEndpoint: process.env.VUE_APP_GRAPHQL_WS || 'ws://api.github.com/graphql',
  // LocalStorage token
  tokenName: AUTH_TOKEN,
  // Enable Automatic Query persisting with Apollo Engine
  persisting: false,
  // Use websockets for everything (no HTTP)
  // You need to pass a `wsEndpoint` for this to work
  websocketsOnly: false,
  // Is being rendered on the server?
  ssr: false,

  // Override default apollo link
  // note: don't override httpLink here, specify httpLink options in the
  // httpLinkOptions property of defaultOptions.
  // link: myLink

  // Override default cache
  // cache: myCache

  // // Override the way the Authorization header is set
  // getAuth: () => {
  //   const token = process.env.VUE_APP_GITHUB_GRAPHQL_AUTH_TOKEN;
  //   if (token) {
  //     return "Bearer " + token;
  //   } else {
  //     return "";
  //   }
  // },

  // Additional ApolloClient options
  // apollo: { ... }

  // Client local data (see apollo-link-state)
  // clientState: { resolvers: { ... }, defaults: { ... } }
};

// Call this in the Vue app file
export function createProvider(options = {}) {
  // Create apollo client
  const createGithub = createApolloClient({
    ...defaultOptions,
    ...clientGithubOptions,
  });
  const createInspiredBy = createApolloClient({
    ...defaultOptions,
    ...clientInspiredByOptions,
  });
  const createUpload = createApolloClient({
    ...defaultOptions,
    ...clientUploadOptions,
  });
  // const {
  //   apolloClient,
  //   wsClient
  // } = createApolloClient({
  //   ...defaultOptions,
  //   ...options,
  // })
  // apolloClient.wsClient = wsClient

  const github = createGithub.apolloClient;
  const inspiredBy = createInspiredBy.apolloClient;
  const upload = createUpload.apolloClient;

  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    // defaultClient: apolloClient,
    defaultClient: inspiredBy,
    clients: {
      github,
      inspiredBy,
      upload,
    },
    defaultOptions: {
      $query: {
        // fetchPolicy: 'cache-and-network',
      },
    },
    errorHandler(error) {
      // eslint-disable-next-line no-console
      console.log(
        "%cError",
        "background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;",
        error.message
      );
    },
  });

  return apolloProvider;
}

// Manually call this when user log in
export async function onLogin(apolloClient, token) {
  if (typeof localStorage !== "undefined" && token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);
  try {
    await apolloClient.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("%cError on cache reset (login)", "color: orange;", e.message);
  }
}

// Manually call this when user log out
export async function onLogout(apolloClient) {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(AUTH_TOKEN);
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);
  try {
    await apolloClient.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("%cError on cache reset (logout)", "color: orange;", e.message);
  }
}