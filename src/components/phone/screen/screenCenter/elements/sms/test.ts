
type Message = {
    unixtime: number; 
    unixtimeId: number; 
    authorNumber: string; 
    txt: string; 
  }
  
  type Conversation = {
    elementId: number; 
    smsToNumber: string; 
    smsToId: string|null; 
    smsHistory: Message[]; 
  };
  

const conversations: Conversation[] = [
    {
        elementId: 1,
        smsToNumber: '123123123',
        smsToId: 'sms123',
        smsHistory: [
            {
                unixtime: 1625010000,
                unixtimeId: 1,
                authorNumber: '123456789',
                txt: 'Hello! How are you?'
            },
            {
                unixtime: 1625010600,
                unixtimeId: 2,
                authorNumber: '987654321',
                txt: 'I am good, thank you! How about you?'
            },
            {
                unixtime: 1625011200,
                unixtimeId: 3,
                authorNumber: '123456789',
                txt: 'I am doing well, thanks for asking.'
            },
            {
                unixtime: 1625011800,
                unixtimeId: 4,
                authorNumber: '987654321',
                txt: 'That’s great to hear!'
            },
            {
                unixtime: 1625012400,
                unixtimeId: 5,
                authorNumber: '123456789',
                txt: 'Do you have any plans for the weekend?'
            }
        ]
    },
    {
        elementId: 2,
        smsToNumber: '123131122',
        smsToId: 'sms456',
        smsHistory: [
            {
                unixtime: 1625020000,
                unixtimeId: 6,
                authorNumber: '234567890',
                txt: 'Hi! Long time no see.'
            },
            {
                unixtime: 1625020600,
                unixtimeId: 7,
                authorNumber: '876543210',
                txt: 'Yes, it’s been a while. How have you been?'
            },
            {
                unixtime: 1625021200,
                unixtimeId: 8,
                authorNumber: '234567890',
                txt: 'I’ve been busy with work, but otherwise good.'
            },
            {
                unixtime: 1625021800,
                unixtimeId: 9,
                authorNumber: '876543210',
                txt: 'I understand. We should catch up soon.'
            },
            {
                unixtime: 1625022400,
                unixtimeId: 10,
                authorNumber: '234567890',
                txt: 'Absolutely! Let’s plan something.'
            }
        ]
    },
    {
        elementId: 3,
        smsToNumber: '333333333',
        smsToId: 'sms789',
        smsHistory: [
            {
                unixtime: 1625030000,
                unixtimeId: 11,
                authorNumber: '345678901',
                txt: 'Hey! Are you free tomorrow?'
            },
            {
                unixtime: 1625030600,
                unixtimeId: 12,
                authorNumber: '765432109',
                txt: 'I think so. What’s up?'
            },
            {
                unixtime: 1625031200,
                unixtimeId: 13,
                authorNumber: '345678901',
                txt: 'I was thinking we could grab lunch.'
            },
            {
                unixtime: 1625031800,
                unixtimeId: 14,
                authorNumber: '765432109',
                txt: 'Sounds good! Where do you want to go?'
            },
            {
                unixtime: 1625032400,
                unixtimeId: 15,
                authorNumber: '345678901',
                txt: 'How about that new place downtown?'
            }
        ]
    }
];



export {conversations}


// const callObj = {
//     unixTime: getUnixTime(),
//     elementId: getUnixTime(),
//     whoCall: phoneNumber,
//     whoCallUid: uid,
//     toWho: number,
//     toWhoUid: toWhoUid ? toWhoUid : null,
//   };



  
  