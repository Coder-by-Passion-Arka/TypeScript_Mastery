import type React from "react";
import { Login } from "./Login";
import {type ProfileProps} from "./Profile"

type PrivateProps = {
  isLoggedIn: boolean;
  Component: React.ComponentType<ProfileProps>;
};
export const Private = ({ isLoggedIn, Component }: PrivateProps) => {
  return isLoggedIn === true ? <Component name='Arka'/> : <Login />;
};
