const formatPrice = (price: number) => {
    return (price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}

export default formatPrice;