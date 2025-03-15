/* eslint-disable import/no-anonymous-default-export */
// pages/api/query.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  req.url = req.url?.replace(/^\/api/, '');

  proxy.web(req, res, {
    target: process.env.BACKEND_URL || 'http://localhost:8000',
    changeOrigin: true,
  });
};