import productionConfig from "./config/production";
import developmentConfig from "./config/development";;

export interface ConfigInterface {
  gameElements: number;
  initialGameSpeed: number;
  gameSpeedup: number;
  speedupFactor: number;
  maximumSpeed: number;
  timeLimit: number;
  badClickPoints: number;
  goodClickPoints: number;
  maxComboFactor: number;
  apiUrl: string;
  encryptionKey: string;
  maxNickLenght: number;
};

let Config = {} as ConfigInterface;

if (process.env.NODE_ENV === "development") {
  Config = developmentConfig;
} else {
  Config = productionConfig;
}

export default Config;
