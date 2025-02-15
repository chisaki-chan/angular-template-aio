export const getSearchParams = () => {
  const obj: Record<string, string> = {};
  const splitted = window.location.href.split('?')?.[1];
  if (splitted) {
    const params = splitted.split('&');
    for (const param of params) {
      const [key, value] = param.split('=');
      obj[key] = value;
    }
  }
  return obj;
};

export const setSearchParams = (params: Record<string, string>) => {
  const existingSearch = getSearchParams();
  params = { ...existingSearch, ...params };
  const searchParams = new URLSearchParams();
  for (const key in params) {
    searchParams.set(key, params[key]);
  }
  const splitted = window.location.href.split('?');
  const app_url = splitted[0];
  let new_url = `${app_url}?${searchParams.toString()}`;
  window.history.replaceState({}, '', new_url);
};
