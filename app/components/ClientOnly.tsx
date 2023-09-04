'use client';

import { useEffect, useState } from "react";

interface ClientOnlyProps {
  children: JSX.Element
}

const ClientOnly = (props: ClientOnlyProps) => {
  const { children } = props

  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true))

  return (<> {isClient ? <div>{children}</div> : null} </>);
};

export default ClientOnly