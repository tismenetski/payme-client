import {useCallback, useEffect, useState} from "react";
import axios from "axios";

const Dashboard = () => {


    const url = `${process.env.REACT_APP_LARAVEL_URL}/sales/get_all_sales`;
    const [sales,setSales] = useState([]);
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(true)

    /**
     * Function gets all our sales from our server
     * @returns {Promise<void>}
     */
    const getSales = useCallback(async() => {

        try {
            const response = await axios.get(url)
            setSales(response.data);
            setLoading(false);
        }catch (error) {
            setError(error.message);
            setLoading(false);
        }
    },[url])

    /**
     * Fetch sales only on page load
     */
    useEffect(()=> {
       if (loading){
           getSales()
       }
    }, [loading,getSales])

    if (error) {
        return <div className="errors">
            <p>
                {error}
            </p>
        </div>
    }

    return(
        <div className='container'>
            <h1>Sales Dashboard</h1>
            <table>
                <thead>
                <tr>
                    <td>Time</td>
                    <td>Sale Number</td>
                    <td>Description</td>
                    <td>Amount</td>
                    <td>Currency</td>
                    <td>Payment Link</td>
                </tr>
                </thead>
                <tbody>
                {sales.map((sale)=> {
                    const {currency,sale_number,description, amount, payment_link, created_at,id} = sale;
                    return (
                        <tr key={id}>
                            <td>{created_at}</td>
                            <td>{sale_number}</td>
                            <td>{description}</td>
                            <td>{amount}</td>
                            <td>{currency}</td>
                            <td>{payment_link}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}
export default Dashboard
