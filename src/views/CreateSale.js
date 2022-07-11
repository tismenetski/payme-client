import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const CreateSale = () => {

    const navigate = useNavigate()

    const [salePrice,setSalePrice] = useState(0);
    const [currency,setCurrency] = useState('ILS');
    const [productName,setProductName] = useState('');
    const [serverError,setServerError] = useState(null)
    const [paymeError,setPaymeError] = useState(null)

    /**
     * Function handles the process of sending the data to our server, which sends the data to payme API,
     * the server returns the payme API response, if response status_code is 0, we store the sale,
     * otherwise we show the user errors returned either from the payme API or our server validation errors
     * @param data
     * @returns {Promise<void>}
     */
    const getIframe = async(data)=> {
        try {
            const url = `${process.env.REACT_APP_LARAVEL_URL}/sales/generate_sale`;
            const response = await axios.post(url,data,{
                headers :{
                    'Content-Type' :'application/json'
                }
            })
            const respData = response.data;

            if (response.data.status_code===0) {
                try{
                    const storeSaleURL = `${process.env.REACT_APP_LARAVEL_URL}/sales/store_sale`
                    await axios.post(storeSaleURL,{
                        sale_number : respData.payme_sale_code,
                        amount : respData.price / 100,
                        currency,
                        description : productName,
                        payment_link : respData.sale_url,
                    })

                    const id = saleUrl(respData.sale_url);

                    // reset state for form values
                    resetForm()

                    // navigate to iframe
                    navigate(`/iframe/${id}`)
                } catch (error) {
                    setServerError(error.message)
                }
            }
            else if (response.data.status_code===1) {
                setPaymeError(response.data.status_error_details); // payme api sent us an error, therefore we set it in our error state
            }
        }catch (error) {
            setServerError(error.response.data.errors)
        }
    }

    /**
     * Function takes the full payme url and returns the last part ,for example SALEXXXX-YYYYYYYY-AAAAAAA
     * @param fullURL
     * @returns {*}
     */
    const saleUrl = (fullURL) => {
        const arr = fullURL.split('/')
        return arr[arr.length-1];
    }

    /**
     * Function resets state values for our form
     */
    const resetForm = () => {
        setSalePrice(0)
        setCurrency('ILS')
        setProductName('')
    }

    /**
     * Function handles form submission
     * @param event
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        setServerError(null) // reset errors before sending the data
        setPaymeError(null)
        const data = {
            currency,
            product_name : productName,
            sale_price : salePrice * 100
        }
        getIframe(data)
    }


    return(
        <div className={'container'}>
            <h1>Create Sale</h1>
            <form onSubmit={handleSubmit} >
                <div className={"form-control"}>
                    <label htmlFor="productName">Product Name : </label>
                    <input type="text" id="productName" name="productName" value={productName} onChange={(event)=> setProductName(event.target.value)}/>
                </div>
                <div className={"form-control"}>
                    <label htmlFor="salePrice">Sale Price : </label>
                    <input type="number" id="salePrice" name="salePrice" value={salePrice} onChange={(event)=> setSalePrice(Number(event.target.value))}/>
                </div>
                <div className={"form-control"}>
                    <label htmlFor="currency">Currency : </label>
                    <select id="currency" name="currency" value={currency} onChange={(event)=> setCurrency((event.target.value))}>
                        <option value="ILS" defaultValue={'ILS'}>ILS</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                </div>
                <div className="form-control">
                    <button type='submit' className='btn btn-block'>
                        Submit
                    </button>
                </div>
                <div className={'errors'}>
                    {serverError && Object.keys(serverError).map((key,i)=>{
                        const err = serverError[key][0];
                        return <p key={i}>
                            {err}
                        </p>
                    })}
                    {paymeError && <p>
                        {paymeError}
                    </p>}
                </div>
            </form>
        </div>
    )
}

export default CreateSale
