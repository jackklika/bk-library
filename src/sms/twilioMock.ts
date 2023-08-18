export class TwilioMock {
    constructor(private accountSid: string = "test", private authToken: string = "test") { }

    public messages = {
        send: (options: { body: string; to: string }) => {
            return new Promise<{ sid: string }>((resolve, reject) => {
                if (!options.body || !options.to) {
                    reject(new Error("Missing parameters"));
                } else {
                    console.log(`Sending SMS from to ${options.to}: ${options.body}`);
                    resolve({ sid: "mockSid12345" });
                }
            });
        },
    };
}