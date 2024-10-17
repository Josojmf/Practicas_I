import { Page } from "@playwright/test";
import { Logger } from "winston";

export const pageF = {
  //@ts-ignore
  page: undefined as Page,
  logger: undefined as Logger,
};
