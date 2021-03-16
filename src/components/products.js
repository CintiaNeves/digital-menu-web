import React, { useState, useEffect } from 'react'
import api from '../ClientAPI'

export default function Products() {
    
    const [orderItems, setOrderItems] = useState([])
    const [total, setTotal] = useState(0)
    const [chart, setChart] = useState([])
    const [showNav, setShowNav] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get('product')
            const orderItems = result.data.map(product => { return { ammount: 1, product }; })
            setOrderItems(orderItems)
        }
        fetchData()        
    }, [])

    const changeItemAmount = (event, item) => {
        const index = orderItems.indexOf(item)
        orderItems.splice(index, 1)
        item.ammount = Number(event.target.value)
        orderItems.splice(index, 0, item)
        setOrderItems([...orderItems])
    }

    const addToChart = (item) => {
        setTotal(total + item.ammount * item.product.price)
        const copy = Object.assign({}, item)
        setChart([...chart, copy])
        // send to backend
    }

    const removeFromChart = (item) => {
        setTotal(total - (item.ammount * item.product.price))
        chart.splice(chart.indexOf(item), 1)
        setChart([...chart])
    }

    return (
        <div>
            {showNav && (
                <div id="myNav" className="overlay">
                    <p>Valor total do pedido: {currencyFormater.format(total)}</p>
                    {chart && chart.map((item, index) => (
                        <div key={index} className="card-food-info">
                            <button onClick={() => removeFromChart(item)}>Remover</button>
                            <h3>{item.ammount} - {item.product.description}</h3>
                            <h1>Total {currencyFormater.format(item.ammount * item.product.price)}</h1>
                            <img src={item.image} alt="imagem do produto" />
                        </div>
                    ))}
                    <button onClick={() => setShowNav(!showNav)}>Voltar</button>
                    <button className="send-order">Enviar Pedido</button>
                </div>
            )}
            {orderItems.map((orderItem, index) => (
                <div key={index} className="card-food-info">
                    <h1>{orderItem.product.description}</h1>
                    <p>{orderItem.product.ingredients}</p>
                    <input type="number" defaultValue="1" min="1" onChange={e => changeItemAmount(e, orderItem)} />
                    <button onClick={() => addToChart(orderItem)}>
                        Adicionar {currencyFormater.format(orderItem.ammount * orderItem.product.price)}
                    </button>
                    <img src={orderItem.product.image} alt="imagem do produto" />
                </div>
            ))}
            <p>Valor do pedido: {currencyFormater.format(total)}</p>
            <button onClick={() => setShowNav(!showNav)}>Ver pedido</button>
        </div>
      )
}

const format = {
    style: 'currency', 
    currency: 'BRL',
    currencySign: 'accounting' 
}
const currencyFormater = new Intl.NumberFormat('pt-BR', format)