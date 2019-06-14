import React from 'react'
import mainLogo from '../Game/img/MainLogo.png'
import littleLogo from '../Game/img/LittleLogo.png'

export default function Logo({ sizeX, sizeY, classToUse, main}) {
    return <img className={classToUse} src={main ? mainLogo : littleLogo} alt="Breeding Season Logo" height={sizeY} width={sizeX} />
}
