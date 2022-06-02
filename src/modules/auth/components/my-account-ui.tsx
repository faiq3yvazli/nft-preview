import tw from 'tailwind-styled-components';

export const MyAccountUI = {
  Header: tw.div`grid grid-cols-2 gap-4 pb-2`,
  Widget: {
    Wrapper: tw.div`p-3 flex items-center bg-gradient-to-r from-gradient-ternary-from from-gradient-ternary-to`,
    Avatar: tw.img`rounded-full h-11 w-11 bg-primary-600`,
    Body: tw.div`ml-2 min-w-0`,
    Title: tw.h4`font-bold overflow-hidden text-ellipsis whitespace-nowrap text-mh4 lg:text-h4`,
    SubTitle: tw.p`text-lg overflow-hidden text-ellipsis whitespace-nowrap`,
  },
  Actions: {
    Wrapper: tw.div`py-2`,
    Button: {
      Wrapper: tw.button`text-lg inline-flex items-center text-info-400`,
      Icon: tw.span`text-xs`,
      Text: tw.span`ml-1`,
    },
  },
  Content: {
    Wrapper: tw.div`py-2`,
    Title: tw.h4`text-mh4 lg:text-mh4 font-bold mb-4`,
    Empty: {
      Wrapper: tw.div`flex flex-col items-center py-4`,
      Cover: tw.div`py-4`,
      Title: tw.h4`font-bold text-mh4 lg:text-mh4`,
      Description: tw.p`text-lg`,
    },
    Grid: tw.div`grid grid-cols-2 gap-4`,
  },
};
