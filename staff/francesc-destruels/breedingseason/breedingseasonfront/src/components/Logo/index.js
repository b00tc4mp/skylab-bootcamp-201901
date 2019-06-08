import React from 'react'

export default function Logo({ sizeX, sizeY, classToUse}) {
    return <div>
        <img className={classToUse} src="https://pbs.twimg.com/media/DIE_lmVXYAAuWPh.png" alt="Breeding Season Logo" height={sizeY} width={sizeX} />
    </div>
}
