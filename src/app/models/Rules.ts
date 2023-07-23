export interface Rules {
    result: [{
      id: number;
      data: {
        '@name': undefined | string;
        from: undefined | [
          {
            member: string | undefined;
            name: string | undefined;
            description: string | undefined;
          }
        ];
        source: undefined | [
          {
            member: string | undefined;
            ip: string | undefined;
            name: string | undefined;
            description: string | undefined;
          }
        ];
        to: undefined | [
          {
            member: string | undefined;
            name: string | undefined;
            description: string | undefined;
          }
        ];
        destination: undefined | [
          {
            member: string | undefined;
            ip: string | undefined;
            name: string | undefined;
            description: string | undefined;
          }
        ];
        service: undefined | [
          {
            tcp: undefined | {
              port: string | undefined;
              description: string | undefined;
            };
            udp: undefined | {
              port: string | undefined;
              description: string | undefined;
            };
            icmp: undefined | {
              port: string | undefined;
              description: string | undefined;
            };
          }
        ];
        action: string | undefined;
        application: undefined | [
          {
            member: string | undefined;
            name: string | undefined;
            description: string | undefined;
          }
        ];
        category: undefined | [
          {
            member: string | undefined;
            name: string | undefined;
            description: string | undefined;
          }
        ];
        'log-setting': string | undefined;
        'hit-count': string | undefined;
      }
    }]
}


