import { getPayload } from "payload";
import payloadConfig from "@/payload.config";

export const config = await payloadConfig;

export const payload = await getPayload({ config });
