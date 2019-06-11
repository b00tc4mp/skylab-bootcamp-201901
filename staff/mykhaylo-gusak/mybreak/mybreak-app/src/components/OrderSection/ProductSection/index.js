import React, { useState, useRef, useEffect } from 'react'
import './index.sass'
import ProductSubCategory from './ProductSubCategory'
import TitleCategory from '../../TitleCategory'
import Maps from '../../Maps'
import StripePayament from '../../StripePayament'
import QrCode from '../../QrCode'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import QRCode from 'qrcode'
import logic from '../../../logic'
import Button from '../../Button'

function ProductSection({ card, products, handleAddCard, showError, email, handleAddOrder, newOrder }) {

    const [total, setTotal] = useState(false)
    const [step, setStep] = useState(0)
    const [map, setMap] = useState(false)

    const [qr, setQr] = useState(false)
    const [placeUbication, setPlaceUbication] = useState(false)

    const handlePlaceUbication = (ubic) => {
        setPlaceUbication(ubic)
    }

    const handleQrCode = (code) => {
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
                return setQr(await QRCode.toDataURL(`${protocol}//${host}/order/${code}`, opts))
            } catch (err) {
                alert(err)
            }
        })()
    }

    const handleRestartDate = () => {

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
                                <h3>Choose the site where you want to pick up your order</h3>
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

                            {newOrder &&
                                <>
                                    <h2>Here you have your</h2>
                                    <p>QR CODE</p>
                                </>
                            }
                        </div>

                        {newOrder &&
                            <>
                                <QrCode callback={() => handleQrCode(newOrder)} qr={qr} />
                                <Button prev={true} primary={true} />
                            </>
                        }

                        <div className='g-Home__order-section-products-category-pay-button'>
                            {!newOrder && <StripePayament onTokenSucces={handlePurchase} email={email} total={total} card={card}/>}
                        </div>
                    </div>
                }
                {/* {newOrder && placeUbication &&
                    < div className='g-Home__order-sectio`n-products-category'>
                        <h2>Here is your QR code</h2>
                        <QrCode callback={handleQrCode} />
                    </div>
                } */}
                {/* <div className='g-Home__order-section-products-button'>
                    <Button click={handlenPrevStep} prev={true} primary={true} />
                    <Button click={handlenNextStep} next={true} primary={true} />
                </div> */}
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