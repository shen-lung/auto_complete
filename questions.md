1. What is the difference between Component and PureComponent? give an
example where it might break my app.

    The PureComponent is a place where we render components depens on state and props. The component is the presentetion of part of app. For example: We need to show the user information in the screen. Basically we can use two components: the first one that will be the parent (PureComponent) where we will manage the states and the rendering of child components and the second one that will be using for displaying the user's information like Cards.


2. Context + ShouldComponentUpdate might be dangerous. Can think of why is
that?

    It's not dangerous. The shouldComponentUpdate() allows you to control the rendering of the component. It was used in versions prior to 16. Currently we use useMemo() or useCallback()

3. Describe 3 ways to pass information from a component to its PARENT.

    1: Using useContext() hook
    2: Return the value using a function that was passed in by props.
    3. Using libraries like Redux or MobX.

4. Give 2 ways to prevent components from re-rendering.

    1. Using useMemo() hook. Applies to a value. If it was not modified it does not rerender the value again.
    2. Using useCallBack() hook. It is applied to a function to control the execution that is going to depend on a value.
    3. Using React.memo(). It is a wrapper of the component. If there is no change within it, it is not rerendered. For example:
        * export default React.memo(MyComponent)

5. What is a fragment and why do we need it? Give an example where it might
break my app.

    The React.Fragment allows us to return multiple elements from a React component without adding extra nodes to the DOM. The Fragment has a smaller DOM, it renders faster and use less memory. Is very good practise to use it where is not necesarry to add more <div> tag. For example:
        We have a function that returns the table content. If we are going to call it inside of table we are going to add extra <div> tag and that wrapping the <td> tags in a div element breaks the table parent-child relationship. 
    To prevent this will be good to use the Fragment.
    On the other side we can also control this using the empty tags like this:
        <>
            <td>User 1</td>
            <td>User 2</td>
            <td>User 3</td>
        </>
    This expresion allos us to don't add extra div to DOM

6. Give 3 examples of the HOC pattern.

    1: 
    const UsersContent => (Card){
        return (
            <Card></Card>
        )
    }

    export default UsersContent
    
    2: 
    const UsersContent => (Card, data){
        return (
            <Card key={data.userId} item={data}></Card>
        )
    }

    export default UsersContent
    
    3: 
    const UsersContent => (Card){
        const [userData, setUserData] = useState([])
        const getUsers = async () => {
            // Calling the API to get user info
            const response = users()
            setUserData(response.data)
        }
        useEffect(() => {
            
        }, [])
        return (
            <Card key={userData.userId} item={userData}></Card>
        )
    }

    export default UsersContent

7. what's the difference in handling exceptions in promises, callbacks and
async...await.
    1: async...await: try {} catch {}
    2: promises: .reject()
    3: callbacks: .catch() or try {} catch {}

8. How many arguments does setState take and why is it async.
    The setState method takes up to 2 arguments. We usually pass in only one. The first argument can be an object or a callback that's used to update the state. It's an asynchronous method that's batched. This means that multiple setState calls are batched before a component is rerendered with the new state.

9. List the steps needed to migrate a Class to Function Component.

    1. Use a function inside of class
    2. Use the return() inside of render()
    3. Convert all methods to functions
    4. We need to remove the 'this' refereneces
    5. Start to use the hook useState() inside of this.state to control the states
    6. Start to use the hook useEffect() for state update, for mount component and for unmount component


10. List a few ways styles can be used with components.
    1.  Using a style file
        import './User.sass'
        <div class={userContent}></div>
    2. Using a object
        import userStyle from './userStyle'
        <div style={userStyle.userContent}></div>
    3. Depends on value
        import './User.sass'
        const isUserActive = false
        <div class={isUserActive ? userNoActiveContent : userActiveContent}></div>

11. How to render an HTML string coming from the server.
    const getPlace = () => {
        const htmlResponse = '<h5>Country</h5>: United States</br><h5>City</h5>: San Francisco'
    }