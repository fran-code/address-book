import React, { createContext, useContext, useState } from 'react';
import { IDataMessage, IMessage } from '../utils/interfaces'

type Props = {
  children: React.ReactNode;
};

export interface IMessageDataContext {
  dataMessage?: IMessage;
  setMessage: (message: IDataMessage) => void;
}

const defaultValueContext = {
  dataMessage: undefined,
  setMessage: () => { }
}

export const MessageDataContext = createContext<IMessageDataContext>(defaultValueContext);
MessageDataContext.displayName = 'MessageDataContext'

export const DataMessageProvider = ({ children }: Props) => {
  const [dataMessage, setDataMessage] = useState<IMessage | undefined>(undefined);

  const setMessage = (message: IDataMessage) => setDataMessage({ ...message, time: Date.now() })

  return <MessageDataContext.Provider value={{ dataMessage, setMessage }}>{children}</MessageDataContext.Provider>
}

export const useMessageContext = () => {
  const context = useContext(MessageDataContext)

  if (context === undefined) {
    throw new Error(`useMessageContext must be used within a dataMessageProvider`)
  }
  return context
}