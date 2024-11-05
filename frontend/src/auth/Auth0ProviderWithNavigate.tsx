import { AppState, Auth0Provider, useAuth0, User } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};
const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const { getAccessTokenSilently } = useAuth0();
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const navigate = useNavigate();

  if (!domain || !clientId || !redirectUri) {
    throw new Error("Unable to initialise auth");
  }
  const onRedirectCallBack = async (appState?: AppState, user?: User) => {
    const token = await getAccessTokenSilently();
    console.log("token", token);
    navigate("/auth-callback");
  };
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallBack}
    >
      {children}
    </Auth0Provider>
  );
};
export default Auth0ProviderWithNavigate;
