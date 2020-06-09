# React-Registry

Basically a lite version of React-Redux. Takes away the need for reducers or actions and just provides an accessible
 store that wraps your components and then provides access to the store within all components below the store
  component within your tree. Changing the data in the store will update the state of your components and trigger a
   rerender, so you can treat the store as your react state.
   
To create a store, start with the top level component that your store should have access to, this does not have to be
 your top level component, but can be any component within your tree. This example uses the top level App component:
 
```jsx harmony
import React from 'react';
import StoreComponent from './libraries/react-registry/StoreComponent';

function App() {
  return (
    <StoreComponent store='todo'>

        <ChildComponent> // your child components here

    </StoreComponent>
  );
}

export default App;
```

When creating a `StoreComponent` you must pass in a name for your store as the `store` prop.

Once you have declared your store, you can access it at any level in your tree below the store component:
```jsx harmony
import React, { Component } from 'react';
import * as Registry from '../../libraries/react-registry';

export class Child extends Component {

    state = {store: Registry.open('todo')}

}
```

The react-registry model provides an open method that takes the stores name as a string, this returns the store
 object which you can store in your component. The example above stores it on the component state, this is not
  required but could be a common pattern because theres some reasons that Mike has yet to articulate. Badically, just
   put it any where for now.
   
   Once you have your store, you can add data to it using the `set` method:
   
```jsx harmony
this.state.store.set('name', 'mike');
```

When you store data in the store in this way, it will trigger an update inside your `StoreComponent
` tree, any elements which use data from the store will render using the new data in the store. To access data in the
 store from any element below the `StoreComponent` use the `get` method:
 ```jsx harmony
this.state.store.get('name');
```

Mike still needs to provide a working example of this but this is the basic idea.
