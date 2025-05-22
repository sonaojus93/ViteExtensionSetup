export type DlpMessage =
    | { type: "upload_detected" }
    | { type: "download_detected" }
    | { type: "log"; payload: string };