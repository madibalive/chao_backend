import axios from 'axios';
import { RequestHandler } from 'express';
import { env } from '../helpers/env-helper';

const AUTH0_DOMAIN = env.string('AUTH0_DOMAIN', 'localhost');

export const getAuthenticatedUserDetails: RequestHandler = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  const { data } = await axios.get(`${AUTH0_DOMAIN}/userinfo`, {
    // @ts-ignore
    headers: { Authorization: bearerToken },
  });
  // @ts-ignore
  req.user = data;
  next();
};
