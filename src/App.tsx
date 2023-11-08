import './App.css'
import Customer from './components/customer/customer.view'
import ReduxProvider from './providers/app/app-provider'

function App() {

    return (
        <>
            <ReduxProvider>
                <Customer />
            </ReduxProvider>
        </>
    )
}

export default App
