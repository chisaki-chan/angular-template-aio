# 💻 IT Service

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.4.

## ⚠️ Brief Important Information

### `CookieManager` class

Every application needs an efficient way to store data. This application using `CookieManager` class to store data in the browser. This class is used to store data in the browser's cookies. Please take a look at `src/app/utils/cookie-manager.ts` file for more details.

### `PersistenceStorage` class

This class is specific class to handle `token` and `currentUser` store and retrieval. In case you need to store, retrieve, or remove the `token` and `currentUser`, you must use this class.Head to  `src/app/utils/persistence-storage.ts` file for more details.

This class is free-angular-app specific class. It is not a part of Angular's dependant and can be used anywhere in the application.

Example usage:

```typescript
import { PersistenceStorage } from 'src/app/utils/persistence-storage.ts';

// anywhere in your code, no need to set it as a provider in the module/constructor

PersistenceStorage.user.set(dataUser);
PersistenceStorage.token.set(token);

PersistenceStorage.user.remove();
PersistenceStorage.token.remove();

PersistenceStorage.user.get();
PersistenceStorage.token.get();
```

`PersistenceStorage` is strongly typed class/object. It means that you can't store any data other than `TCurrentUser` object for `user` and `string` for `token`.

For `TCurrentUser` type definition, please take a look at `src/types/index.ts` file. 

Since this is a typed class, please make sure that you are storing the correct type of data. Otherwise, you will get a compile-time error and the app can not be built.

### Avoid Hardcoded Constants

By the time, you will write a lot of code. It is a good practice to avoid hardcoded constants. You can define your constants in the `src/constants` folder.

As this documentation is written (21/12/2024), there is only one constant defined in the `src/constants` folder. It is `src/constants/index.ts`. You can define your constants in this file. The `index.ts` file contains `MST_PROFILE_CODE` constant which used for defining role/profile.

***

## 🏗️ Development Environment

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
