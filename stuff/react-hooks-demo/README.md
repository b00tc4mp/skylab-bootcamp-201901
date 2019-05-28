# React Hooks Demo Skylab

Demo to show Bootcamp students how to use 5 of the new Hooks available in React.

[Slides](https://slides.com/alexbarba/react-hooks-demo-skylab/#/)

## Hooks

Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.

No Breaking Changes

Hooks are:

Completely opt-in. You can try Hooks in a few components without rewriting any existing code. But you don’t have to learn or use Hooks right now if you don’t want to.

100% backwards-compatible. Hooks don’t contain any breaking changes.

Available now. Hooks are now available with the release of v16.8.0.

Motivation

It’s hard to reuse stateful logic between components.

Complex components become hard to understand.

Classes confuse both people and machines.

### useState

useState is a hook that encapsulates local state management. Previously, functional components were called “stateless components,” but no longer! With useState, we can utilize what seems like local state for storing values. Actually, they’re more like “state variables” that React keeps track of by the order you declared them. useState saves us from having to create class-based components for state-related responsibilities, since it gives functional components the power and flexibility to handle it themselves.

### useEffect

useEffect is a hook for encapsulating code that has ‘side effects,’ and is like a combination of componentDidMount, componentDidUpdate, and componentWillUnmount.
Previously, functional components didn’t have access to the component life cycle,but with useEffect you can tap into it

## useContext

useContext is a hook for getting broadly shared application data from context providers. 

## useReducer

useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one. useReducer also lets you optimize performance for components that trigger deep updates because you can pass dispatch down instead of callbacks.

## Custom Hook

Building your own Hooks lets you extract component logic into reusable functions

