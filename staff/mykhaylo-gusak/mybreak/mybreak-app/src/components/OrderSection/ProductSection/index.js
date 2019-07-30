import React, { useState, useRef, useEffect } from 'react'
import './index.sass'
import ProductSubCategory from './ProductSubCategory'
import TitleCategory from '../../TitleCategory'
import Maps from '../../Maps'
import StripePayment from '../../StripePayment'
import QrCode from '../../QrCode'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import QRCode from 'qrcode'
import logic from '../../../logic'
import Button from '../../Button'
import Loader from '../../Loader'

function ProductSection({ card, setNewOrder, handleResetProducts, products, handleAddCard, showError, email, handleAddOrder, newOrder }) {

    const [total, setTotal] = useState(false)
    const [step, setStep] = useState(0)
    const [map, setMap] = useState(false)
    const [loader, setLoader] = useState(false)
    const [qr, setQr] = useState(false)
    const [placeUbication, setPlaceUbication] = useState(false)

    const handlePlaceUbication = (ubic) => {
        setPlaceUbication(ubic)
    }

    const handleQrCode = (code) => {
        setLoader(true)
        var opts = {
            errorCorrectionLevel: 'Q',
            type: 'image/jpeg',
            rendererOpts: {
                quality: 10
            }
        }

        const { host, protocol } = window.location

        return (async () => {
            try {
                return setQr(await QRCode.toDataURL(`${protocol}//${host}/#/order/${code}`, opts))

            } catch (err) {
                alert(err)
            }
        })()
    }

    const handleRestartDate = () => {
        setPlaceUbication(false)
        setStep(0)
        setQr(false)
        handleResetProducts()
        setMap(false)
        setNewOrder(false)
    }

    const handlePurchase = (token) => {
        if (token) handleAddOrder()
    }

    useEffect(() => {
        function updateTotal() {
            let acc = 0
            card && card.map(elem => {
                acc += Number(elem.price)
            })
            setTotal(acc)
            setMap(true)
        }
        updateTotal()
    }, [])

    const handlenPrevStep = () => {
        if (step > 0) return setStep(step - 1)
    }

    const handlenNextStep = () => {
        if (step < 4 && placeUbication) return setStep(step + 1)
    }

    return (
        <>
            <div className='g-Home__order-section-products' >
                {!newOrder && step === 0 &&
                    <div className='g-Home__order-section-products-category'>
                        <TitleCategory title={'Select your place'} />
                        <Maps handlePlaceUbication={handlePlaceUbication} />
                        {placeUbication &&
                            <div className='g-Home__order-section-products-category-place'>
                                <h3>Your chosen site:</h3>
                                <p>{placeUbication}</p>
                            </div>
                        }
                        {!placeUbication &&
                            <div className='g-Home__order-section-products-category-place'>
                                <h3>Choose the place:</h3>
                            </div>
                        }
                    </div>
                }
                {!newOrder && placeUbication && step === 1 &&
                    <div className='g-Home__order-section-products-category'>
                        <TitleCategory title={'Drink'} />
                        <ProductSubCategory products={products} categoryOfProduct={'Drink'} subCategoryOfProduct={'Coffee'} handleAddCard={handleAddCard} card={card} />
                        <ProductSubCategory products={products} categoryOfProduct={'Drink'} subCategoryOfProduct={'Juice'} handleAddCard={handleAddCard} card={card} />
                    </div>
                }
                {!newOrder && placeUbication && step === 2 &&
                    <div className='g-Home__order-section-products-category'>
                        <TitleCategory title={'Food'} />
                        <ProductSubCategory products={products} categoryOfProduct={'Food'} subCategoryOfProduct={'Fast food'} handleAddCard={handleAddCard} card={card} />
                        <ProductSubCategory products={products} categoryOfProduct={'Food'} subCategoryOfProduct={'Fruits'} handleAddCard={handleAddCard} card={card} />
                    </div>
                }
                {!newOrder && placeUbication && step === 3 &&
                    <div className='g-Home__order-section-products-category'>
                        <TitleCategory title={'Bakery'} />
                        <ProductSubCategory products={products} categoryOfProduct={'Bakery'} subCategoryOfProduct={'Bakery'} handleAddCard={handleAddCard} card={card} />
                    </div>
                }
                {placeUbication && step === 4 &&
                    <div className='g-Home__order-section-products-category'>
                        <div className='g-Home__order-section-products-category-pay-title'>
                            {!newOrder &&
                                <>
                                    <h2>Almost done!</h2>
                                    <p>Just pay!</p>
                                </>
                            }

                            {newOrder && !loader &&
                                <>
                                    <h2>Here you have your</h2>
                                    <p>QR CODE</p>
                                </>
                            }
                        </div>
                        {newOrder && !loader &&
                            <>
                                <QrCode callback={() => handleQrCode(newOrder)} qr={qr} setLoader={setLoader} handleRestartDate={handleRestartDate} />
                            </>
                        }
                        {loader &&
                            <Loader />
                        }
                        <div className='g-Home__order-section-products-category-pay-button'>
                            {!newOrder && <StripePayment onTokenSucces={handlePurchase} email={email} total={total} card={card} />}
                        </div>
                    </div>
                }
                {!qr && placeUbication &&
                    <div className='g-Home__order-section-products-manipulation'>
                        {step > 0 &&
                            <div className='g-Home__order-section-products-manipulation-button' onClick={handlenPrevStep}>
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </div>
                        }
                        {step < 4 &&

                            <div className='g-Home__order-section-products-manipulation-button' onClick={handlenNextStep} >
                                <FontAwesomeIcon icon={faAngleRight} />
                            </div>
                        }
                    </div>
                }
            </div>
        </>
    )
}

export default ProductSection