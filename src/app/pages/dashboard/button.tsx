import * as React from 'react';
import { PersistenceStorage } from 'src/app/utils/persistence-storage';
import { TCurrentUser } from 'src/types';

export const ReactButton = ({ children }: { children: React.ReactNode }) => {
  const [persistenceStorage, setPersistenceStorage] = React.useState<TCurrentUser | null>(null);

  const handleClick = () => {
    console.log('Button clicked');
  };

  React.useEffect(() => {
    const storage = PersistenceStorage.user.get();
    if (storage) {
      setPersistenceStorage(storage);
    }
  }, []);

  console.log(persistenceStorage);

  return (
    <button className="btn btn-sm btn-primary" onClick={handleClick}>
      {children}
    </button>
  );
};
