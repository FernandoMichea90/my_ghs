
import { BASE_URL } from "@/config-global";


export  const getHref = (text: string) => {
    const path = text.toLowerCase() === 'inicio' ? '' : `/${text.toLowerCase()}`;
    return BASE_URL === '/' ? path : `${BASE_URL}${path}`;
  };

  export  const getHrefAdmin = (text: string) => {
    const path = text.toLowerCase() === 'inicio' ? '' : `/${text.toLowerCase()}`;

    return BASE_URL === '/' ? "/admin"+path : `${BASE_URL}${"/admin"}${path}`;
  };
