import  {useParams } from 'react-router-dom'
const Iframe = () => {

    const {id} = useParams()
    const url = 'https://sandbox.payme.io/sale/generate';
    return(
        <div>
            <iframe title={'payme-iframe'} src={`${url}/${id}`}></iframe>
        </div>
    )
}

export default Iframe
