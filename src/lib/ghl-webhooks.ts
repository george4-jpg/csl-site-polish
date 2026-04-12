// GHL Webhook endpoints — production URLs
// Each variant maps to a dedicated GHL workflow trigger

export const GHL_WEBHOOKS: Record<string, string> = {
  rsvp: "https://services.leadconnectorhq.com/hooks/pawIA5SdWkMp2xKDUsN2/webhook-trigger/4bce9659-62c0-4387-a76c-4199e0094913",
  host: "https://services.leadconnectorhq.com/hooks/pawIA5SdWkMp2xKDUsN2/webhook-trigger/ce787572-2fd9-418c-a455-947d4a4699eb",
  partner: "https://services.leadconnectorhq.com/hooks/pawIA5SdWkMp2xKDUsN2/webhook-trigger/7e1a4e61-e123-4ca1-86d2-4e8cf962a1fe",
  interest: "https://services.leadconnectorhq.com/hooks/pawIA5SdWkMp2xKDUsN2/webhook-trigger/5c11210c-ce6e-4bab-93d6-4ede0bd00fdc",
  brief: "https://services.leadconnectorhq.com/hooks/pawIA5SdWkMp2xKDUsN2/webhook-trigger/bd364c2d-8aa5-462a-b327-31243d0e3e67",
  advisory: "https://services.leadconnectorhq.com/hooks/pawIA5SdWkMp2xKDUsN2/webhook-trigger/41161a0b-a003-4269-b41e-04220347f055",
  guide: "https://services.leadconnectorhq.com/hooks/pawIA5SdWkMp2xKDUsN2/webhook-trigger/41161a0b-a003-4269-b41e-04220347f055", // shares advisory webhook until dedicated one is created
  cohort: "https://services.leadconnectorhq.com/hooks/pawIA5SdWkMp2xKDUsN2/webhook-trigger/41161a0b-a003-4269-b41e-04220347f055", // shares advisory webhook until dedicated one is created
};
