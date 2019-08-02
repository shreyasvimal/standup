export interface GlobalState {
    email: string;
    slackChannel: string;
    questions: string[];
    slackHandles: string;
    slackWebhookToken: string;

    standUpResponse?: StandUpResponse;
}

export interface StandUpResponse {
    name: string;
    urls: string[];
}