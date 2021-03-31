import CryptoJS from "crypto-js";
import Config from "../Config";

export interface scoreInterface {
  nickname: string;
  score: number;
}

export const sendScore = (params: scoreInterface, project: string): Promise<Response> => {
  const apiUrl = Config.apiUrl + "/score/" + project;
  const data = CryptoJS.AES.encrypt(
    JSON.stringify({...params, source: window.location.hostname}),
    Config.encryptionKey
  ).toString();

  return fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({
      data,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

export const getScores = (project: string, count = 10): Promise<Response> => {
  const apiUrl = Config.apiUrl + "/score/" + project + "/" + count;

  return fetch(apiUrl, {
    method: "GET"
  });
}
